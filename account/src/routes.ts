import { Router } from "express";
import { createAccount, createTempToken, getAccountInfo, loginAccount, resendVerificationToken, sendReTempToken, updateUserAccount, verifyContact } from "./account.helper";

const router = Router();

router.post('/register/:usertype/:token', createAccount);
router.post('/login', loginAccount);
router.get('/verify/:token/token/:otp', verifyContact);
router.get('/verify/resend/:token', resendVerificationToken);
router.get('/account/:token', getAccountInfo);
router.put('/user/:token', updateUserAccount);

router.post('/token', createTempToken);
router.post('/token/resend', sendReTempToken);

export default router;