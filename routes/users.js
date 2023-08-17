var express = require('express');
var router = express.Router();
const webpush = require('web-push')
const { user, getUser, getAbsen, updateUser, postPilihTim, postInformasi, getAllUsers } = require('../controllers/users.controller')
const prisma = require('../services/prisma.service')

/* GET users listing. */
router.post('/', user);
router.get('/get/:id', getUser);
router.get('/getAbsen/:id', getAbsen)
router.get('/getUsers', getAllUsers)
router.post('/update', updateUser)
router.post('/pilihTim', postPilihTim)
router.post('/informasi', postInformasi)
router.post('/subscribe', async (req, res) => {
  /* `const subscription = req.body` is assigning the value of the request body to the `subscription`
  constant. In this case, it is assuming that the request body contains the subscription details for
  a web push notification. The subscription details typically include information such as the
  endpoint URL, the public key, and the authentication token. */
  const { userId, subscription, role } = req.body

  try {
    // Check if the subscription already exists based on endpoint, p256dh, and auth
    const existingSubscription = await prisma.pushSubscription.findFirst({
      where: {
        userId: userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        role: role,
        auth: subscription.keys.auth,
      },
    });

    if (existingSubscription) {
      console.log('Subscription already exists:', existingSubscription);
      res.status(201).json(existingSubscription);
      return;

    } else {

      const newSubscription = await prisma.pushSubscription.create({
        data: {
          userId: userId,
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          role: role,
          auth: subscription.keys.auth,
        }
      });

      console.log('New subscription created:', newSubscription);
      res.status(201).json(newSubscription);
    }
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  // // create payload
  // const payload = JSON.stringify({ title: 'Aplotgana' })

  // // pass object into sendNotification
  // webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})

module.exports = router;
