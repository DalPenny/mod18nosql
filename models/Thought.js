const { Schema, model } = require('mongoose');

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
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format_date(createdAtVal)
    },

},

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

//defining thought schema
const thoughtSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    // username: {
    //     type: String,
    //     required: true,
    // },

    // reactions: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'reaction',
    // }],

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
