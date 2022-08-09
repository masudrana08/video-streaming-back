const mongoose = require("mongoose");
const mediaSchema = new mongoose.Schema(
  {
    videoName: String,
    videoId: {
      type: String,
      required: true,
    },
    thumbnailId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
		uploader: {
			type: mongoose.Schema.Types.ObjectId, // user database id
			required: true,
      ref: 'User'
		},
    view: Number,
    like: Array,
    unlike: Array,
    popularity: Number,
    tags: Array
  },
  { timestamps: true }
);

const MediaModel = new mongoose.model("Media", mediaSchema);

module.exports = MediaModel;
