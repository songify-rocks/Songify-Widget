import React, { Component, version } from "react"
import "./Generator/Generator.css"
import { Container, Row, Col } from "react-grid-system"
import Slider from "rc-slider"
import Tooltip from "rc-tooltip"
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Widget from "../Widget"
import Switch from "react-switch" // Keep this, it's for the toggle button
import 'animate.css';
const Handle = Slider.Handle;

export default class Generator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uuid: "",
            speed: 20,
            scrollDirection: "reverse",
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
            version: 1
        }
    }

    handleBorder = (props) => {
        const { value, dragging, index, ...restProps } = props;
        if (value !== this.state.borderRadius) {
            this.setState({
                borderRadius: value
            });
            this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, value, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
        }
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value} // The tooltip now dynamically updates based on the slider value
                visible={dragging} // Show tooltip when the handle is being dragged
                placement="top" // Position the tooltip on top
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    componentDidMount = () => {
        if (this.props.id != null) {
            this.setState({
                uuidUrl: `https://api.songify.rocks/v2/getsong?uuid=${this.props.id}`,
                uuid: this.props.id
            });
            this.updateLink(this.props.id, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
        }
    };

    buildBaseUrl = () => {
        return `${window.location.protocol}//${window.location.hostname}`;
    };

    handleTransparency = (props) => {
        const { value, dragging, index, ...restProps } = props;
        if (value !== this.state.transparency) {
            this.setState({
                transparency: value
            });
            this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, value, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
        }
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    handleSpeed = (props) => {
        const { value, dragging, index, ...restProps } = props;
        if (value !== this.state.speed) {
            this.setState({
                speed: value
            });
            this.updateLink(this.state.uuid, this.state.scrollDirection, value, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
        }
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    copyText = () => {
        const textbox = document.getElementById("url");
        textbox.select();
        document.execCommand("copy");
    };

    urlHandler = (event) => {
        const text = event.target.value;
        const uuid = text.split("?id=")[1];

        this.setState({
            uuidUrl: text,
            uuid
        });
        this.updateLink(uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
    };

    handleIcon = (event) => {
        this.setState({
            iconPosition: event.target.value
        });
        this.state.version = this.state.version + 1;
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, event.target.value, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
    };

    handleScroll = (event) => {
        this.setState({
            scrollDirection: event.target.value
        });
        this.updateLink(this.state.uuid, event.target.value, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
    };

    handleCover = (checked) => {
        this.setState({
            useCover: checked
        });
        this.state.version = this.state.version + 1;

        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, checked, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
    };

    handleCanvas = (checked) => {
        this.setState({
            useCanvas: checked
        });
        this.state.version = this.state.version + 1;

        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, checked, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, checked);
    };

    showHideOnChange = (checked) => {
        this.setState({
            showHideOnChange: checked
        });
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, checked, this.state.showAnimation, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
    };

    handleShowAnimation = (event) => {
        this.setState({
            showAnimation: event.target.value
        });
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, event.target.value, this.state.hideAnimation, this.state.showDuration, this.state.useCanvas);
    };

    handleHideAnimation = (event) => {
        this.setState({
            hideAnimation: event.target.value
        });
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, event.target.value, this.state.showDuration, this.state.useCanvas);
    };

    handleShowDuration = (event) => {
        const duration = parseFloat(event.target.value) || 0;
        this.setState({
            showDuration: duration
        });
        this.updateLink(this.state.uuid, this.state.scrollDirection, this.state.speed, this.state.transparency, this.state.iconPosition, this.state.borderRadius, this.state.useCover, this.state.showHideOnChange, this.state.showAnimation, this.state.hideAnimation, duration, this.state.useCanvas);
    };

    updateLink(uuid, dir, speed, transparency, position, corners, cover, showHideOnChange, showAnimation, hideAnimation, showDuration, useCanvas) {
        this.setState({
            url: `${this.buildBaseUrl()}${`?id=${uuid}&`}dir=${dir}&speed=${speed}&transparency=${transparency}&position=${position}&corners=${corners}&cover=${cover}&showHideOnChange=${showHideOnChange}&showAnimation=${showAnimation}&hideAnimation=${hideAnimation}&showDuration=${showDuration}&canvas=${useCanvas}`
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
                <div style={{ marginTop: "8vh" }}>
                    <div style={{ paddingTop: 50 }}>
                        <Container style={{ marginTop: 50 }}>
                            <Row>
                                <Col sm={7}>
                                    <div className="setting select">
                                        <div>Song Upload URL: </div>
                                        <input value={this.state.uuidUrl}
                                            placeholder="https://api.songify.rocks/v2/getsong?uuid=[your-uuid-here]"
                                            onChange={this.urlHandler} />
                                    </div>
                                    <div className="setting select">
                                        <div>Rounded Corners:</div>
                                        <Slider min={0} max={45} defaultValue={10} handle={this.handleBorder} style={{ width: 332, marginTop: 15 }} />
                                    </div>
                                    <div className="setting select">
                                        <div className="text">
                                            <div>Icon position: </div>
                                        </div>
                                        <div className="selection">
                                            <select value={this.state.iconDirection} onChange={this.handleIcon}>
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="setting select">
                                        <div className="text">
                                            <div>Scroll Direction: </div>
                                        </div>
                                        <div className="selection">
                                            <select value={this.state.scrollDirection} onChange={this.handleScroll}>
                                                <option value="reverse">Right to Left</option>
                                                <option value="normal">Left to Right</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="setting select">
                                        <div>Transparency: </div>
                                        <Slider min={0} max={1} defaultValue={0.6} step={0.01} style={{ width: 332, marginTop: 15 }} handle={this.handleTransparency} />
                                    </div>
                                    <div className="setting select">
                                        <div>Scroll Speed: </div>
                                        <Slider min={10} max={80} defaultValue={20} step={1} style={{ width: 332, marginTop: 15 }} handle={this.handleSpeed} />
                                    </div>
                                    <div className="setting select">
                                        <div>Use album cover:</div>
                                        <Switch checked={this.state.useCover} onChange={this.handleCover} />
                                    </div>
                                    <div className="setting select">
                                        <div>Use canvas (if available):</div>
                                        <Switch checked={this.state.useCanvas} onChange={this.handleCanvas} />
                                    </div>
                                    <div className="setting select">
                                        <div>Show / Hide on song change</div>
                                        <Switch checked={this.state.showHideOnChange} onChange={this.showHideOnChange} />
                                    </div>

                                    <div className="setting select">
                                        <div>Show Animation</div>
                                        <select value={this.state.showAnimation} onChange={this.handleShowAnimation}>
                                            {inAnimations.map(animation => (
                                                <option key={animation} value={animation}>
                                                    {animation}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="setting select">
                                        <div>Hide Animation</div>
                                        <select value={this.state.hideAnimation} onChange={this.handleHideAnimation}>
                                            {outAnimations.map(animation => (
                                                <option key={animation} value={animation}>
                                                    {animation}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="setting select">
                                        <div>Show Duration (s)</div>
                                        <input type="number" value={this.state.showDuration} onChange={this.handleShowDuration} style={{ width: 118 }} />
                                    </div>

                                </Col>
                                <Col sm={5}>
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
                                            preview={true}
                                            version={this.state.version}
                                        />
                                    </div>
                                    <textarea
                                        style={{ height: 140, width: 368, resize: 'vertical' }}
                                        id="url"
                                        className="link-generator"
                                        type="text"
                                        readOnly
                                        value={this.state.url}
                                        onClick={this.copyText}
                                        placeholder="https://widget.songify.rocks/" />
                                    <div className="widthheight">
                                        width: <code>312 px</code>, height: <code>64 px</code>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}