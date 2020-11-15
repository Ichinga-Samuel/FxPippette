const express = require('express');
const router = express.Router();
const User = require('../models/User')


/* GET home page. */
router.get('/', async (req, res) => {
  try{
    if(req.user){
      let user = await User.findById(req.user.id)
      let {currentAmount, bonus} = await user.currentAmountAndBonus()
      //await User.totalAmount()
      console.log(bonus, currentAmount, user.getDaysLeft())
      res.render('index', {user, refs:await user.getReferrals(), currentAmount: currentAmount , bonus:bonus});
    }
    else{res.render('index')}
  }
  catch (e) {
    console.log(e)
    //res.render('errors/404')
  }

});

module.exports = router;
