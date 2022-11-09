const mongoose = require('mongoose');

//schema to create user model
const userSchema = new mongoose.Schema({
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
        match: true,
    },
//forign key to track Thoughts, array of objectids refers to Thoughts
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Thought"
    }],

//forign key to track friends(user), array of objectids refers to Users
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }],
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
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create our User model
const User = mongoose.model("user", userSchema);

module.exports = User;