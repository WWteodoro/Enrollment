import { Request, Response, Router } from "express";
import { register, requestCounter } from "./server";

export const observeRoute = Router();

observeRoute.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

observeRoute.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
