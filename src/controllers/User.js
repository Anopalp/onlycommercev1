import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import bodyParser from 'body-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';

const app = express();
const url ="mongodb+srv://aliefnp:eKqfkFEA3IZa7ijT@cluster0.pbrnbbo.mongodb.net/?retryWrites=true&w=majority"
app.use(bodyParser.json());

app.use(cors())
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
async function connect() {
    try {
      await mongoose.connect(url);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }
  
  connect();
  
  app.listen(8000, () => {
    console.log("Server started on port 8000");

  });

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
      enum: ['user', 'toko','gudang'], 
      default: 'user', 
    },
  });
  
  const Users = mongoose.model('Users', newSchema, 'User');

  

  app.post('/login', async (req, res) => {
    const { username = '', password = '' } = req.body;
  
    try {

      const user = await Users.findOne({ username });
  
      if (user) {

        const match = await bcrypt.compare(password, user.password);
  
        if (match) {

          req.session.user = { username: user.username, role: user.role };
  console.log(user.role)

          if (user.role === 'user') {
            res.json({ redirect: '/customer' });
          } else if (user.role === 'toko') {
            res.json({ redirect: '/toko-homepage' });
          } else if (user.role === 'gudang') {
            res.json({ redirect: '/reqstore' });
          } else {

            res.json('Invalid role');
          }
        } else {
          res.json('Invalid username or password');
        }
      } else {
        res.json('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      res.json('Internal Server Error');
    }
  });
  
  


  app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const existingUser = await Users.findOne({ username });
  
      if (existingUser) {
        res.json('Username already exists');
      } else {

        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new Users({
          username,
          password: hashedPassword,
          role: role || 'user', 
        });
  
        await newUser.save();
        res.json('Registration successful');
      }
    } catch (err) {
      console.error(err);
      res.json('Internal Server Error');
    }
  });





app.get('/protected', (req, res) => {
  if (req.session.user) {
    const { username, role } = req.session.user;

    if (role === 'user') {

      res.json(`Hello, User ${username}!`);
    } else if (role === 'toko') {

      res.json(`Hello, Toko ${username}!`);
    } else if (role === 'gudang') {

      res.json(`Hello, Gudang ${username}!`);
    } else {

      res.status(403).json('Forbidden');
    }
  } else {

    res.status(401).json('Unauthorized');
  }
});
  
app.get('/profile', (req, res) => {

  if (req.session.user) {

    res.json({
      username: req.session.user.username,
      role: req.session.user.role,

    });
  } else {

    res.status(401).json('Unauthorized');
  }
});
 