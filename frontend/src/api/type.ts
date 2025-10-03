export type EndpointType<REQUEST, RESPONSE, TRANSFORMED> = {
  Request: REQUEST;
  Response: RESPONSE;
  Transformed: TRANSFORMED;
};

export type ReponseResult<RESULT> = {
  message: string;
  result: RESULT;
  success: boolean;
  status: number;
};
