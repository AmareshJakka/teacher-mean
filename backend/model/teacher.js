const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Teacher = new Schema({
  name: {
    type: String
  },
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  salary:{
    type:String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  subjects: {
    type: Array
  },
  
  
}, {
  collection: 'teachers'
})

module.exports = mongoose.model('Teacher', Teacher)
