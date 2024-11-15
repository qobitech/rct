import React from 'react'
import styled from 'styled-components'

const ButtonLoader: React.FC<React.ComponentPropsWithoutRef<'span'>> = ({
  ...props
}) => {
  return (
    <ButtonLoaderStyle>
      <div className="loading">
        <span {...props}></span>
        <span {...props}></span>
        <span {...props}></span>
      </div>
    </ButtonLoaderStyle>
  )
}

export default ButtonLoader

const ButtonLoaderStyle = styled.div`
  .loading {
    display: block;
    width: 100% !important;
    height: 100% !important;
    position: relative !important;
    margin: 0 auto !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .loading span {
    left: 0;
    background: white;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: loading 1s infinite linear;
    margin: 0;
    box-sizing: border-box;
  }
  .loading span:nth-of-type(2) {
    left: 23px;
    animation-delay: 0.2s;
  }
  .loading span:last-of-type {
    left: 46px;
    animation-delay: 0.2s;
  }
  @keyframes loading {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.5);
    }
  }
`
