import React, { Component } from "react"
import "./Widget/Widget.css"
import songifyLogo from "./Widget/apple-icon-57x57.png"
import NowPlaying from "./Widget/NowPlaying"

export default class Widget extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            logo: songifyLogo
        }
    }

    componentDidMount = () => {
        this.updateLogo("")
    }

    updateLogo = cover => {
        // for some reason, even though props.cover was a boolean set to false,
        // it would still go into the if block
        // so I made it explicit
        if (this.props.cover === true) {
            this.setState({
                logo: cover
            })
        } else {
            this.setState({
                logo: songifyLogo
            })
        }
    }

    render() {
        const transparency = this.props.transparency === 0 ? "transparent" : `rgba(34, 34, 34, ${this.props.transparency || 1})`
    
        return (
            <div className="App" style={{borderRadius: parseInt(this.props.corners), backgroundColor: transparency}}>
                {this.props.position === "left" && <Logo logo={this.state.logo}/>}
                <div className="title" style={{left: this.props.position === "right" ? 20 : 55}}>
                        Now Playing:
                </div>
                <div className="nowplaying">
                    <NowPlaying 
                        uuid={this.props.id}
                        ratelimit={this.props.limit}
                        direction={this.props.dir}
                        speed={this.props.speed}
                        position={this.props.position}
                        logoHandler={this.updateLogo}
                    />
                </div>
                <div className="poweredby">
                    powered by songify
                </div>
                {this.props.position === "right" && <Logo logo={this.state.logo}/>}
            </div>
        )
    }
}

function Logo(props) {
    if (props.logo.trim() === "") props.logo = songifyLogo
    return (
      <div className="logo">
        <img src={props.logo} alt="logo"/>
      </div>
    )
  }