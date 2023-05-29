const {model, Schema } = require('mongoose');

const projectSchema = new Schema(
    {
        name : {
            type :String,
            required :true,
            trim: true
        },
        strategy : {
            type: String,
            required: true,
            trim: true,
         },
         startDate : {
            type : String,
            required : true,
            trim: true,
           
         },
         endDate : {
            type : String,
            required : true,
            trim: true,
           
         },
         status: {
            type: String,
            enum:['Unactivated','Uncomplete', 'Comnpleted'],
            default:'Unactivated'
         },
         createdBy :{
            type : String,
            required : true,
            trim: true,
         },       
         createdById :{
            type : String,
            required : true,
            trim: true,
         }       
    },
    {timestamps: true}
);

module.exports = model('Project', projectSchema);