import mongoose from "mongoose";
const formschema = new mongoose.Schema({
  pettoadopt: {
    type: mongoose.Types.ObjectId,
    ref: "pet",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  livingSituation: {
    type: String,
    required: true,
  },
  previousPets: String,
  otherPets: String,
  status: {
    type: String,
    default: "Pending", // Default status is "Pending"
  },
}, { timestamps: true });


export default mongoose.models.form || mongoose.model("form", formschema);
