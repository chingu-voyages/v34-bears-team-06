import { Schema, model } from 'mongoose';

var meal = new Schema({
    meal_role: {
        type: String,
        enum: ["Breakfast", "AM Snack", "Lunch", "PM Snack", "Supper", "HS Snack"]
    },
    meal_title: {
        type: String,
        required: true
    },
    protein_offered: {
        type: Number,
        required: true
    },
    carbs_offered: {
        type: Number,
        required: true
    }, 
    fat_offered: {
        type: Number,
        required: true
    }
})

var Meal = model('Meal', meal);
export default Meal;