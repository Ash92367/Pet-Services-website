import petModel from "../models/petModel.js";
import fs from "fs";

const addpets = async (req, res) => {
  try {
    const { name, age, animal, location, gender } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    if (!name || !age || !animal || !location || !gender || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPet = new petModel({ name, age, animal, location, gender, image });
    const savedPet = await newPet.save();

    res.status(201).json({ success: true, message: "Pet added successfully", pet: savedPet });
  } catch (error) {
    console.error("Error saving pet:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listpet = async (req, res) => {
  try {
    const pets = await petModel.find({});
    res.json({ success: true, data: pets });
  } catch (error) {
    console.error("Error fetching pets:", error.message);
    res.json({ success: false, message: "Error fetching pets" });
  }
};

const removepet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await petModel.findById(id);

    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    if (pet.image) {
      fs.unlink(pet.image, (err) => {
        if (err) console.error("Error deleting image:", err.message);
      });
    }

    await petModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Pet removed successfully" });
  } catch (error) {
    console.error("Error removing pet:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addpets, listpet, removepet };
