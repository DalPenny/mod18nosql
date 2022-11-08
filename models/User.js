const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
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

)

//creat virtual property "friendcount" that gets the number of friends per user
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Initialize our user model
const User = model('user', userSchema);

module.exports = User;