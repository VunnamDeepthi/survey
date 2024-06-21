const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const path = require('path');

const app = express();
const port = process.env.PORT || 8008;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Survey", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Mongoose schema for land information
const landInfoSchema = new mongoose.Schema({
  surveyNo: String,
  khattaNumber: String,
  district: String,
  pattadarName: String,
  mandal: String,
  fatherHusbandName: String,
  village: String,
  caste: String,
  totalLand: String,
  gender: String,
  natureOfLand: String,
  classificationOfLand: String,
  marketValue: String,
  landStatus: String,
  landType: String,
  ekycStatus: String
}, { collection: 'landinfo' });

const LandInfo = mongoose.model('landinfo', landInfoSchema);

// Middleware to parse incoming request bodies
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (assuming your HTML files are in the 'public' directory)
app.use(express.static(path.join(__dirname, 'public')));


// Route to handle form submission from the HTML form
app.post('/Survey', (req, res) => {
  const landInfo = new LandInfo(req.body);

  landInfo.save()
    .then(() => {
      console.log("Data saved successfully");
      res.redirect('./survey.html'); // Redirect to success page
    })
    .catch(err => {
      console.error("Error saving land information:", err);
      res.send('Error saving land information: ' + err);
    });
});
var surveyNo=""

app.get('/getData',(req,res)=>{
  surveyNo=req.query['surveyNo']
  LandInfo.find({surveyNo:surveyNo},(err,data)=>{
    if(err){
      console.log(`Error Ocuured ${error}`)
    }else{
      console.log(`The data is ${data}`)
    }
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
