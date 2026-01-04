import React, { Component } from "react"
import "./Generator/Generator.css"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';
import Widget from "../Widget"
import Switch from "react-switch"
import 'animate.css';

const SliderHandle = Slider.Handle;

const HandleWithTooltip = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <SliderHandle value={value} {...restProps}>
            {dragging && (
                <div className="slider-tooltip">
                    {value}
                </div>
            )}
        </SliderHandle>
    );
};

export default class Generator extends Component {
    constructor(props) {
        super(props)

        // Default state
        const defaultState = {
            uuid: "",
            speed: 20,
            scrollDirection: "reverse",
            scrollAnimation: "continuous",
            iconPosition: "left",
            borderRadius: 10,
            transparency: 0.6,
            url: "",
            uuidUrl: "",
            useCover: false,
            useCanvas: false,
            showHideOnChange: false,
            showAnimation: "fadeIn",
            hideAnimation: "fadeOut",
            showDuration: 5,
            enableScroll: true,
            version: 1,
            copyFeedback: false
        };

        // Try to load saved preferences from localStorage
        const saved = localStorage.getItem('songify-widget-prefs');
        if (saved) {
            try {
                const savedPrefs = JSON.parse(saved);
                this.state = { ...defaultState, ...savedPrefs, copyFeedback: false };
            } catch (e) {
                this.state = defaultState;
            }
        } else {
            this.state = defaultState;
        }
    }

    // Save preferences to localStorage (excluding temporary UI state)
    savePreferences = () => {
        const { url, copyFeedback, ...prefsToSave } = this.state;
        localStorage.setItem('songify-widget-prefs', JSON.stringify(prefsToSave));
    };


    componentDidMount = () => {
        // If ID is provided via props, use it; otherwise use saved UUID
        const uuid = this.props.id || this.state.uuid;
        if (uuid) {
            this.setState({
                uuidUrl: `https://api.songify.rocks/v2/getsong?uuid=${uuid}`,
                uuid: uuid
            });
            this.updateLink(uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
        } else if (this.state.uuid) {
            // If we have a saved UUID, generate the link
            this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
        }
    };

    buildBaseUrl = () => {
        return `${window.location.protocol}//${window.location.hostname}`;
    };


    copyText = async () => {
        try {
            await navigator.clipboard.writeText(this.state.url);
            this.setState({ copyFeedback: true });
            setTimeout(() => {
                this.setState({ copyFeedback: false });
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textbox = document.getElementById("url");
            textbox.select();
            document.execCommand("copy");
            this.setState({ copyFeedback: true });
            setTimeout(() => {
                this.setState({ copyFeedback: false });
            }, 2000);
        }
    };

    urlHandler = (event) => {
        const text = event.target.value;
        let uuid = text.split("?id=")[1];
        
        // Also handle direct UUID input or UUID from path
        if (!uuid) {
            // Check if it's a direct UUID or from URL path
            const uuidMatch = text.match(/[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/i);
            if (uuidMatch) {
                uuid = uuidMatch[0];
            }
        }

        this.setState({
            uuidUrl: text,
            uuid: uuid || ""
        }, this.savePreferences);
        this.updateLink(uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleIcon = (event) => {
        this.setState({
            iconPosition: event.target.value,
            version: this.state.version + 1
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, event.target.value, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleScroll = (event) => {
        this.setState({
            scrollDirection: event.target.value
        }, this.savePreferences);
        this.updateLink(this.state.uuid, event.target.value, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleScrollAnimation = (event) => {
        this.setState({
            scrollAnimation: event.target.value
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, event.target.value);
    };

    handleCover = (checked) => {
        this.setState({
            useCover: checked,
            version: this.state.version + 1
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, checked, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleCanvas = (checked) => {
        this.setState({
            useCanvas: checked,
            version: this.state.version + 1
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, checked, this.state.enableScroll, this.state.scrollAnimation);
    };

    showHideOnChange = (checked) => {
        this.setState({
            showHideOnChange: checked
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, checked, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleEnableScroll = (checked) => {
        this.setState({
            enableScroll: checked,
            version: this.state.version + 1
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, checked, this.state.scrollAnimation);
    };

    handleShowAnimation = (event) => {
        this.setState({
            showAnimation: event.target.value
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, event.target.value, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleHideAnimation = (event) => {
        this.setState({
            hideAnimation: event.target.value
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, event.target.value, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    handleShowDuration = (event) => {
        const duration = parseFloat(event.target.value) || 0;
        this.setState({
            showDuration: duration
        }, this.savePreferences);
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, duration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
    };

    updateLink(uuid, dir, speed, transparency, position, corners, cover, showHideOnChange, showAnimation, hideAnimation, showDuration, useCanvas, enableScroll, scrollAnimation) {
        this.setState({
            url: `${this.buildBaseUrl()}${`?id=${uuid}&`}dir=${dir}&speed=${speed}&transparency=${transparency}&position=${position}&corners=${corners}&cover=${cover}&showHideOnChange=${showHideOnChange}&showAnimation=${showAnimation}&hideAnimation=${hideAnimation}&showDuration=${showDuration}&canvas=${useCanvas}&enableScroll=${enableScroll}&scrollAnimation=${scrollAnimation}`
        })
    }


    render() {
        const inAnimations = [
            "bounceIn", "fadeIn", "fadeInDown", "fadeInLeft", "fadeInRight", "fadeInUp", "flipInX",
            "flipInY", "lightSpeedInLeft", "lightSpeedInRight", "rotateIn", "rotateInDownLeft", "rotateInDownRight",
            "rotateInUpLeft", "rotateInUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "zoomIn",
            "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "jackInTheBox", "rollIn"
        ];

        const outAnimations = [
            "bounceOut", "fadeOut", "fadeOutDown", "fadeOutLeft", "fadeOutRight", "fadeOutUp", "flipOutX",
            "flipOutY", "lightSpeedOutLeft", "lightSpeedOutRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight",
            "rotateOutUpLeft", "rotateOutUpRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "zoomOut",
            "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "hinge", "rollOut"
        ];

        return (
            <div className="Generator">
                <nav>
                    <h2>Songify Widget Generator</h2>
                </nav>
                
                <div className="generator-content">
                    {/* Settings Panel */}
                    <div className="settings-panel">
                        
                        {/* Setup Section */}
                        <div className="settings-section">
                            <h3>Setup</h3>
                            <div className="setting select">
                                <div>Songify URL</div>
                                <input 
                                    value={this.state.uuidUrl}
                                    placeholder="Paste your Songify URL or UUID here"
                                    onChange={this.urlHandler} 
                                />
                            </div>
                        </div>

                        {/* Appearance Section */}
                        <div className="settings-section">
                            <h3>Appearance</h3>
                            <div className="setting select">
                                <div>Rounded Corners</div>
                                <Slider min={0} max={45} value={this.state.borderRadius} handle={HandleWithTooltip} onChange={(value) => {
                                    this.setState({ borderRadius: value }, this.savePreferences);
                                    this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, value, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
                                }} />
                            </div>
                            <div className="setting select">
                                <div>Transparency</div>
                                <Slider min={0} max={1} value={this.state.transparency} step={0.01} handle={HandleWithTooltip} onChange={(value) => {
                                    this.setState({ transparency: value }, this.savePreferences);
                                    this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, value, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
                                }} />
                            </div>
                            <div className="setting select">
                                <div>Icon Position</div>
                                <select value={this.state.iconPosition} onChange={this.handleIcon}>
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                            <div className="setting select">
                                <div>Use Album Cover</div>
                                <Switch checked={this.state.useCover} onChange={this.handleCover} onColor="#1ec258" offColor="#333333" />
                            </div>
                            <div className="setting select">
                                <div>Use Canvas (if available)</div>
                                <Switch checked={this.state.useCanvas} onChange={this.handleCanvas} onColor="#1ec258" offColor="#333333" />
                            </div>
                        </div>

                        {/* Scrolling Section */}
                        <div className="settings-section">
                            <h3>Text Scrolling</h3>
                            <div className="setting select">
                                <div>Enable Scroll</div>
                                <Switch checked={this.state.enableScroll} onChange={this.handleEnableScroll} onColor="#1ec258" offColor="#333333" />
                            </div>
                            {this.state.enableScroll && (
                                <>
                                    <div className="setting select">
                                        <div>Scroll Speed</div>
                                        <Slider min={10} max={80} value={this.state.speed} step={1} handle={HandleWithTooltip} onChange={(value) => {
                                            this.setState({ speed: value }, this.savePreferences);
                                            this.updateLink(this.state.uuid, this.state.scrollDirection, value, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas, this.state.enableScroll, this.state.scrollAnimation);
                                        }} />
                                    </div>
                                    <div className="setting select">
                                        <div>Scroll Direction</div>
                                        <select value={this.state.scrollDirection} onChange={this.handleScroll}>
                                            <option value="reverse">Right to Left</option>
                                            <option value="normal">Left to Right</option>
                                        </select>
                                    </div>
                                    <div className="setting select">
                                        <div>Scroll Style</div>
                                        <select value={this.state.scrollAnimation} onChange={this.handleScrollAnimation}>
                                            <option value="continuous">Continuous Loop</option>
                                            <option value="bounce">Bounce</option>
                                            <option value="stop">Stop at End</option>
                                            <option value="fade">Fade Edges</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Animation Section */}
                        <div className="settings-section">
                            <h3>Show/Hide Animation</h3>
                            <div className="setting select">
                                <div>Animate on Song Change</div>
                                <Switch checked={this.state.showHideOnChange} onChange={this.showHideOnChange} onColor="#1ec258" offColor="#333333" />
                            </div>
                            {this.state.showHideOnChange && (
                                <>
                                    <div className="setting select">
                                        <div>Show Animation</div>
                                        <select value={this.state.showAnimation} onChange={this.handleShowAnimation}>
                                            {inAnimations.map(animation => (
                                                <option key={animation} value={animation}>{animation}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="setting select">
                                        <div>Hide Animation</div>
                                        <select value={this.state.hideAnimation} onChange={this.handleHideAnimation}>
                                            {outAnimations.map(animation => (
                                                <option key={animation} value={animation}>{animation}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="setting select">
                                        <div>Display Duration (seconds)</div>
                                        <input type="number" value={this.state.showDuration} onChange={this.handleShowDuration} />
                                    </div>
                                </>
                            )}
                        </div>

                    </div>

                    {/* Preview Panel */}
                    <div className="preview-panel">
                        <div className="preview">
                            <Widget
                                id={this.state.uuid}
                                transparency={this.state.transparency}
                                limit={3000}
                                dir={this.state.scrollDirection}
                                speed={this.state.speed}
                                position={this.state.iconPosition}
                                corners={this.state.borderRadius}
                                cover={this.state.useCover}
                                canvas={this.state.useCanvas}
                                showHideOnChange={this.state.showHideOnChange}
                                showAnimation={this.state.showAnimation}
                                hideAnimation={this.state.hideAnimation}
                                showDuration={this.state.showDuration}
                                enableScroll={this.state.enableScroll}
                                scrollAnimation={this.state.scrollAnimation}
                                preview={true}
                                version={this.state.version}
                            />
                        </div>
                        
                        <div className="url-output">
                            <textarea
                                id="url"
                                readOnly
                                value={this.state.url}
                                placeholder="Your widget URL will appear here..."
                            />
                            <button 
                                className={`copy-button ${this.state.copyFeedback ? 'copied' : ''}`}
                                onClick={this.copyText}
                                disabled={!this.state.url}
                            >
                                {this.state.copyFeedback ? '✓ Copied!' : 'Copy Widget URL'}
                            </button>
                            <div className="widthheight">
                                Recommended size: <code>312 × 64 px</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}