import { Router } from "express";
import { verifyBusinessWithId, verifyWithBVN, verifyWithNIN } from "./verify.helper";

const router = Router();

router.post('/verify/bvn', verifyWithBVN);
router.post('/verify/nin', verifyWithNIN);
router.post('/verify/business', verifyBusinessWithId);

export default router;