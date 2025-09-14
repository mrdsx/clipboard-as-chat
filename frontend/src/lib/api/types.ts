type BaseAPIErrorResponse = {
  detail: string;
};

type Path = `/${string}`;

export type { BaseAPIErrorResponse, Path };
