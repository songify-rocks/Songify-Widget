import React, { Component } from "react";
import "./Widget/Widget.css";
import songifyLogo from "./Widget/apple-icon-57x57.png";
import NowPlaying from "./Widget/NowPlaying";
import 'animate.css';

export default class Widget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logo: songifyLogo,
            animationClass: ''  // Animation class starts as empty
        };
    }

    handleTrackChange = () => {
        if (this.props.showHideOnChange) {
            // Apply the entrance animation
            this.setState({ animationClass: `animate__${this.props.showAnimation || 'fadeIn'}` });

            // Wait for showDuration milliseconds before switching to the exit animation
            setTimeout(() => {
                // Remove the entrance animation and apply the exit animation
                this.setState({ animationClass: `animate__${this.props.hideAnimation || 'fadeOut'}` });
            }, this.props.showDuration * 1000 || 3000); // Default to 3 seconds if showDuration is not provided
        }
    };

    componentDidMount = () => {
        this.updateLogo("");

        console.log(this.props);
        if (this.props.preview) {
            console.log("Preview mode");
            // Loop handletrackchange every props.showDuration + 5 * 1000   
            this.handleTrackChange();
            setInterval(this.handleTrackChange, (this.props.showDuration * 1000) + 2000);
        }
    }

    componentDidUpdate(prevProps) {
        // Check if the track has changed and trigger animation if necessary
        if (prevProps.id !== this.props.id) {
            this.handleTrackChange();
        }
    }

    updateLogo = (cover) => {
        if (this.props.cover === "true" || this.props.cover === true) {
            if (!cover) {
                this.setState({ logo: songifyLogo });
            } else {
                this.setState({ logo: cover });
            }
        } else {
            this.setState({ logo: songifyLogo });
        }
    }

    render() {
        const transparency = this.props.transparency === 0 ? "transparent" : `rgba(34, 34, 34, ${this.props.transparency || 1})`;

        return (
            <div
                className={`App visible ${this.state.animationClass} animate__animated`}
                style={{
                    borderRadius: parseInt(this.props.corners),
                    backgroundColor: transparency
                }}
            >
                {this.props.position === "left" && <Logo logo={this.state.logo} />}

                <div className="title" style={{ left: this.props.position === "right" ? 20 : 55 }}>
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
                        onTrackChange={this.handleTrackChange}
                    />
                </div>

                <div className="poweredby">
                    powered by songify
                </div>

                {this.props.position === "right" && <Logo logo={this.state.logo} />}
            </div>
        );
    }
}

function Logo(props) {
    return (
        <div className="logo">
            <img src={props.logo} alt="logo" />
        </div>
    );
}
