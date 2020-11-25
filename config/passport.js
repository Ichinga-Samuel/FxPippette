passport = require('passport')
const LS = require('passport-local').Strategy
const Users = require('../models/User')
const {isValid} = require("../config/hashPwd")


module.exports = {
    local(passport) {
        passport.use(new LS({usernameField: 'email'}, async (username, password, done) => {
                try {
                    const user = await Users.findOne({email: username})
                    if (!(user && user.verified && isValid(password, user.password.salt, user.password.hash))) {
                        return done(null, false)
                    }
                    // if (!ok) {
                    //
                    //     return done(null, false)
                    // }
                    return done(null, user)
                } catch (err) {
                    return done(err)
                }

            }
        ))
        passport.serializeUser((user, done) => {
            done(null, user._id)
        })
        passport.deserializeUser(async (id, done) => {
            try {
                const user = await Users.findById(id)
                return done (null, user)
            } catch (e) {
                done(e)
            }
        })
    },
}

