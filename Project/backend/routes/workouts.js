const express = require('express');

// Importing Functions
const {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');


const router = express.Router();

// GET all workouts
router.get('/', getAllWorkouts)

// GET single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout );

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a new workout
router.patch('/:id', updateWorkout);



// Exporting Functions
module.exports = router;



/*
npx create-react-app frontend
npm install react-router-dom
*/