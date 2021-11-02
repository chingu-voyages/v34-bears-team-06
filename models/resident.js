import mongoose, { ObjectId, Schema } from 'mongoose';
import Day from './day'

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
  },
  eating_history: [{
    day: {
      type: Date,
      // required: true
    },
    mealId: { 
      type: Schema.Types.ObjectId,  //Schema.Types.ObjectId // Schema.ObjectId
      ref: "Meal"
    },
    // This will combine the menu's day#, the loop, and the meal
    eating_code: {
      type: String
    },
    amount_eaten: {
      type: Number
    },
  }]
});

mongoose.models = {};

var Resident = mongoose.model('Resident', resident);

export default Resident;