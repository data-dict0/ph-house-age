import React from "react";

function Headline(props) {
  const css = `
    .dek {
      font-weight: lighter;
      text-align: center;
      font-size: 18px;
      display: block;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
      overflow-wrap: break-word;
      hyphens: auto;
    }

    .byline {
      text-align: center;
    }    

    h1 {
      text-align: center;
      font-size: 40px;
    }

    @media (min-width: 330px) and (max-width: 560px) {
      h1 {
        font-size: 30px;
      }

      .dek {
        font-size: 16px;
        max-width: 300px;
      }
      
      .byline {
        font-size: 16px;
      }
    }
  `
  return (
    <div>
      <style>{css}</style>
      <h1>{props.title}</h1>
      <p className='dek'>{props.dek}</p>
      <p className='byline'>{props.byline}</p>
    </div>
  );
}

export default Headline;