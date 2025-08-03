import User from '../modles/User.js'
import jwt from 'jsonwebtoken'
export const signup=async(req,res)=>{
  const {email,password,fullName}=req.body;

  try{
    if(!email ||!password || !fullName){
      return res.status(400).json({message:"All fields are required"})
    }
  
  if(password.length<6){
    return res.status(400).json({message:"Password must be 6 characters"})
  }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!emailRegex.test(email)){
    return res.status(400).json({message:"Please Provide a correct email"});
   }
   const existingUser=await User.findOne({email});
   if(existingUser){
    return res.status(400).json({message:"Email already exists"});
   }
   const indx=Math.floor(Math.random()*100)+1;
   const randomAvatar=`https://avatar.iran.liara.run/public/${indx}.png`
   const newUser=await User.create({
    email,
    fullName,
    password,
    profilePic: randomAvatar,
   })
   const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
    expiresIn: "7d"
   })
   res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV==="production"
   })
   res.status(201).json({success:true,user:newUser})
  }catch(error){
    console.log("error in signup",error);
    res.status(500).json({message:"internal server error"});
    
  }
}
export const login=async(req,res)=>{
  try{
    const {email,password}=req.body();
    if(!email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    if(!email){
      return res.status(400).json({message:"Please Filled your email"})
    }
    if(!password){
      return res.status(400).json({message:"Please Filled your password"})
    }
    const user=await User.findOne({email});
    if(!user) return res.status(401).json({message:"user does not exists"});
    const ispasswordCorrect=await user.MatchPassword(password);
    if(!ispasswordCorrect) return res.status(401).json({message:"Invalid email or password"});
  }
  catch(error){

  }
}

export const logout=(req,res)=>{
  res.send('logout');
}
