import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'


export type RequestOptions = AxiosRequestConfig & {
  name:string
}
export async function request(options:RequestOptions):Promise<AxiosResponse>{
  console.info(`Requesting ${options.name} with options: ${JSON.stringify(options)}`);
  try{
    const response = await axios(options)
    console.info(`Request ${options.name} succeeded with response: ${JSON.stringify(response)}`);
    return response;
  } catch (e) {
    console.error(`Request ${options.name} failed with error: ${JSON.stringify(e)}`);
    throw e;
  }
}