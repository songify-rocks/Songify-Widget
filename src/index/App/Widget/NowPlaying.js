import React, { Component } from "react"
import "./NowPlaying/NowPlaying.css"
import 'animate.css';


export default class NowPlaying extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentSong: "",
            fullSongObj: {}
        }
    }

    componentDidMount = () => {
        this.fetchSong()
        this.fetchCover()
        setInterval(this.fetchSong, this.props.ratelimit)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.version !== this.props.version) {
            this.state.currentSong = ""
            this.fetchSong();
        }
    }

    fetchSong = async () => {
        if (this.props.uuid !== "" && this.props.uuid != null) {
            const fullSong = await fetch(`https://api.songify.rocks/v2/getsong?uuid=${this.props.uuid}&full=true`).then(res => res.json());
            const song = fullSong.song;
            if (song !== this.state.currentSong) {
                // update the state
                this.props.onTrackChange();
                this.setState({
                    currentSong: song,
                    fullSongObj: fullSong
                });
                this.fetchCover();
                this.checkSize();
            }
        }
    }


    fetchCover = async () => {
        const cover = await fetch(`https://api.songify.rocks/v2/getcover?uuid=${this.props.uuid}`).then(res => res.text())
        this.props.logoHandler(cover, this.state.fullSongObj)
    }

    checkSize = () => {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        context.font = "26px Quicksand"
        const width = context.measureText(this.state.currentSong).width
        const songElem = document.getElementById("song")

        const scrollingSpeed = width / this.props.speed

        songElem.style.width = `${width + 1}px`;
        songElem.style.animation = `marquee ${scrollingSpeed}s linear infinite ${this.props.direction}`;
    }

    render() {
        return (
            <div className="song" id="song">
                {this.state.currentSong}
            </div>
        )
    }
}