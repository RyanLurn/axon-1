import { Hono } from "hono";

export const gitServer = new Hono().get("/:repo/info/refs");
