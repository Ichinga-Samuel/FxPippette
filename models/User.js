// import {User} from "../../mflix-js/src/api/users.controller";

const mongoose = require('mongoose')
const crypto = require('crypto')
const uid = require('shortid')

UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        hash: {
            type: String,
            required: true
        },
        salt: String,

    },
    firstName: String,
    lastName: String,
    telephone: Number,
    referrals:[String],
    referer: String,
    verified: Boolean,
    userid: {
        type: String,
        //default: uid.generate
    },

    initialDeposit:{
        type: Number,
        default: 0
    },

}, {timestamps:{}})

// UserSchema.methods.validatePassword = function(password){
    //return this.password === password}


UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName
})

UserSchema.virtual('imageUrl').get(function(){
    let email = this.email
    const hash = crypto.createHash('md5')
                        .update(email)
                        .digest('hex')
    const gravatarBaseUrl = 'https://secure.gravatar.com/avatar/'
    return gravatarBaseUrl + hash
})

UserSchema.virtual('dueDate').get(function(){
    let dateCreated = new Date(this.createdAt)
    let dueDate = dateCreated.setDate(dateCreated.getDate() + 25)
    return dueDate
})

UserSchema.method({
    getReferrals: async function(){
        try {
            if (this.referrals && this.referrals.length > 0) {
                let refs = this.referrals
                let model = this.model('Users')
                let refsName = []
                for (let ref of refs) {
                    let doc = await model.findById(ref)
                    refsName.push(doc.fullName)
                }
                return refsName
            }
            else { return [] }
        }
        catch (e) {
            console.log(e)
        }
    },
    currentAmountAndBonus: async function () {
        let bonus = 0
        try {
            if (this.referrals && this.referrals.length > 0) {
                let refs = this.referrals
                let model = this.model('Users')
                for (let ref of refs) {
                    let doc = await model.findById(ref).select('initialDeposit').lean()
                    bonus += doc.initialDeposit * 0.1
                }
            }
            return {currentAmount: bonus + this.initialDeposit, bonus: bonus}
        }
        catch (e) {
            console.log(e)
        }
    },
    getDaysLeft: function () {
        let dateCreated = new Date(this.createdAt)
        let today = new Date()
        let days = (today.getTime() - dateCreated.getTime()) / (1000*3600*24)
        return Math.round(days)
    },
    isDue: function () {
        return this.dueDate.toDateString() === new Date().toDateString()
    }
})

UserSchema.static({
    totalAmount: async function (){
        let [totalAmount, totalDeposit] = 0
        let creditedUsers = await this.find({initialDeposit:{$gt: 0}}).select('initialDeposit referrals')
        for(let user of creditedUsers){
            totalDeposit += user.initialDeposit
            let res = await user.currentAmountAndBonus()
            totalAmount += res.currentAmount
        }
        return [totalAmount, totalDeposit]
    }
})


module.exports = mongoose.model('Users', UserSchema)
