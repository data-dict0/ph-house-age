import React from "react";
function Hero (props) {
    return (
        <div>
            <img style={{fontSize:'40px'}} src={props.HeroUrl} />
        </div>
    )
}

export default Hero