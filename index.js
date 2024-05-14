const connectionToDb = require('./DB/db.js');
const app = require('./app.js');
const cloudinary = require('cloudinary');

// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT,async()=>{
  await connectionToDb();
  console.log(`server is running at port${process.env.PORT}`);
})