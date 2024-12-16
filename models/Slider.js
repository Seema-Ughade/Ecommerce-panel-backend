// models/Slider.js
const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;


















// // models/Slider.js
// const mongoose = require('mongoose');

// const sliderSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true
//   },
//     subTitle: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     subTitleColor: {
//       type: String,
//       default: '#000000',
//     },
//     titleColor: {
//       type: String,
//       default: '#000000',
//     },
//     descriptionColor: {
//       type: String,
//       default: '#000000',
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     link: {
//       type: String,
//       required: true,
//     },
//   }, { timestamps: true });
  
//   const Slider = mongoose.model('Slider', sliderSchema);
  
//   module.exports = Slider;
  
  