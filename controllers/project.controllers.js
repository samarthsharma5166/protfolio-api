const Project = require('../Models/Project.Model.js');
const AppError = require('../utils/error.utils.js');
const fs = require('fs/promises')
const cloudinary = require('cloudinary')

// get projects
exports.getProjects=async(req,res,next)=>{
  try {
    const projects = await Project.find();
    if(!projects.length){
      return next(
        new AppError("no project found!",404)
      )
    }
    return res.status(200).json({
      success:true,
      message:'project find successfully',
      projects
    })
  } catch (error) {
    return next(
      new AppError("no project found!",404)
    )
  }
}

// add projects
exports.addProject=async(req,res,next)=>{
  const{
    name,
    desc,
    gitHubUrl,
    hostedUrl
  } = req.body;
  try {
    if(!name || !desc){
      return next(
        new AppError("Name and Description are required",400)
      )
    };
    const project = await Project.create({
      name,
      desc,
      image:{
        public_url:"",
        secure_url:""
      },
      gitHubUrl,
      hostedUrl
    });
    if(req.file){
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
          folder:'project',
          crop:'fill'
        });
        if(result){
          project.image.public_id = result.public_id;
          project.image.secure_url=result.secure_url;
          // Remove file from server 
         await fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || 'File not uploaded , please try again later',500)  
        )
      }
    }
    await project.save();
    return res.status(201).json({
      success: true,
      message: 'Project added successfully',
      project
    });
    
  } catch (error) {
    return next(
      new AppError(error,500)  
    )
  }
}

// delete project
exports.deleteProjects=async(req,res,next)=>{
  const {id} = req.params;
 try {
  const project = await Project.findById(id);
  const publicId= project.image.public_id;

  if(!project){
    return next(
      new AppError("project not found with the given id",404)
      )
    };
   try {
    await cloudinary.v2.api
    .delete_resources([publicId], 
      { type: 'upload', resource_type: 'image' })
    .then(console.log);
   } catch (error) {
    new AppError(error,404)
   }
    await Project.findByIdAndDelete(id)
  return res.status(200).json({
    success:true,
    message:'project deleted successfully',
    project
  })
 } catch (error) {
  return next(
    new AppError(error,400)
  )
 }
}

// update project
exports.updateProjects=async(req,res,next)=>{
  const {id} = req.params;
  // const update = { 
  //   name: req.body.newName,
  //   desc:req.body.newDesc,
  //   gitHubUrl:req.body.newGitHubUrl,
  //   hostedUrl:req.body.newHostedUrl
  // }

  try {
    const project = await Project.findById(id);
    if(!project){
      return next(
        new AppError("Project not found",400)
      )
    }
    const publicId = project.image.public_id;
    if(req.file){
      try {
       const res =  await cloudinary.v2.api.delete_resources([publicId],{ type: 'upload', resource_type: 'image' })
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
          folder:'project',
          crop:'fill'
        });
        if(result){
          project.image.public_id = result.public_id;
          project.image.secure_url=result.secure_url;
  
          // Remove file from server 
         await fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(  
          new AppError(error || 'File not uploaded , please try again later',500)  
        )
      }
    }
    project.name= req.body.name;
    project.desc=req.body.desc;
    project.gitHubUrl=req.body.gitHubUrl;
    project.hostedUrl=req.body.hostedUrl;
    await project.save();
    return res.status(200).json({
      succcess:true,
      project
    })
  } catch (error) {
    return next(
      new AppError(error,400)
    )
  }
}