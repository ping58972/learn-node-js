// Todo: create Album Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  data: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

module.exports = AlbumSchema;
