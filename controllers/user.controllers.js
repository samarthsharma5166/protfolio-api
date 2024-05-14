const User = require('../Models/user.model.js');
const AppError = require('../utils/error.utils.js');

const cookieOptions ={
  maxAge:30*60*1000,
  httpOnly:true,
  secure:true
}
exports.userSignup =async(req,res,next)=>{ 
  try {
      const{name,email,password}= req.body;
  // check all fields are fill or not
  if(!name,!email,!password){
    return next(
      new AppError('All fields are required!',400)
    )
  }
  // check user exists with the given email or not 
  const userExists = await User.findOne({email});
  if(userExists){
    return next(
      new AppError("user already exists",500)
    );
  }

  const user = await User.create({
    name,
    email,
    password
  })

  await user .save();
  user.password = undefined;

  res.status(200).json({
    success:true,
    message:'user created successfully',
    user
  });
  
  } catch (error) {
    return next(
      new AppError("user already exists",500)
    );
  }
}

exports.userSignIn = async(req,res,next)=>{
  try {
    const{email,password} = req.body;
    const user =await User.findOne({email}).select("password");
    if(!user || !(await user.comparePassword(password))){
      return next(
        new AppError("user not found with the give email and password",400)
      )
    }

    const token = await user.generateJwtToken();
    user.password = undefined;

    res.cookie("token",token,cookieOptions);
    return res.status(200).json({
      success:true,
      message:'user login successfully',
      user
    });

  } catch (error) {
    return next(
      new AppError("user already exists",500)
    );
  }
}

exports.userLogout=async(req,res,next)=>{
  try {
    res.cookie("token",null,{
      secure:true,
      maxAge:0,
      httpOnly:true
    })
  
    res.status(200).json({
      success:true,
      message:'logout successfully'
    })
  } catch (error) {
    return next(
      AppError(error,400)
    )
  }
}

exports.getUser=async(req,res,next)=>{
  try {
    const {userId} = req.params.id;
    const user = await User.findOne(userId).select("-email");
    return res.status(200).json({
      success:true,
      message:'user details',
      user
  });
  } catch (error) {
    return next( new AppError(error,500))
  }

}

exports.authUser=async(req,res,next)=>{
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    return res.status(200).json({
      success:true,
      message:'user details',
      user});
  } catch (error) {
    return next( new AppError(error,500))
  }
}