import { Router } from "express";
import { verifyWithBVN } from "./verify.helper";

const router = Router();

router.post('/verify/bvn', verifyWithBVN);

export default router;