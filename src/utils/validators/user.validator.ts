import respond from "../respond"

import { isDuplicate } from "."
import User from '../../models/User.model'

export const validateSignup = async (req: any, res: any, next: any) => {

    const { username, email, phone, password } = req.body
    const errors: any = {}

    if (!username) {
        errors["username"] = "cannot be empty"
    } else {
        const _isDup = await isDuplicate({ username }, User)
        if (_isDup) errors["username"] = "is taken"
    }

    if (!email) {
        errors["email"] = "cannot be empty"
    } else {
        const _isDup = await isDuplicate({ email }, User)
        if (_isDup) errors["email"] = "has been taken"
    }

    if (!phone) {
        errors["phone"] = "cannot be empty"
    } else {
        const _isDup = await isDuplicate({ phone }, User)
        if (_isDup) {
            errors["phone"] = "has been used"
        }
    }

    if (!password) {
        errors["password"] = "cannot be empty"
    }

    // logic
    if (Object.keys(errors).length > 0) {
        return respond(res, 400, 'Pls provide valid data', errors)
    }

    next()
}



export const validateLogin = async (req: any, res: any, next: any) => {

    const { username, email, password } = req.body
    const errors: any = {}

    if (username) {
        if (!username) {
            errors["username"] = "cannot be empty"
        } else {
            const _isDup = await isDuplicate({ username }, User)
            if (_isDup) errors["username"] = "is taken"
        }
    }

    if (email) {
        if (!email) {
            errors["email"] = "cannot be empty"
        } else {
            const _isDup = await isDuplicate({ email }, User)
            if (_isDup) errors["email"] = "has been taken"
        }
    }

    if (!password) {
        errors["password"] = "cannot be empty"
    }

    // logic
    if (Object.keys(errors).length > 0) {
        return respond(res, 400, 'Pls provide valid data', errors)
    }

    next()
}

export default { validateSignup, validateLogin }
