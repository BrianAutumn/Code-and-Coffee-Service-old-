import {APIGatewayEventRequestContextV2, APIGatewayProxyEventV2, APIGatewayProxyResultV2} from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEventV2,
  context: APIGatewayEventRequestContextV2
): Promise<APIGatewayProxyResultV2> {
  const path = context.http.path
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
