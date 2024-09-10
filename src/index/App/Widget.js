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

    // Convert string props to proper types (booleans/numbers)
    convertProps = () => {
        return {
            showHideOnChange: this.props.showHideOnChange === 'true',
            cover: this.props.cover === 'true',
            corners: parseInt(this.props.corners, 10) || 0,
            transparency: this.props.transparency !== undefined ? parseFloat(this.props.transparency) : 1,
            speed: parseInt(this.props.speed, 10) || 0,
            showDuration: parseFloat(this.props.showDuration) || 3
        };
    };

    handleTrackChange = (customDuration) => {
        const { showHideOnChange } = this.convertProps();

        if (!showHideOnChange) {
            return; // Exit early if showHideOnChange is false
        }

        let duration = customDuration || this.props.showDuration;
        duration = (duration || 3) * 1000; // Default to 3 seconds if customDuration or showDuration is not provided

        // Apply the entrance animation
        this.setState({ animationClass: `animate__${this.props.showAnimation || 'fadeIn'}` });

        // Wait for 'duration' before switching to the exit animation
        setTimeout(() => {
            // Remove the entrance animation and apply the exit animation
            this.setState({ animationClass: `animate__${this.props.hideAnimation || 'fadeOut'}` });
        }, duration);
    };

    componentDidMount = () => {
        this.updateLogo("");

        if (this.props.preview) {

            // Initial call to start animation
            this.handleTrackChange();

            // Use setInterval and pass the function reference with an arrow function
            setInterval(() => this.handleTrackChange(5), this.props.showDuration * 1000 + 2000);
        }
    };

    componentDidUpdate(prevProps) {
        // Check if the track has changed and trigger animation if necessary
        if (prevProps.id !== this.props.id) {
            this.handleTrackChange();
        }
    }

    updateLogo = (cover) => {
        const { cover: useCover } = this.convertProps();

        if (useCover) {
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
        const { corners, transparency } = this.convertProps();

        return (
            <div
                className={`App visible ${this.state.animationClass} animate__animated`}
                style={{
                    borderRadius: corners,
                    backgroundColor: transparency === 0 ? "transparent" : `rgba(34, 34, 34, ${transparency})`
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
