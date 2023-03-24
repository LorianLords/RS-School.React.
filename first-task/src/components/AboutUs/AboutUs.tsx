import React, {Component} from "react";
import s from "./AboutUs.module.css"
class AboutUs extends Component<any, any> {
    render() {
        return (
            <div>
                <h1 className={s.text}>Hello and thanks for coming</h1>
            </div>
        )
    }
}

export default AboutUs;