import { Router } from "express";
import { createAccount } from "./account.helper";

const router = Router();

router.post('/register/:usertype', createAccount);

export default router;