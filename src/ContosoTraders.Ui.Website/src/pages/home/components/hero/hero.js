import React, { Component } from "react";

import { Translation } from "react-i18next";

import Corousel from "./Corousel";
class Hero extends Component {
    constructor(props) {
        super(props);
        this.bgImg = React.createRef();
    }

    render() {
        return (
            <Translation>
                {t => (
                    <div className="hero">
                        <Corousel />
                    </div>
                )}
            </Translation>
        );
    }
}

export default Hero;
