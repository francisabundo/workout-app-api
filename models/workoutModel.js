const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
       required: true, 
    },
    reps: {
        type: Number,
        required: true,
    },
    load : {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    workoutType: {
        type: String,
        enum: ['A', 'B', 'C'],
        required: true,
        default: 'A',
    },
    user_id: {
        type: String,
        required: true, 
    }

}, {timestamps: true})

module.exports = mongoose.model('workout', workoutSchema);