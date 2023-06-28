const express = require('express');
const Workout = require('../models/workoutModel');
const { 
    createWorkout, 
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController');

//store the express method called Router in the variable called router
const router = express.Router();


//ROUTES

//get all workouts
router.get('/', getAllWorkouts);

//get a single workout
router.get('/:id', getWorkout);

//post a new workout
router.post('/', createWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)


// it is exporting the router object from the current module. The router object is typically an instance of the Express Router, which is used to define routes for the application.
module.exports = router;