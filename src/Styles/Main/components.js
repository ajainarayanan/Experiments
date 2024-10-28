import styled, { keyframes, css } from 'styled-components';
import {
  boxShadow,
  colors
} from './variables';

export const HeadingLink = styled.a`
  color: ${colors.brightBlue};
  text-decoration: none,
  small: {
    margin: 0 5px
  }
`;

export const SpinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  padding: 10px;
  @media(max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media(min-width: 769px) and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media(min-width: 1001px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ShortCardWrapper = CardWrapper.extend`
  @media(max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, auto));
  }

  @media(min-width: 769px) and (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, auto));
  }

  @media(min-width: 1001px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, auto));
  }
`;

export const Spin = styled.div`
  animation: ${SpinAnimation} 1s infinite
`;

export const FlexColumnStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


export const Card = styled.div`
  border: 1px solid ${colors.tollerantPink};
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  box-shadow: ${boxShadow(colors.orange)};
  word-wrap: break-word;
  text-decoration: none;
  ${FlexColumnStyles};
  :hover {
    text-decoration: none;
    box-shadow: 0px 0px 10px 2px ${colors.orange}
  }
  .footer {
    border-top: 1px solid;
    margin: 15px 0 0;
  }
`;

export const ShortCard = Card.extend`
  width: 100px;
`;

export const Button = styled.button`
  border: 1px solid ${colors.tollerantPink};
  box-shadow: 1px 1px 1px 1px ${colors.orange};
  transition: ease-in box-shadown;
  &:active {
    box-shadow: inset ${boxShadow(colors.orange)} !important;
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &[disabled] {
    cursor: not-allowed
  }
`;

export const InvalidResponse = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .icon-svg {
    font-size: 10rem
  }

  > h1 {
    font-size: 15rem
  }

  > pre {
    width: 100%;
    color: ${colors.red},
    background-color: ${colors.lightenPurple}
  }
`;

export const MetaWrapper = styled.div`
  margin: 5px 0 0;
  display: flex;
  > span {
    padding: 0 5px;
    display: flex;
    align-items: center;
  }

  .icon-svg {
    margin-right: 5px;
  }
`;
