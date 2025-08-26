const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const post = ({
  url,
  body,
  headers,
}: {
  url: string;
  body?: unknown;
  headers?: HeadersInit;
}) => {
  return fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};

export const get = ({
  url,
  headers,
}: {
  url: string;
  headers?: HeadersInit;
}) => {
  return fetch(`${baseUrl}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
