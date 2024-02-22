const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String
  },
  due_date: {
    type: Date
  }
},
  {
    timestamps: true  // This will add createdAt and updatedAt fields
  });

module.exports = mongoose.model('task', TaskSchema);