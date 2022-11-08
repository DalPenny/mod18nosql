const mongoose = require('mongoose');
const { format_date } = require('../utils/helpers');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format_date(createdAtVal)
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [reactionSchema],
},

    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
)

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize our thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
