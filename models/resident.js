import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var resident = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});

mongoose.models = {};

var Resident = mongoose.model('Resident', resident);

export default Resident;