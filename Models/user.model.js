const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:[true,"email already exists"]
  },
  password:{
    type:String,
    required:true,
    select:false,
    minLength:[8,'password atleast 8 character long']
  },
  date:{
    type:Date,
    default:Date.now,
  }
},{
  timestamps:true
})

userSchema.pre("save",async function (next){
  if(!this.isModified('password')){
    return next();
  }
 this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods={
  generateJwtToken:async function(){
    return await jwt.sign(
      {
        id:this._id,
        email:this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:'30min'
      }
    );
  },
  comparePassword:async function(plainTextPassword){
    return await bcrypt.compare(plainTextPassword,this.password);
  }
}



const User = mongoose.model("User",userSchema);
module.exports = User;