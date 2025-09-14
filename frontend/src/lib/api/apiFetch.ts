import type { Path } from "./types";
import { isBaseAPIErrorResponse } from "./utils";

const BASE_API_URL = "http://127.0.0.1:3000";

type ApiClientOptions = {
  requestInit?: RequestInit;
  errorMessage?: string;
};

async function apiFetch<TResponse extends Record<string, any>>(
  path: Path,
  options?: ApiClientOptions,
): Promise<TResponse> {
  const res = await fetch(`${BASE_API_URL}${path}`, options?.requestInit);
  const data = await res.json();

  if (res.ok) return data;
  if (isBaseAPIErrorResponse(data)) console.warn(data.detail);

  throw new Error(
    options?.errorMessage || "An error occurred while fetching data",
  );
}

export { apiFetch };
