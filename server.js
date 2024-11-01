const path=require('path');
const express = require("express");
const cors=require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000; //here you can change port like 8000 in env file
const connectDB=require('./config/db');
connectDB();

const app = express();

//Static folder
app.use(express.static(path.join(__dirname,'public')));
//Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//cors middleware
app.use(cors({
  origin:['http://localhost:3000',
    'http://localhost:5000'],
    credentials:true,
}))

app.get("/", (req, res) => {
  //   res.send("Hello World"); //text.html content type
  res.json({ message: "Welcome to the randomIdeas API" }); // json type content can use res.json( as well)
});


const ideasRouter=require('./routes/ideas');
app.use('/api/ideas',ideasRouter); //using middleware to look at that file

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

