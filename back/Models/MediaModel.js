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
			type: String, // username
			required: true
		},
    view: Number,
    like: Array,
    unlike: Array,
    popularity: Number,
    tags: Array,
    subscribers: Array, // username[]
  },
  { timestamps: true }
);

const MediaModel = new mongoose.model("File", mediaSchema);

module.exports = MediaModel;
