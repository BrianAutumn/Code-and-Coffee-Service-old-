import React, {ReactNode, useState} from "react";
import styled from "styled-components";
import {People24Filled} from '@fluentui/react-icons'
import {Share24Filled} from '@fluentui/react-icons'
import {MeetupEvent} from "../lambda/dao/meetup.dao";
import {CoffeeButton} from "./components";

const PeopleIcon = People24Filled;
const ShareIcon = Share24Filled;

const EventContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

  font-family: 'Source Sans Pro', sans-serif;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-height: 150px;
  gap: 15px;
  border-bottom: 1px solid #DCDCDC;
  padding-bottom:15px;
  padding-top:15px;
  width: 100%;
`

const DateContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DateNumber = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`

const DateMonth = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: #6C6C6C;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
`

const CityIcon = styled.img`
  box-shadow: 0 0 16px 16px white inset;
  border-radius: 2px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width:400px;
  gap:10px;
`
const Spacer = styled.div`
  flex-grow: 1;
`

const DateInfo = styled.p`
  font-weight: 400;
  color: #6C6C6C;
  font-size: 16px;
  margin: 0;
`

const EventInfo = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 0;
`

const DescriptionInfo = styled.p`
  color: #6C6C6C;
  font-weight: 400;
  margin: 0;
`

const RsvpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`

const CityContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const CityLabel = styled.p`
  font-weight: 400;
  margin: 0;
  font-size: 12px;
  color: #6C6C6C;
`

const AttendeeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

const AttendeeCount = styled.p`
  font-weight: 700;
  margin: 0 0 0 5px;
  font-size: 15px;
`

const AttendeeLabel = styled.p`
  font-weight: 400;
  margin: 0;
  font-size: 15px;
  color: #6C6C6C;
  padding-left: 4px;
`

const EventImage = styled.img`
  max-width: 111px;
  max-height: 74px;
  border-radius: 5px;
`

const MonthShortFormatter = new Intl.DateTimeFormat('default',{month:'short'})
const MonthLongFormatter = new Intl.DateTimeFormat('default',{month:'long'})
const WeekdayFormatter = new Intl.DateTimeFormat('default',{weekday:'long'})
const DayFormatter = new Intl.DateTimeFormat('default',{day:'numeric'})
const HourFormatter = new Intl.DateTimeFormat('default',{hour:'numeric',hour12:true,minute:'2-digit'})

const EVENT_DESCRIPTION_LENGTH = 125;

export function CoffeeEvent({event}:{event:MeetupEvent}) {
  const [iconImage, setIconImage] = useState(undefined as undefined | ReactNode)
  fetch(`/city-icons/${event.group.id}.png`).then(response => {
    if (response.ok) {
      setIconImage(<CityIcon src={`/city-icons/${event.group.id}.png`} alt={`${event.group.city} Icon`}/>)
    }
  })
  const date = new Date(event.dateTime);
  const eventDateString = `${WeekdayFormatter.format(date)}, ${MonthLongFormatter.format(date)} ${DayFormatter.format(date)} at ${HourFormatter.format(date)}`
  const descriptionString = event.description.length > EVENT_DESCRIPTION_LENGTH ? event.description.substring(0,EVENT_DESCRIPTION_LENGTH) + ' ...' : event.description;
  return (
    <EventContainer>
      <DateContainer>
        <DateNumber>{DayFormatter.format(date)}</DateNumber>
        <DateMonth>{MonthShortFormatter.format(date)}</DateMonth>
      </DateContainer>
      <IconContainer>
        {iconImage}
      </IconContainer>
      <InfoContainer>
        <DateInfo>{eventDateString}</DateInfo>
        <EventInfo>{event.title}</EventInfo>
        <DescriptionInfo>{descriptionString}</DescriptionInfo>
      </InfoContainer>
      <Spacer/>
      <RsvpContainer>
        <EventImage src={event.imageUrl} alt="rsvp"/>
        <CityContainer>
          <CityLabel>{event.venue.city}, {event.venue.state.toUpperCase()}</CityLabel>
        </CityContainer>
        <AttendeeContainer>
          <PeopleIcon />
          <AttendeeCount>{event.going}</AttendeeCount>
          <AttendeeLabel>attendees</AttendeeLabel>
        </AttendeeContainer>
        <CoffeeButton text={'RSVP'} icon={<ShareIcon/>}/>
      </RsvpContainer>
    </EventContainer>
  )
}