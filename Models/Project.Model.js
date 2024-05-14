const mongooose= require('mongoose');
const projectSchema = new mongooose.Schema({
  name:{
    type:String,
    required:[true,'project name is required!']
  },
  desc:{
    type:String,
    minLength:[10,'description should be atleast 10 charcter long']
  },
  image:{
    public_id:{
      type:'String'
    },
    secure_url:{
      type:'String'
    }
  },
  gitHubUrl:String,
  hostedUrl:String
});

const Project = mongooose.model("Project" ,projectSchema);
module.exports = Project;