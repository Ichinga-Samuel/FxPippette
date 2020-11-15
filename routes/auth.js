const express = require('express')
const User = require('../models/User')
const passport = require('passport')

const {mailSender} = require('./helpers/mailer');
const {verificationMail, passwordRecovery} = require('./helpers/mail snippets');
const {genPwd} = require("../config/hashPwd")
const sid = require('shortid')

const router = express.Router()

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login', successRedirect: "/"}))

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register', {ref: req.query.ref})
})

router.post('/register', async(req, res)=>{
    try{
        let email = req.body.email;
        let r = await User.findOne({email});
        if(r){throw new Error('This Email Address is already in use')}
        req.body.password = genPwd(req.body.password)
        let user;
        if(req.query.ref){
            let referer = await User.findOne({userid:req.query.ref})
            req.body.referer = referer.userid
            user = await User.create(req.body)
            await referer.update({$push:{referrals: user.userid}})
        }
        else{
            user = await User.create(req.body)
        }

        await mailSender(email, user.userid, verificationMail);
        res.redirect('/auth/login');
    }
    catch(err){
        console.log(err)
        res.redirect('/auth/register')
    }
});


router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/login')
} )


router.get('/verify', async (req, res) =>{
    await User.findOneAndUpdate({userid: req.query.id}, {verified: true}, {upsert:true})
    res.redirect('/')
})

router.post('/verify/:id', async (req, res) =>{
    res.redirect('/')
})

router.get('/recovery', (req, res) => {
    res.render('recovery')
})

router.post('/recovery', async (req, res) => {
    let msg
    try{
        let user = await User.findOne({email: req.body.email})
        if(user){
            await mailSender(user.email, {id:user.userid, secret: sid.generate()}, passwordRecovery)
            msg = 'A password recovery link has been sent to Your email'
        }
        else{
            msg = 'This email does not exist in our database'
        }
        res.render('recovery', {msg:msg})
    }
    catch (e) {
        console.log(e)
    }

})

router.get('/reset', (req, res) => {
    res.render('reset', {ref:req.query.id})
})

router.post('/reset', async (req, res)=>{
    try{
        req.body.password = genPwd(req.body.password)
        await User.findOneAndUpdate({userid:req.query.id}, {password: req.body.password})
        res.render('login')
    }
    catch (e) {
        console.log(e)
    }

})

module.exports = router
