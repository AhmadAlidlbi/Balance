const { default: mongoose } = require("mongoose");

const taskListSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }, { timestamps: true });
  
  module.exports  = mongoose.model("TaskList", taskListSchema);