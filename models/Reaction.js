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

module.exports = reactionSchema;