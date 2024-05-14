const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  skill:{
    type:String,
    required:[true,'skill is required'],
  },
  level:{
    type:Number,
  }
},{
  timestamps:true
})

const Skill = mongoose.model("Skill",skillSchema)
module.exports = Skill;