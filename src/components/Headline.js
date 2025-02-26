import React from "react";

function Headline(props) {
    return (
      <div>
        <h1 style={{fontSize:'40px'}}>{props.title}</h1>
        <p className='dek'>{props.dek}</p>
        <p className='byline'>{props.byline}</p>
      </div>
    );
  }

  export default Headline;