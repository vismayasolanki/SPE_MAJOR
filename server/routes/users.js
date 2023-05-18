const express = require('express');
const router = express.Router();
const User = require('../models/User');



const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({filename: 'application.log'}),
    ],
});

function logWithTimestamp(mess,req) {
  const timestamp = new Date().toISOString();
  // logger.info(`${timestamp}` - `${mess}` - `${req.path}` - `${req.body}`);
  const logMessage = `${timestamp} - ${req.method} ${req.path} - ${mess}`;
  logger.info(logMessage);
  
  // logger.info({
  //     method: req.method,
  //     path: req.path,
  //     body: req.body
  // });
}

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, foodPreference, timeSlot } = req.body;
    const timestamp = new Date().toISOString();

    logger.info({
      message: "Create User API called",
      method: req.method,
      path: req.path,
      body: req.body,
      timestamp: timestamp
  });

    // logWithTimestamp("List of specific Users API called",req);
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
    const timestamp = new Date().toISOString();

    logger.info({
      message: "List of specific Users API called",
      method: req.method,
      path: req.path,
      body: req.body,
      timestamp: timestamp
  });

  // logWithTimestamp("List of specific Users API called",req);
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
