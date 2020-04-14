import React from "react"
import "./Widget/Widget.css"
import logo from "./Widget/apple-icon-57x57.png"
import NowPlaying from "./Widget/NowPlaying"

export default function Widget(props) {
    
    const transparency = props.transparency === 0 ? "transparent" : `rgba(34, 34, 34, ${props.transparency || 1})`
    
    return (
        <div className="App" style={{borderRadius: parseInt(props.corners), backgroundColor: transparency}}>
            {props.position === "left" && <Logo />}
            <div className="title" style={{left: props.position === "right" ? 20 : 55}}>
                    Now Playing:
            </div>
            <div className="nowplaying">
                <NowPlaying 
                    uuid={props.id}
                    ratelimit={props.limit}
                    direction={props.dir}
                    speed={props.speed}
                    position={props.position}
                />
            </div>
            {props.position === "right" && <Logo />}
        </div>
    )
}

function Logo() {
    return (
      <div className="logo">
        <img src="https://i.scdn.co/image/ab67616d0000b2735f6da0bbb86a97c0870822ea" alt="logo" />
      </div>
    )
  }