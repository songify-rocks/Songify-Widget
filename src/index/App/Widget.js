import React from "react"
import "./Widget/Widget.css"
import logo from "./Widget/apple-icon-57x57.png"
import NowPlaying from "./Widget/NowPlaying"

export default function Widget(props) {
    
    const transparency = props.transparency === 0 ? "transparent" : `rgba(34, 34, 34, ${props.transparency || 1})`
    
    return (
        <div className="App" style={{borderRadius: parseInt(props.corners), backgroundColor: transparency}}>
            {props.position === "left" && <Logo />}
            <div className="nowplaying">
                <NowPlaying 
                    uuid={props.id}
                    ratelimit={props.limit}
                    direction={props.dir}
                    speed={props.speed}
                    position={props.position}
                    offsetX={props.offsetX}
                    offsetY={props.offsetY}
                />
            </div>
            {props.position === "right" && <Logo />}
        </div>
    )
}

function Logo() {
    return (
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
    )
  }