import User from '../models/User.model';
import respond from '../utils/respond';

export const signupUser = async (req: any, res: any) => {
    const credentials = req.body;

    try {

        const user = new User(credentials)
        const token = await user.generateAuthToken()


        await user.save()

        const obscuredUser = user.toJSON()
        respond(res, 201, 'successfully created a new User', { ...obscuredUser, token })

    } catch ({ message }) {
        respond(res, 500, 'something went wrong!', message)
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        const credentials = req.body;
        const user = await (User as any).login(credentials)

        respond(res, 200, 'successfully loggedin user', user)
    } catch (e: any) {
        const message = e.toString().split('Error ')[1]

        respond(res, 400, 'pls provide valid data', message)
    }
}

export const logoutUser = async (req: any, res: any) => {
    const { user, token } = req, { all } = req.query

    try {

        // ?all=true

        if (all) {
            user.tokens = user.tokens.filter((t: any) => t.token == token)
        } else {
            user.tokens = user.tokens.filter((t: any) => t.token !== token)
        }

        await user.save()
        respond(res, 200, 'successfully logged out')

    } catch (e) {
        respond(res, 500, 'something went wrong!', e)
    }
}

export const updateUser = async (req: any, res: any) => {
    const updates = Object.keys(req.body)

    const allowedUpdates = [
        "username",
        "email",
        "fullName",
        "password",
        "phone",
        "location",
        "avater",
    ] // this is for later

    if (updates.length < 1) respond(res, 200, 'there is nothing to update here!')

    // to catch the errors when updating
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOp) return respond(res, 400, 'pls fill valid updates!')
    try {
        updates.forEach((update) => (req.user[update] = req.body[update]))
        await req.user.save()
        const obscuredUser = req.user.toJSON()

        respond(res, 200, "Successfully updated!", obscuredUser)

    } catch (e) {
        respond(res, 500, 'something went wrong!', e)
    }
}

export const deleteUser = async (req: any, res: any) => {
    try {
        await req.user.remove()

        respond(res, 200, 'successfully deleted user')
    } catch (e) {
        respond(res, 500, 'something went wrong!', e)
    }
}
