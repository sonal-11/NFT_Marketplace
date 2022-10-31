import { prependOnceListener } from "process";
import React from "react";
import './Card.css'

const Cards = (props) => {
    return <>
        <div onClick={props.onClick} className="Card_container">
            <div className="Card_img"><img src={props.img}></img></div>
            <div className="Card_info">
              <h1>{props.heading}</h1>
              <p>{props.info}</p>
            </div>
        </div>
    </>
}

export default Cards