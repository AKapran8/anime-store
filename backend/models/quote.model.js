const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    season: { type: Number, require: true },
    episode: { type: Number, require: true },
    time: { type: String, required: true },
    author: { type: { authorName: String, id: String }, required: true },
  }, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
}
);

module.exports = mongoose.model("Quotes", quoteSchema, "quotes");
