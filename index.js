 const express = require('express');
 const PORT = 5050;
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 require('dotenv').config();

 const app = express();
 app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});