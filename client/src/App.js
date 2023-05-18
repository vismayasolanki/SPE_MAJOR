import React, { useState, useEffect } from 'react';
import { createUser, getUsersByFoodPreference } from './api';

import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [users, setUsers] = useState([]);
  const [timestamp, setTimestamp] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tmp = await createUser({ name, foodPreference,timeSlot });

    // Logic to fetch users with the same preference at the selected time slot
    const usersWithSameFoodPreference = await getUsersByFoodPreference(foodPreference,timeSlot); // Replace with your logic to fetch users
    const usersWithSameTimePreference = usersWithSameFoodPreference.filter(
      (user) => user.timeSlot === timeSlot
    );

    console.log(usersWithSameFoodPreference);
    for(var i in usersWithSameFoodPreference){
      console.log(i.timeSlot);
    }

    setUsers(usersWithSameTimePreference);
    setTimestamp(Date.now());
  };

  useEffect(() => {
    // Function to delete users after a certain time
    const deleteUserAfterTime = setTimeout(() => {
      setUsers([]);
      setTimestamp(null);
    }, 24 * 60 * 60 * 1000); // 24 hrs in milliseconds

    return () => clearTimeout(deleteUserAfterTime);
  }, [users]);

  return (
    <div className="App">
      <h1>Food Tinder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          <br></br>
          <br></br>
        <select
          value={foodPreference}
          onChange={(e) => setFoodPreference(e.target.value)}
        >

          <option value="">Select a food preference</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Pasta">Pasta</option>
          <option value="Biryani">Biryani</option>
          <option value="Chinese">Chinese</option>
          <option value="Punjabi">Punjabi</option>
        


        </select>
        <br></br>          
        <br></br>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option value="">Select a time slot</option>
          <option value="7pm-8pm">7pm - 8pm</option>
          <option value="8pm-9pm">8pm - 9pm</option>
          <option value="9pm-10pm">9pm - 10pm</option>
          <option value="10pm-11pm">10pm - 11pm</option>
          <option value="11pm-12pm">11pm - 12pm</option>

          {/* Add more time slot options as needed */}
        </select>
        <br></br>          
        <br></br>
        <button type="submit">Submit</button>
      </form>


      {users.length > 0 && (
        <div>
          <h2>Users with the same food preference at {timeSlot}:</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
      {/* {timestamp && (
        <p className="timestamp">Request timestamp: {new Date(timestamp).toLocaleString()}</p>
      )} */}
    </div>
  );
};

export default App;
