var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET users listing. */
router.get('/dashboard', async function(req, res) {
  try{
    let user = await User.findById(req.user.id)
    let {currentAmount, bonus} = await user.currentAmountAndBonus()
    await User.totalAmount()
    //console.log(r)
    res.render('dashboard', {user, refs:await user.getReferrals(), currentAmount: currentAmount , bonus:bonus});

  }
  catch(e){
    console.log(e)
    res.redirect('/')
  }

});

router.get('/deposit', async (req, res)=>{
  let user = await User.findById(req.user.id)
  res.render('deposit', {user})
})


router.post('/deposit', async (req, res)=>{
  try {
    let user = await User.findOneAndUpdate({_id:req.user.id}, {$inc:{initialDeposit: req.body.amount}})

    res.redirect('/users/dashboard')
  }
  catch (e) {
    console.log(e)
    res.redirect('/users/deposit')
  }
 })

module.exports = router;
