import { Router } from 'express';
import respond from '../utils/respond';
import User from '../models/User.model';
import { deleteUser, loginUser, logoutUser, signupUser, updateUser } from '../controllers/user.controller';
import { validateLogin, validateSignup } from '../utils/validators/user.validator';
import { verifyToken } from '../middlewares/auth';

const router = Router()

router.get('/', async (req, res) => {
    const users = await User.find({})

    respond(res, 200, 'successfully fetched all Users', users)
})

router.post('/signup', validateSignup, signupUser)
router.post('/login', validateLogin, loginUser)
router.post('/logout', verifyToken, logoutUser)
router.patch('/', verifyToken, updateUser)
router.delete('/', verifyToken, deleteUser)


export default router

