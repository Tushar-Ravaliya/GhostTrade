import { Router } from "express"
import { getMarketData,getLowerData, getGainerData,getNameData } from "../controllers/market.controller.js"

const router = Router()

router.get("/market", getMarketData)
router.post("/lower",getLowerData)
router.post("/gainer",getGainerData)
router.get("/name",getNameData)


export default router