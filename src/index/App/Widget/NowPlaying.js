import React, {Component, Fragment} from "react"
import "./NowPlaying/NowPlaying.css"

export default class NowPlaying extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentSong: ""
        }
    }

    componentDidMount = () => {
        this.fetchSong()
        setInterval(this.fetchSong, this.props.ratelimit)
    }

    fetchSong = async () => {
        const song = await fetch(`https://songify.rocks/getsong.php?id=${this.props.uuid}`)
            .then(res => res.text())
        
        if (song !==  this.state.currentSong) {
            this.setState({
                currentSong: song
            })
        }
        this.checkSize()
    }

    checkSize = () => {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        context.font = "26px Quicksand"
        const width = context.measureText(this.state.currentSong).width
        const songElem = document.getElementById("song")

        const scrollingSpeed = width / this.props.speed

        songElem.style.width = `${width + 1}px`
        songElem.style.animation = `marquee ${scrollingSpeed}s linear infinite ${this.props.direction}`
    }

    render() {
        let left = 0
        if (this.props.position === "left") left = 55
        else if (this.props.position === "right") left = 15

        return (
            <Fragment>
                <div className="title" style={{left: left + this.props.offsetY, top: this.props.offsetX}}>
                    Now Playing:
                </div>
                <div className="song" id="song">
                    {this.state.currentSong}
                </div>
            </Fragment>
        )
    }
}