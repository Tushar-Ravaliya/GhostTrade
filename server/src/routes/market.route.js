import { Router } from "express"
import { getMarketData } from "../controllers/market.controller.js"

const router = Router()

router.get("/market", getMarketData)

export default router