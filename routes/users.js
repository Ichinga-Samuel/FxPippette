const express = require('express');
const router = express.Router();
const pp = require('paypal-rest-sdk')
const request = require('request')

const User = require('../models/User')

pp.configure({
    mode: 'sandbox',
    client_id: process.env.PP_CLIENT_ID,
    client_secret: process.env.PP_CLIENT_SECRET
})


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

router.post('/deposit/paypal', async (req, res)=>{
  const payment = {
    auth:
        {
          user: process.env.PP_CLIENT_ID,
          pass: process.env.PP_CLIENT_SECRET
        },
    body:
        {
          intent: 'sale',
          payer:
              {
                payment_method: 'paypal'
              },
          transactions: [
            {
              amount:
                  {
                    total: req.body.amount,
                    currency: 'NGN'
                  }
            }],
          redirect_urls:
              {
                return_url: process.env.URL,
                cancel_url: process.env.URL,
              }
        },
    json: true
  }

  request.post(process.env.PAYPAL_API + '/v1/payments/payment', payment, function (err, response) {
                if (err){console.error(err);
                    return res.sendStatus(500);}
      res.json(
          {
              id: response.body.id
          })
  })
})


router.post('/deposit/paypal/exe', (req, res) =>{
    const paymentID = req.body.paymentID;
    const payerID = req.body.payerID;
    request.post(process.env.PAYPAL_API + '/v1/payments/payment/' + paymentID +
        '/execute',
        {
            auth:
                {
                    user: process.env.PP_CLIENT_ID,
                    pass: process.env.PP_CLIENT_SECRET
                },
            body:
                {
                    payer_id: payerID,
                    transactions: [
                        {
                            amount:
                                {
                                    total: req.body.amount,
                                    currency: 'NGN'
                                }
                        }]
                },
            json: true
        },
        function(err, response)
        {
            if (err)
            {
                console.error(err);
                return res.sendStatus(500);
            }
            // 4. Return a success response to the client
            res.json(
                {
                    status: 'success'
                });
        })
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
