import { Schema, model } from 'mongoose';

var day = new Schema({
    /**
     * Week day zero indexed:
     * 0 = monday
     */
    week_day: {
        type: Number,
        required: true,
        description: "Week day zero indexed."
    },
    meals: {
        type: Schema.Types.ObjectId,
        ref: "Meal"
    }
})

var Day = model('Day', day);
export default Day;