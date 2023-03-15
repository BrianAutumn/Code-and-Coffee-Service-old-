import {APIGatewayEventRequestContextV2, APIGatewayProxyResult} from "aws-lambda";

export async function handler(
  event: APIGatewayEventRequestContextV2
): Promise<APIGatewayProxyResult> {
  const path = event.http.path
  if(path !== '/prod/api/test') {
    return {
      statusCode: 404,
      body: 'Not found  :(',
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
