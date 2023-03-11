type MeetupEvent = {
  going: number;
};

type MeetupResponse = {
  data: {
    event: {
      going: number;
    };
  };
};

/**
 * Get the details of a meetup event.
 *
 * @param eventId The ID of the event to get.
 */
export async function getMeetupEvent(eventId: string): Promise<MeetupEvent> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"query":"query {event(id:${eventId}){going}}"}`,
  };
  const response = await fetch("https://api.meetup.com/gql", options);
  const data = (await response.json()) as MeetupResponse;
  return {
    going: data.data.event.going,
  };
}
