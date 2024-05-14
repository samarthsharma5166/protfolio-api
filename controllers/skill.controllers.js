const Skill = require('../Models/skill.Model.js');
const AppError = require('../utils/error.utils.js');
exports.getSkill=async(req,res,next)=>{
  try {
    const skill = await Skill.find();
    if(!skill){
      return next(
        new AppError("skills not found!",404)
      )
    }
    return res.status(200).json({
      success:true,
      skill
    });
  } catch (error) {
    return next(
      new AppError(error,500)
    )
  }
}

exports.addSkill=async(req,res,next)=>{
  const{skill,level} = req.body;
  try {
    const newSkill  = await Skill.create({skill,level});
    if(!newSkill){
      return next(
        new AppError("skill not created",400)
      )
    }
    await newSkill.save();
    return res.status(201).json({
      success:true,
      message:"skills created successfully",
      skill
    });
  } catch (error) {
    return next(
      new AppError(error,500)
    )
  }
}

exports.removeSkills=async(req,res,next)=>{
  const {id} = req.params;
  try {
    const skill = await Skill.findByIdAndDelete(id);
    if(!skill){
      return next(
        new AppError("skill not found",400)
      )
    }
    return res.status(200).json({
      success:true,
      message:"skills deleted successfully",
      skill
    })
  } catch (error) {
    return next(
      new AppError(error,500)
    )
  }
}