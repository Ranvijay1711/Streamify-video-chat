export const signup=async(req,res)=>{
  const {email,password,fullName}=req.body;

  try{
    if(!email ||!password || !fullName){
      return res.status(400).json({message:"All frilds are required"})
    }
  }
  if(password.lenght<6){
    
  }
}
export const login=async(req,res)=>{
  res.send('login');
  
}

export const logout=(req,res)=>{
  res.send('logout');
}