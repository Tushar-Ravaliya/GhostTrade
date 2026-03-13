import { Router } from "express"
import { getMarketData,getLowerData, getGainerData } from "../controllers/market.controller.js"

const router = Router()

router.get("/market", getMarketData)
router.post("/lower",getLowerData)
router.post("/gainer",getGainerData)


export default router