import { StatusCode } from "hono/utils/http-status";

export abstract class Response {
  public static baseBodyObject = <T>(
    body: ResponseBaseParameter<T>
  ): ResponseBaseReturn<T> => {
    if (body.success) {
      return {
        success: body.success,
        result: body.result,
        message: body.message,
        status: body.status,
      };
    }
    return {
      success: body.success,
      message: body.message,
      status: body.status,
    };
  };
}

type ResponseBaseParameter<T> =
  | {
      success: true;
      result?: T;
      message: string;
      status: StatusCode | (number & {});
    }
  | {
      success: false;
      message: string;
      status: StatusCode | (number & {});
    };

type ResponseBaseReturn<T> =
  | {
      success: true;
      result?: T;
      message: string;
      status: StatusCode | (number & {});
    }
  | {
      success: false;
      message: string;
      status: StatusCode | (number & {});
    };
