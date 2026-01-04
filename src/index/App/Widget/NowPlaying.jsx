import React, { Component } from "react";
import "./NowPlaying/NowPlaying.css";
import "animate.css";

export default class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: "",
      fullSongObj: {},
    };

    // Track animation state to prevent restarts
    this.animationRunning = false;
    this.currentAnimation = null;
    this.previousSong = "";
  }

  componentDidMount = () => {
    this.fetchSong();
    this.fetchCover();
    this.fetchInterval = setInterval(this.fetchSong, this.props.ratelimit);
  };

  componentWillUnmount = () => {
    // Clean up interval to prevent memory leaks
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
    // Clean up any bounce animation timeouts
    if (this.bounceTimeouts) {
      this.bounceTimeouts.forEach((timeout) => clearTimeout(timeout));
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.version !== this.props.version) {
      this.setState({ currentSong: "" }, () => {
        this.fetchSong();
      });
      return; // Exit early since we're fetching new song
    }

    // Re-apply animation when speed changes
    if (prevProps.speed !== this.props.speed && this.state.currentSong) {
      this.checkSize();
    }

    // Re-apply animation when direction changes
    if (
      prevProps.direction !== this.props.direction &&
      this.state.currentSong
    ) {
      this.checkSize();
    }

    // Re-apply animation when enableScroll changes
    if (
      prevProps.enableScroll !== this.props.enableScroll &&
      this.state.currentSong
    ) {
      this.checkSize();
    }

    // Re-apply animation when scrollAnimation changes
    if (
      prevProps.scrollAnimation !== this.props.scrollAnimation &&
      this.state.currentSong
    ) {
      this.checkSize();
    }

    // Re-apply animation when song changes (for recalculating distance)
    if (
      this.previousSong !== this.state.currentSong &&
      this.state.currentSong
    ) {
      this.previousSong = this.state.currentSong;
      this.checkSize();
    }
  }

  fetchSong = async () => {
    if (this.props.uuid !== "" && this.props.uuid != null) {
      const fullSong = await fetch(
        `https://api.songify.rocks/v2/getsong?uuid=${this.props.uuid}&full=true`
      ).then((res) => res.json());
      const song = fullSong.song;
      if (song !== this.state.currentSong) {

        
        // Stop any current animation immediately
        if (this.animationRunning) {
          this.stopCurrentAnimation();
        }
        
        // update the state
        this.props.onTrackChange();
        this.setState({
          currentSong: song,
          fullSongObj: fullSong,
        });
        this.fetchCover();
        
        // Wait a bit for the DOM to update with the new song text
        setTimeout(() => {
          this.checkSize();
        }, 100);
      }
    }
  };

  fetchCover = async () => {
    try {
      const response = await fetch(
        `https://api.songify.rocks/v2/getcover?uuid=${this.props.uuid}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const cover = await response.text();
      this.props.logoHandler(cover, this.state.fullSongObj);
    } catch (error) {
      console.error('Failed to fetch cover:', error);
      // Fallback to album cover by calling logoHandler with empty cover
      // The updateLogo method will handle the fallback logic
      this.props.logoHandler("", this.state.fullSongObj);
    }
  };

  checkSize = () => {
    const songElem = document.getElementById("song");
    if (!songElem) return;

    // Always stop current animation first to ensure clean state
    if (this.animationRunning) {
      this.stopCurrentAnimation();
    }

    // Create a temporary element to measure the actual text width (like in the reference)
    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.style.position = "absolute";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.style.fontSize = window.getComputedStyle(songElem).fontSize;
    tempElement.style.fontFamily = window.getComputedStyle(songElem).fontFamily;
    tempElement.style.fontWeight = window.getComputedStyle(songElem).fontWeight;
    tempElement.textContent = this.state.currentSong;

    document.body.appendChild(tempElement);
    const textWidth = tempElement.offsetWidth;
    document.body.removeChild(tempElement);

    // Get the actual container width from the parent element
    const containerElem = songElem.parentElement;
    const containerWidth = containerElem ? containerElem.offsetWidth : 200;



    // Check if scroll is enabled (default to true if not specified)
    const enableScroll =
      this.props.enableScroll === undefined
        ? true
        : this.props.enableScroll === "true" ||
          this.props.enableScroll === true;

    if (!enableScroll) {
      // Disable scroll animation
      songElem.style.width = "auto";
      songElem.style.animation = "none";
      songElem.style.transform = "translateX(0)";
      songElem.classList.remove("scrolling");
      this.animationRunning = false;
      return;
    }

    // Only scroll if text is wider than container
    if (textWidth <= containerWidth) {
      songElem.style.width = "auto";
      songElem.style.animation = "none";
      songElem.style.transform = "translateX(0)";
      songElem.classList.remove("scrolling");
      this.animationRunning = false;
      return;
    }

    songElem.style.width = `${textWidth + 1}px`;
    songElem.classList.add("scrolling"); // Add scrolling class to remove ellipsis

    // Apply different animation based on scrollAnimation prop
    const scrollAnimation = this.props.scrollAnimation || "continuous";

    this.currentAnimation = scrollAnimation;

    switch (scrollAnimation) {
      case "bounce":
        this.startBounceAnimation(songElem, textWidth, containerWidth);
        break;
      case "stop":
        this.startStopAnimation(songElem, textWidth, containerWidth);
        break;
      case "fade":
        songElem.style.animation = `marquee-fade ${
          textWidth / this.props.speed
        }s linear infinite ${this.props.direction}`;
        this.animationRunning = true;
        break;
      default: // continuous
        songElem.style.animation = `marquee ${
          textWidth / this.props.speed
        }s linear infinite ${this.props.direction}`;
        this.animationRunning = true;
        break;
    }
  };

  startBounceAnimation = (element, textWidth, containerWidth) => {
    
    const scrollDistance = textWidth - containerWidth;
    const fixedSpeed = 30; // pixels per second - consistent speed for all text lengths
    const duration = Math.max(2, scrollDistance / fixedSpeed); // Duration based on fixed speed

    

    // Mark animation as running
    this.animationRunning = true;

    // Clear any existing animation and timeouts
    element.style.animation = "none";
    element.style.transition = "none";
    element.style.transform = "translateX(0)";

    // Initialize timeout array
    this.bounceTimeouts = [];

    // Phase 1: Scroll to end after 2 seconds
    const phase1Timeout = setTimeout(() => {

      element.style.transition = `transform ${duration}s cubic-bezier(.25,0,.75,1)`;
      element.style.transform = `translateX(-${scrollDistance + 10 + 10}px)`;

      // Phase 2: Wait 3 seconds at the end, then scroll back
      const phase2Timeout = setTimeout(() => {

        element.style.transition = `transform ${duration}s cubic-bezier(.25,0,.75,1)`;
        element.style.transform = "translateX(0)";

        // Phase 3: Wait 10 seconds before next cycle
        const phase3Timeout = setTimeout(() => {
          if (this.currentAnimation === "bounce") {
            this.startBounceAnimation(element, textWidth, containerWidth);
          }
        }, duration * 1000 + 10000);

        this.bounceTimeouts.push(phase3Timeout);
      }, duration * 1000 + 3000);

      this.bounceTimeouts.push(phase2Timeout);
    }, 2000);

    this.bounceTimeouts.push(phase1Timeout);
  };

  stopCurrentAnimation = () => {


    // Clear any bounce timeouts
    if (this.bounceTimeouts) {
      this.bounceTimeouts.forEach((timeout) => clearTimeout(timeout));
      this.bounceTimeouts = [];
    }

    // Remove any transition event listeners
    const songElem = document.getElementById("song");
    if (songElem) {
      songElem.removeEventListener("transitionend", () => {});
      songElem.classList.remove("scrolling"); // Remove scrolling class
    }

    // Reset animation state
    this.animationRunning = false;
  };

  startStopAnimation = (element, textWidth, containerWidth) => {
    const scrollDistance = textWidth - containerWidth;
    const scrollSpeed = textWidth / this.props.speed;

    // Mark animation as running
    this.animationRunning = true;

    // Clear any existing animation
    element.style.animation = "none";
    element.style.transition = "transform 3s ease-in-out";

    // Start position (text fully visible)
    element.style.transform = "translateX(0)";

    // Scroll to end and stop
    setTimeout(() => {
      element.style.transform = `translateX(-${scrollDistance}px)`;
      // Stop animation is complete, mark as not running
      this.animationRunning = false;
    }, 100);
  };

  render() {
    // Check if canvas is active
    const canvasActive = this.props.canvas === "true" || this.props.canvas === true;
    const displayText = this.state.currentSong || "♪ Nothing playing...";
    
    return (
      <div className={`song ${canvasActive ? 'canvas-active' : ''}`} id="song">
        {displayText}
      </div>
    );
  }
}
