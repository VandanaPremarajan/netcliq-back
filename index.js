 const express = require('express');
 const PORT = 5050;
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 require('dotenv').config();

 const app = express();
//  app.use(cors());

// CORS middleware - apply globally
app.use(cors({
  origin: 'https://netcliq-front.vercel.app', 
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

// Handle preflight requests globally
app.options('*', cors({
  origin: 'https://netcliq-front.vercel.app',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));
 
 app.use(bodyParser.json());

 app.use('/uploads', express.static('uploads'));

 mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get("/", (req, res)=> {
  res.send("Welcome To Node JS")
});

const usersRoutes = require('./routes/usersRoutes');
app.use('/api/users', usersRoutes);

const genresRoutes = require('./routes/genresRoutes');
app.use('/api/genres', genresRoutes);

const moviesRoutes = require('./routes/moviesRoutes');
app.use('/api/movies', moviesRoutes);

// const subscriptionRoutes = require('./routes/subscriptionRoutes');
// app.use('/api/subscription', subscriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});