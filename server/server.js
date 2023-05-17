const userRoutes = require('./routes/users');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./db')


const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);



app.get('/', (req, res) => {
  res.send('Server is running!');
});

const port = process.env.PORT || 5005;


db.connect()
  .then(() => {
    console.log('Connected to the database');

    // Start your application or perform other operations
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
    // Handle the error or exit the application gracefully
  });



  


















// const userRoutes = require('./routes/users');

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const db = require('./db')



// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use('/users', userRoutes);


// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });

// const port = process.env.PORT || 5005;


// db.connect()
//   .then(() => {
//     console.log('Connected to the database');

//     // Start your application or perform other operations
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to the database', err);
//     // Handle the error or exit the application gracefully
//   });



// const express = require('express');
// const app = express();
// const cors = require("cors");
// // const logger = require("./logger");

// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());


// // const data = require('./clubs.json');

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const connectionString = "mongodb://mongo:27017/foodApp";

// // const connectionString = "mongodb://localhost:27017/foodApp"
// mongoose.connect(connectionString , {useNewUrlParser  : true});

// let conn = mongoose.connection 

// conn.on('open' , () =>{
//     console.log("Connection opened")
// })


// // const locationRouter = require('./routes/location')
// // app.use('/location' , locationRouter) 

// const userRoutes = require('./routes/users');
// app.use('/users', userRoutes);


// app.listen(5006 , ()=>{
//     console.log("Connected to port 5006 !!")
// });