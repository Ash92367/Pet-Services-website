import mongoose from "mongoose";

const petschema = new mongoose.Schema({
  name: { type: String, required: true },
  animal: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true },
  image: { type: String, required: true },
});

const petModel = mongoose.models.pets || mongoose.model("pets", petschema);

export default petModel;
