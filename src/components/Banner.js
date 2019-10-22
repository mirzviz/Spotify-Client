import React from "react";
import styled, { css, keyframes } from "styled-components";
import {
  colors as setColor,
  setRem,
  setLetterSpacing,
  setBorder,
  media
} from "../global/helperFunctions"


const fadeIn = (start, point, end) => {
  const animation = keyframes`
    0%{
    opacity:0;
    transform:translateY(${start})
    }
    50%{
    opacity:0.5;
    transform:translateY(${point})
    }
    100%{
    opacity:1;
    transform:translateY(${end})
    }
`;
  return css`
    animation: ${animation} 3s ease-in-out;
  `;
};

const Banner = ({ className, greeting, title, text, children }) => {
  return (
    <div className={className}>
      <h1>
        {greeting} <span>{title}</span>{" "}
      </h1>
      <div className="info">
        <p>{text}</p>
        {children}
      </div>
    </div>
  );
};

export default styled(Banner)`
  height: minmax(40vh, auto);
  width: 100vw;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 7rem 0rem 0rem 0;
  ${setLetterSpacing(3)}
  color: ${setColor.mainWhite};
  h1 {
    text-transform: capitalize;
    font-size: ${setRem(48)};
    color: ${setColor.primaryColor};
    span {
      color: ${setColor.mainWhite};
    }
  }
  p {
    width: 85%;
    margin: 0 auto;
  }
  ${media.phone` 
    width: 100vw;
    p {
      width: 75%;
    }`}

  ${media.tablet` 
    width: 100vw;
    p {
      width: 75%;
    }`}
   
  
  h1 {
   ${fadeIn("100%", "-10%", "0")}
    /* animation */
  }
  .info {
      ${fadeIn("-100%", "10%", "0")}

    /* animation */
  }
`;
