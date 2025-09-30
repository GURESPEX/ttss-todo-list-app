export type EndpointType<REQUEST, RESPONSE, TRANSFORMED> = {
  Request: REQUEST;
  Response: RESPONSE;
  Transformed: TRANSFORMED;
};
