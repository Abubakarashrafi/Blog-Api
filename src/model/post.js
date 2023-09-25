const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      
    },
  userId : {
    type : mongoose.Types.ObjectId,
    ref : 'userData',
    required : true
  },
    categories: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("postData", postSchema);
