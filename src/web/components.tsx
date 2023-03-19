import styled from "styled-components";
import React, {ReactNode} from "react";

type Size = 'small'|'large';

const StyledButtonTest = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #D4B9FF;
  gap: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  font-weight: 700;
  font-size: 15px;
  padding: ${({padding}:{padding:string}) => padding};
  transition: background .2s, box-shadow .2s;

  :hover {
    background: #dbc4ff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),0 2px 2px 0 rgba(0, 0, 0, .14),0 1px 5px 0 rgba(0, 0, 0, .12);
    cursor: pointer;
  }
`

export function CoffeeButton({size = 'small',text, icon}:{size?: Size,text:string, icon?:ReactNode}) {
  const padding = size === 'small' ? '8px 16px' : '16px 80px';

  return (
    <StyledButtonTest padding={padding}>
      {text}
      {icon}
    </StyledButtonTest>
  )
}