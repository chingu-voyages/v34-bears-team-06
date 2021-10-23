import { Schema, model } from 'mongoose';

var menu = new Schema({
  menu_title: {
    type: String,
    required: true
  },
  init_date: {
    type: Date,
    required: true
  },
  days: {
    type: Schema.Types.ObjectId,
    ref: "Day"
  },
});

var Menu = model('Menu', menu);
export default Menu;