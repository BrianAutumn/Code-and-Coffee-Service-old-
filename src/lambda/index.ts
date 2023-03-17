import {APIGatewayProxyEventV2} from "aws-lambda";
import {APIGatewayProxyStructuredResultV2} from "aws-lambda/trigger/api-gateway-proxy";
import {getEvents} from "./service/calendar.service";
import {MeetupEvent} from "./dao/Meetup.dao";

export type EventsResponse = Array<MeetupEvent>

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> {
  const path = event.requestContext.http.path
  if(path == '/prod/api/events') {
    return {
      statusCode: 200,
      body: JSON.stringify(await getEvents()),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 404,
    body: 'Not found',
    headers: {
      "Content-Type": "application/json",
    },
  };
}
