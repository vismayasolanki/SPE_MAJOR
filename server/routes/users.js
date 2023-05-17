const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, foodPreference, timeSlot } = req.body;
    const user = new User({ name, foodPreference,timeSlot });
    console.log("jerefjkadf")
    console.log(user);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/:foodPreference', async (req, res) => {
  try {
    const { foodPreference } = req.params;
    const { timeSlot } = req.query;
    console.log("finding");
    let query = { foodPreference };

    if (timeSlot) {
      query = { ...query, timeSlot };
    }

    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// router.get('/:foodPreference', async (req, res) => {
//   try {
//     const { foodPreference } = req.params;
//     const users = await User.find({ foodPreference });
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


module.exports = router;
