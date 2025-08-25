import { Api } from "./api";

export const client = new Api({
  baseUrl: process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:3020",
});
