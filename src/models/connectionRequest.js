
const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps: true,
}
);


// compound index  => indexing combing at two attribute
// => here 1 means ascending and -1 means decending 
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

// pre middleware method
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    // checking that connection request is not send to self
    // => equals is function to compare 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself");
    }

    next();
});

const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);

module.exports= ConnectionRequestModel;

