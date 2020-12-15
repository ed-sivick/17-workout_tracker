var path = require("path");

module.exports = function(app) {
  // Calls function to display stats info when "Dashboard" is selected
  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  // Calls function to display exercise info when "Continue Workout" or "New Workout" is selected
  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};