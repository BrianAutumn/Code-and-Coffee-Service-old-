const options = {method: 'GET'};

type CalendarEvent = {
  start: {
    dateTime: string
  },
  summary: string,
  description: string
}

/**
 * Get the events from a Google Calendar.
 *
 * @param apiKey The API key to use
 * @param calendarId The ID of the calendar to get events from.
 */
export async function getCalendarEvents(apiKey:string, calendarId:string):Promise<CalendarEvent[]>{
  let response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&maxResults=50`, options)
  let data = await response.json() as {items:CalendarEvent[]}
  sortEvents(data.items)
  return data.items;
}

/**
 * Sort the events by start date.
 *
 * @param events
 */
function sortEvents(events:CalendarEvent[]){
  events.sort((a,b) => {
    return new Date(a.start.dateTime).valueOf() - new Date(b.start.dateTime).valueOf();
  })
}