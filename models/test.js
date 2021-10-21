import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const test = new Schema({
  name: String,
  date: Date,
  age: Number
});

const Test = mongoose.model('Test', test);

export default Test;