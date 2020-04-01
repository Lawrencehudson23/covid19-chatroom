const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    minlength:[
        3,
        'First name must be at least 3 characters or more.'
    ]
  }, 
  lastName: {
    type: String,
    minlength:[
        3,
        'Last name must be at least 3 characters or more.'
    ]
  }, 
  email: {
    type: String,
    unique: [
      true,
      'Email already exist,Please choose another one.'
    ],
    minlength:[
      1,
      'Email must be Provide.'
  ],
    validate: [
        val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        "Please enter a valid email address!"
    ]
  },
  password: {
    type: String,
    minlength:[
        8,
        'Password must be at least 8 characters or more.'
    ]
  }, 
},{timestamps:true});

UserSchema.virtual('confirmPassword',{
    get:() => this._confirmPassword,
    set: val => this._confirmPassword = val
});

UserSchema.pre('validate', function(next){
    // if(!this.firstName){
    //     this.invalidate('firstName',"First name must be provide!")
    //   }
    //   else if(this.firstName.length<3){
    //     this.invalidate('firstName',"First name must be at least 3 characters or more!")
    //   }
    //   if(!this.lastName){
    //     this.invalidate('lastName',"Last name must be provide!")
    //   }
    //   else if(this.lastName.length<3){
    //     this.invalidate('lastName',"Last name must be at least 3 characters or more!")
    //   }
    //   if(!this.email){
    //     this.invalidate('email',"Email must be at provide!")
    //   }
    //   if(this.password.length<8){
    //     this.invalidate('password',"Password must be at least 8 characters or more!")
    //   }
  
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword','Password must match confirm password')
    }
    console.log("Password is matching")
    next();
    
});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password=hash;
            next();
            
        })
})


module.exports = mongoose.model("User", UserSchema);