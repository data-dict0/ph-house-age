import React from "react";

function ChartHead(props) {
  const css = `
    .Chart {
        margin: 1rem 0;
        padding: 0px 5px;
        line-height: 27px;
    }
    h3, p {
        margin: 5px;
    }

    .ChartContainer {
        position: relative;
        margin-left: auto;
        margin-right: auto;
        max-width: 800px;
  }
`
  return (
    <section className='ChartContainer'>
      <div className='Chart'>
        <style>{css}</style>
        <h3>{props.ChartHeader}</h3>
        <p>{props.ChartSubhead}</p>
      </div>
    </section>
  );
}

export default ChartHead;