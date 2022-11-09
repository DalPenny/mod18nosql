const mongoose = require('mongoose');
const { format_date } = require('../utils/helpers');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId(),
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
    reactions: [thoughtSchema],
},

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// Initialize our reaction model
const Reaction = mongoose.model('reaction', reactionSchema);

module.exports = Reaction;
