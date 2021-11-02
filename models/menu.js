import { Schema, model } from 'mongoose';
import Meal from './meal';

var menu = new Schema({
  menu_title: {
    type: String,
    required: true
  },
  init_date: {
    type: Date,
    required: true
  },
  days: 
    [ 
      {
        day_number: {
          type: Number
        },
        meals: [Meal],
        snacks: [Meal]
      }
    ]
    ,
});

var Menu = model('Menu', menu);
export default Menu;