import express from "express";
import {
  askGraq,
  summarizeText,
  translateText,
} from "../controllers/docsummary/index.mjs";
import { authMiddleware } from "../utils/AuthMiddleware.mjs";

const DocSummaryRouter = new express.Router();
const URI = "/api/docsummary";

DocSummaryRouter.post(`${URI}/translate`, authMiddleware, translateText);
DocSummaryRouter.post(`${URI}/summary`, authMiddleware, summarizeText);

DocSummaryRouter.get(`${URI}/askGraq`, askGraq);

export default DocSummaryRouter;
