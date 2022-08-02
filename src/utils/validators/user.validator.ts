import respond from "../respond"

import { isDuplicate } from "."
import User from '../../models/User.model'

// try not to use to much external libraries, cause it makes u dependant on them
// even tho u see if/else blocks... this is the best way to validate ur data...
// without beign to ambigious

export const validateSignup = async (req: any, res: any, next: any) => {

    const { username, email, password } = req.body
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

    if (!password) {
        errors["password"] = "cannot be empty"
    }


    // add more validator props here

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
        if (username == '') {
            errors["username"] = "cannot be empty"
        }
    } else if (email) {
        if (email == '') {
            errors["email"] = "cannot be empty"
        }
    } else {
        errors["username"] = "pls provide a username or email"
        errors["email"] = "pls provide a email or username"
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

export const validateUpdateProfile = async (req: any, res: any, next: any) => {

    const { username, email, password } = req.body
    const errors: any = {}

    if (username) {
        if (username == '') {
            errors["username"] = "cannot be empty"
        }
    } else if (email) {

        if (email == '') {

            errors["email"] = "cannot be empty"

        } else {

            // to check if the email has changed
            if (email !== req.user.email) {
                const _isDup = await isDuplicate({ email }, User)
                if (_isDup) errors["email"] = "has been taken"
            }
        }


    } else {
        errors["username"] = "pls provide a username or email"
        errors["email"] = "pls provide a email or username"
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
