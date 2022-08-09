const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema(
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
			type: String, // username
			required: true
		},
    view: Number,
    like: Number,
    unlike: Number,
    popularity: Number,
    tags: Array,
    subscribers: Array, // username[]
  },
  { timestamps: true }
);

const VideoModel = new mongoose.model("File", videoSchema);

module.exports = VideoModel;
