import { Router } from "express";
import { badgeController } from "../controllers/badge.controller";
import { validateApiKey } from "../middleware/auth.middleware";

const router = Router();

router.use(async (req, res, next) => {
  validateApiKey(req, res, next);
});

router.get("/", (req, res) => {
  res.json({
    message: "Badge API",
  });
});

router.post("/single", async (req, res) => {
  try {
    await badgeController.sendSingleBadge(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/multiple", async (req, res) => {
  try {
    await badgeController.sendMultipleBadges(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const badgeRoutes = router;
