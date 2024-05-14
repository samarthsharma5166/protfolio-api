const mongoose = require('mongoose');
const connectionToDb=()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then((conn)=>console.log(`database connected successfully ${conn.connection.host}`))
  .catch((err)=>console.log(err.message))
}

module.exports = connectionToDb;