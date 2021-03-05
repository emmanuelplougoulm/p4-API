const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: String,
    detail: String,
    paragraph1: String,
    paragraph2: String,
    paragraph3: String,
    paragraph4: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", ShowSchema);
