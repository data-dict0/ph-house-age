import React from "react";

function ChartHead(props) {
    return (
      <div>
        <h2 style={{fontSize:'24px'}}>{props.ChartTitle}</h2>
        <p className='dek'>{props.dek}</p>
      </div>
    );
  }

  export default ChartHead;