const { Schema, model } = require('mongoose');

const formSchema = new Schema({
  summary: { type: String, required: true },
  country: { type: String, required: true },
  procurementSummary: { type: String, required: true },
  deadline: { type: Date, required: true },
  noticeType: { type: String, required: true },
  totalRefNo: { type: String, required: true },
  documentRefNo: { type: String, required: true },
  competition: { type: String, required: true },
  financier: { type: String, required: true },
  purchaser: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  publishDate: { type: Date, required: true },
});

const Form = model('Form', formSchema);

module.exports = Form;