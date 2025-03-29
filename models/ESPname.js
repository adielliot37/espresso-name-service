import mongoose from 'mongoose';

const ESPNameSchema = new mongoose.Schema({
  name: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ESPName || mongoose.model("ESPName", ESPNameSchema);
