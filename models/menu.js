import { Schema, model } from "mongoose";

var menu = new Schema({
  menu_title: {
    type: String,
    required: true,
  },
  init_date: {
    type: Date,
    required: true,
  },
  days: [
    {
      day_number: {
        type: Number,
      },
      meals: [
        {
          type: Schema.Types.ObjectId, 
          ref: "Meal",
        },
      ],
      snacks: [
        {
          type: Schema.Types.ObjectId, 
          ref: "Meal",
        },
      ],
    },
  ],
});

var Menu = model("Menu", menu);
export default Menu;
