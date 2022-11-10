const { Schema, model } = require('mongoose');


//schema to create user model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    //forign key to track Thoughts, array of objectids refers to Thoughts
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],

    //forign key to track friends(user), array of objectids refers to Users (Unit 23)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
},

    {
        toJSON: {
            getters: true,
            virtuals: true, //virtuals to include in JSON
        },
        id: false,
    },

);

//create virtual property "friendcount" that gets the number of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create our User model
const User = model("user", userSchema);

module.exports = User;