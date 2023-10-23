const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getAllWorkouts = async(req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts)
}

// GET single workout
const getWorkout = async (req,res) => {
    const {id} = req.params;   //'/:id' from the path of the request
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'}); 
    }
    const workout = await Workout.findById(id);
    if(!workout){
        return res.status(404).json({error: 'No Such Workout'});
    }
    res.status(200).json(workout);

}


// Create a new workout
const createWorkout = async (req,res) => {
      const {title, load, reps} = req.body; 

      //new code: Detecting which fields are empty
      let emptyFields = [];
      if(!title){
        emptyFields.push('title');
      }
      if(!load){
        emptyFields.push('load');
      }
      if(!reps){
        emptyFields.push('reps');
      }

      if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
      }

      try{
        const workout = await Workout.create({title, load, reps });
        res.status(200).json(workout);
      }catch(error){
          res.status(400).json({error: error.message})     
      }
}



// delete a  workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'}); 
    }
    const workout = await Workout.findOneAndDelete({_id: id}); // the id proptery in mongo is _id
    if(!workout){
        return res.status(404).json({error: 'No Such Workout'});
    }
    res.status(200).json(workout);
}

// Update a  workout
const updateWorkout = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout'}); 
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error: 'No Such Workout'});
    }

    res.status(200).json(workout);

}






module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}