const workoutModel = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts
const getAllWorkouts = async (req, res) => {
    
    const workouts = await workoutModel.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}   

//get a single workout
const getWorkout = async (req, res) => {
    const { id }  = req.params

        //if id is invalid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Invalid workout id'})
        }

    const workout = await workoutModel.findById(id)

        //if workout does not exists
        if (!workout) {
            return res.status(404).json({ errors: 'No such workout'})
        }

    res.status(200).json(workout) 
}

// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all fields', emptyFields})
    }

    //add doc to db
    try {
        const workout = await workoutModel.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id }  = req.params

        //if id is invalid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Invalid workout id'})
        }

    const workout = await workoutModel.findByIdAndDelete({_id: id})

        //if workout does not exists
        if (!workout) {
            return res.status(404).json({ errors: 'No such workout'})
        }
    
    res.status(200).json(workout) 
}

//update a workout

const updateWorkout = async (req, res) => {
    const { id }  = req.params

        //if id is invalid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Invalid workout id'})
        }

    const workout = await workoutModel.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

        //if workout does not exists
        if (!workout) {
            return res.status(404).json({ errors: 'No such workout'})
        }

    res.status(200).json(workout) 
}

module.exports ={
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
}