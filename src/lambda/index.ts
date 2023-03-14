import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  console.log('path:' + event.path)
  if(event.path !== '/api/test') {
    return {
      statusCode: 404,
      body: 'Not found :(',
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({test:'value'}),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
