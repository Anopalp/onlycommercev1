const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'toko','gudang'], // Add the roles you need
      default: 'user', // Set a default role if necessary
    },
  });
  
  const Users = mongoose.model('Users', newSchema, 'User');
  // Register route