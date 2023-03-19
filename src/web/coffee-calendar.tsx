import React from "react";
import {CoffeeEvent} from "./coffee-event";
import styled from "styled-components";
import {CalendarLtr32Regular} from "@fluentui/react-icons";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({height}:{height:number}) => height}px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 3px 3px 33px rgba(0, 0, 0, 0.04);
`

const EventTitle = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap');
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 36px;
  margin: 0 0 10px 0;
`

const EventHolder = styled.div`
  border-top: 1px solid #DCDCDC;
  border-bottom: 1px solid #DCDCDC;
  overflow-y: scroll;
  padding-right:20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    transform: rotate(180deg);
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #D4B9FF;
    border: 1px solid black;
    border-radius: 2px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #D4B9FF;
    border: 1px solid black;
    border-radius: 2px;
  }
`

const MoreEventsButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #D4B9FF;
  border: 1px solid #000000;
  border-radius: 5px;
  font-weight: 700;
  font-size: 15px;
  padding: 16px 80px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export function CoffeeCalendar(height:number){
  const events = [
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    CoffeeEvent(),
    <MoreEventsButton>
      More Events
      <CalendarLtr32Regular/>
    </MoreEventsButton>
  ]

  return (
    <CalendarContainer height={height}>
      <EventTitle>
        Events
      </EventTitle>
      <EventHolder>
        {events}
      </EventHolder>
    </CalendarContainer>
  )
}