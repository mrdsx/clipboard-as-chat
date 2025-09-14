import type { BaseAPIErrorResponse } from "./types";

function isBaseAPIErrorResponse(data: unknown): data is BaseAPIErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "detail" in data &&
    typeof data.detail === "string"
  );
}

export { isBaseAPIErrorResponse };
