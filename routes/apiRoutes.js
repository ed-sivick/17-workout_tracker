var db = require("../models");

module.exports = function (app) {
    // Gets 'Last Workout'
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    // Creates a new workout in the workout database
    app.post("/api/workouts", async (req, res) => {
        try {
            const response = await db.Workout.create({ type: "workout" })
            res.json(response);
        }
        catch (err) {
            console.log("error creating workout: ", err)
        }
    })
    // Adds an exercise to the workout
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedExercises = [];
        // Finds saved exercises in the current workout
        db.Workout.find({ _id: workoutId })
            .then(dbWorkout => {
                // console.log(dbWorkout)
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                // Console.log exercises
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });
        // Function to update exercises
        function updateWorkout(exercises) {
            db.Workout.findByIdAndUpdate(workoutId, { exercises: exercises }, function (err, doc) {
                if (err) {
                    console.log(err)
                }
            })
        }
    })
// Gets workout response info for "Workout Dashboard"
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
};