import React, { Component } from "react";
import "./Widget/Widget.css";
import songifyLogo from "./Widget/apple-icon-57x57.png";
import NowPlaying from "./Widget/NowPlaying";
import "animate.css";

export default class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: songifyLogo,
      animationClass: "", // Animation class starts as empty
    };
  }

  // Convert string props to proper types (booleans/numbers)
  convertProps = () => {
    return {
      showHideOnChange:
        this.props.showHideOnChange === "true" ||
        this.props.showHideOnChange == true,
      cover: this.props.cover === "true" || this.props.cover == true,
      corners: parseInt(this.props.corners, 10) || 0,
      transparency:
        this.props.transparency !== undefined
          ? parseFloat(this.props.transparency)
          : 1,
      speed: parseInt(this.props.speed, 10) || 0,
      showDuration: parseFloat(this.props.showDuration) || 3,
      canvas: this.props.canvas === "true" || this.props.canvas == true,
      enableScroll: this.props.enableScroll === undefined ? true : (this.props.enableScroll === "true" || this.props.enableScroll == true),
    };
  };

  handleTrackChange = (customDuration) => {
    const { showHideOnChange } = this.convertProps();
    if (!showHideOnChange) {
      if (this.state.animationClass === "animate__fadeOut") {
        this.setState({
          animationClass: `animate__${this.props.showAnimation || "fadeIn"}`,
        });
      }
      return; // Exit early if showHideOnChange is false
    }

    let duration = customDuration || this.props.showDuration;
    duration = (duration || 3) * 1000; // Default to 3 seconds if customDuration or showDuration is not provided

    // Apply the entrance animation
    this.setState({
      animationClass: `animate__${this.props.showAnimation || "fadeIn"}`,
    });

    // Wait for 'duration' before switching to the exit animation
    setTimeout(() => {
      // Remove the entrance animation and apply the exit animation
      this.setState({
        animationClass: `animate__${this.props.hideAnimation || "fadeOut"}`,
      });
    }, duration);
  };

  componentDidMount = () => {
    this.updateLogo("");
    if (this.props.preview) {
      // Initial call to start animation
      this.handleTrackChange();

      // Use setInterval and pass the function reference with an arrow function
      setInterval(
        () => this.handleTrackChange(5),
        this.props.showDuration * 1000 + 2000
      );
    }
  };

  componentDidUpdate(prevProps) {
    // Check if the track has changed and trigger animation if necessary
    if (prevProps.id !== this.props.id) {
      this.handleTrackChange();
    }
  }

  updateLogo = (cover, fullSong = null) => {
    const { cover: useCover, canvas: useCanvas } = this.convertProps();

    if (useCanvas && fullSong) {
      // Try fetching the canvas if canvas is enabled and we have a song
      fetch(`https://api.songify.rocks/v2/canvas/${fullSong.song_id}`)
        .then((res) => res.text())
                 .then((canvas) => {
           if (canvas && canvas !== "No canvas found") {
             // Clean up any quotes first
             canvas = canvas.replace(/"/g, "");
             
             // Check if canvas is a valid URL and doesn't contain error messages
             if (canvas.startsWith("https") && 
                 !canvas.includes("error") && 
                 !canvas.includes("Connection refused")) {
               // If canvas is found and valid, update the logo with the canvas URL
               this.setState({ logo: canvas });
             } else {
               // Invalid canvas response, fallback to cover or placeholder
               if (useCover && cover) {
                 this.setState({ logo: cover }); // Use cover if available and enabled
               } else {
                 this.setState({ logo: songifyLogo }); // Fallback to placeholder
               }
             }
           } else {
             // No canvas found, fallback to cover or placeholder
             if (useCover && cover) {
               this.setState({ logo: cover }); // Use cover if available and enabled
             } else {
               this.setState({ logo: songifyLogo }); // Fallback to placeholder
             }
           }
         })
        .catch(() => {
          // On error (e.g., network issues), fallback to cover or placeholder
          if (useCover && cover) {
            this.setState({ logo: cover });
          } else {
            this.setState({ logo: songifyLogo });
          }
        });
    } else if (useCover && cover) {
      // If canvas is not enabled, use cover if available
      this.setState({ logo: cover });
    } else {
      // If neither canvas nor cover is available, use the placeholder
      this.setState({ logo: songifyLogo });
    }
  };

  render() {
    const { corners, transparency } = this.convertProps();

    return (
      <div
        className={`App visible ${this.state.animationClass} animate__animated`}
        style={{
          borderRadius: corners,
          backgroundColor:
            transparency === 0
              ? "transparent"
              : `rgba(34, 34, 34, ${transparency})`,
        }}
      >
        {this.props.position === "left" && <Logo logo={this.state.logo} />}

        <div
          className="title"
          style={{ left: this.props.position === "right" ? 20 : 70 }}
        >
          Now Playing:
        </div>

        <div className="nowplaying">
          <NowPlaying
            version={this.props.version}
            uuid={this.props.id}
            ratelimit={this.props.limit}
            direction={this.props.dir}
            speed={this.props.speed}
            position={this.props.position}
            logoHandler={this.updateLogo}
            onTrackChange={this.handleTrackChange}
            enableScroll={this.props.enableScroll}
          />
        </div>

        {this.props.position === "right" && <Logo logo={this.state.logo} />}
      </div>
    );
  }
}

function Logo(props) {
  // if props.logo contains .mp4 we assume it's a video and render a video element that is muted and loops infinitely, otherwise we render an image element
  if (props.logo.includes(".mp4")) {
    return (
      <div className="video-container">
        <video key={props.logo} autoPlay muted loop>
          <source src={props.logo} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <div className="logo">
      <img src={props.logo} alt="logo" />
    </div>
  );
}
