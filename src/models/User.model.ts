import mongoose, { Model } from "mongoose"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    tokens: [{
        token: String
    }]
}, {
    timestamps: true,
})


// first step to obscure the users token 
// and some important stuff that should not be seen
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC)

    user.tokens.push({ token })
    await user.save()

    return token
}


userSchema.statics.login = async (credentials) => {
    const { password, ...credential } = credentials // life is not hard! (*_*)
    const { username, email } = credential


    const user = await User.findOne({ [username ? 'username' : 'email']: username || email })
    if (!user) throw new Error('pls provide valid credentials')

    const isMatch = await bcrypt.compare(password, user.password)

    // just keep it simple ooh! - dont try to give more information
    if (!isMatch) throw new Error('pls provide valid credentials')

    // generate the auth token
    const token = await user.generateAuthToken()
    const obscuredUser = user.toJSON()

    return { ...obscuredUser, token }
}

userSchema.pre('save', async function (next) {
    const user = this

    //hash the plaintext password before saving
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // this will rename the user's username in other collections
    if (user.isModified('username')) {
        const previousUserDetails = await User.findById(user.id)

        if (previousUserDetails) {
            // add the collections you want to update here!!!
            // await Model.updateMany({
            //     // reference
            //     owner: previousUserDetails.username,
            // }, {
            //     owner: user.username
            // })
        }
    }

})

// delete all references to the user in all other collections
userSchema.pre('remove', async function (next) {
    const user = this

    // await Model.deleteMany({owner: user.username})

})

const User = mongoose.model('User', userSchema)

export default User;