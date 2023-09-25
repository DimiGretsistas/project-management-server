const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const projectSchema = new Schema ({
    title: String,
    description: String,
    task: [{ type: Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = model('Project', projectSchema)
