
const { Schema, model } = require('mongoose');

// const thoughtSchema = require('./Thought');
const { format_date } = require('../utils/helpers');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,  //Unit 26
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    username: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format_date(createdAtVal)
    },

    reaction: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }],

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
