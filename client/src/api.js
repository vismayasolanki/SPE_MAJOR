import axios from 'axios';




const winston = require('winston');
// const {ElasticsearchTransport} = require('winston-elasticsearch');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({filename: 'application.log'}),
        // new ElasticsearchTransport({
        //     level: 'info,',
        //     index: 'log',
        //     clientOpts: {
        //         node: 'http://localhost:9200/',
        //     },
        // }),
    ],
});


const API = axios.create({
  baseURL: 'http://localhost:5005',
});

export const createUser = async (user) => {
  try {
    const response = await API.post('/users', user);
    logger.info({
      message: "User create API called",
      method: req.method,
      path: req.path,
      body: req.body
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};




export const getUsersByFoodPreference = async (foodPreference, timeSlot) => {
  try {
    let url = `/users/${foodPreference}`;

    if (timeSlot) {
      url += `?timeSlot=${timeSlot}`;
    }

    const response = await API.get(url);
    logger.info({
      message: "List of specific Users API called",
      method: req.method,
      path: req.path,
      body: req.body
  });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
