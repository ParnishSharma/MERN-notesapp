const mongoose= require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  name:{
    type:String,
    required:true,

  },
  email:{
    type:String,
    required:true,
    unique: true


  },
 password:{
    type:String,
    required:true

  },
  date:{
    type:Date,
    default: function() {
      const currentDate = new Date();
      const ISTOffset = 330; 
      const ISTTime = new Date(currentDate.getTime() + ISTOffset * 60000);
      return ISTTime;
  },
    },})

    const User=mongoose.model("user",userSchema);
    module.exports = User
    
