
const { Schema, model } = require('mongoose');

// const thoughtSchema = require('./Thought');
const { format_date } = require('../utils/helpers');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId(),
      default: new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format_date(createdAtVal)
    },
    reaction: [thoughtSchema],
},

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// Initialize our reaction model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
