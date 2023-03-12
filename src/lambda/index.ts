import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log(event, context);
  const responseBody = {test:'value'};
  const responseHeaders = {
    "Content-Type": "application/json",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
    headers: responseHeaders,
  };
}
