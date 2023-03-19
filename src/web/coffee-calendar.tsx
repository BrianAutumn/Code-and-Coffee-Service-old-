import React, {useState} from "react";
import {CoffeeEvent} from "./coffee-event";
import styled from "styled-components";
import {CalendarLtr32Regular} from "@fluentui/react-icons";
import {getEvents} from "./coffee.dao";
import {CoffeeButton} from "./components";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({height}: { height: number }) => height}px;
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
  padding-right: 20px;
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
    background: #dbc4ff;
    border: 2px solid black;
    border-radius: 2px;
  }
`

export function CoffeeCalendar({height}:{height:number}) {
  const [coffeeEvents, setCoffeeEvents] = useState([] as Array<JSX.Element>);
  getEvents().then((events) => {
    const newCoffeeEvents = [] as Array<JSX.Element>
    let i = 0;
    for(const event of events) {
      newCoffeeEvents.push(<CoffeeEvent event={event} key={i}/>);
      i++
    }
    newCoffeeEvents.push(
      <CoffeeButton text={"More Events"} icon={<CalendarLtr32Regular/>} size={'large'} key={i}/>
    )
    setCoffeeEvents(newCoffeeEvents)
  })

  return (
    <CalendarContainer height={height}>
      <EventTitle>
        Events
      </EventTitle>
      <EventHolder>
        {coffeeEvents}
      </EventHolder>
    </CalendarContainer>
  )
}