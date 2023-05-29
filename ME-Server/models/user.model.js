const {model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        userName : {
            type :String,
            required :true,
            trim: true
        },

        phone : {
            type: String,
            required: true,
            trim: true,
         },

         email : {
            type : String,
            required : true,
            trim: true,
            unique: true
         },

         isAccountVerified: 
         {
            type: Boolean,
            default: false
         },

         role : {
            type: String,
            enum:['ADMIN','CHAMPION'],
            default:'CHAMPION'
         },

         emailOtp: {
            type: String
         }

    },
    {timestamps: true}
);

module.exports = model('User', userSchema);