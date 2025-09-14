import type { Path } from "./types";
import { isBaseAPIErrorResponse } from "./utils";

const BASE_API_HTTP_URL = "http://127.0.0.1:3000";
const BASE_API_WS_URL = "ws://127.0.0.1:3000";

type ApiClientOptions = {
  requestInit?: RequestInit;
  errorMessage?: string;
};

async function apiFetch<TResponse extends Record<string, any>>(
  path: Path,
  options?: ApiClientOptions,
): Promise<TResponse> {
  try {
    var res = await fetch(`${BASE_API_HTTP_URL}${path}`, options?.requestInit);
  } catch {
    throw new Error(
      options?.errorMessage || "An error occurred while fetching data",
    );
  }
  const data = await res.json();

  if (res.ok) return data;
  if (isBaseAPIErrorResponse(data)) console.warn(data.detail);

  throw new Error(
    options?.errorMessage || "An error occurred while fetching data",
  );
}

export { apiFetch, BASE_API_HTTP_URL, BASE_API_WS_URL };
