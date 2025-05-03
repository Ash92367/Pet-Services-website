import adoptModel from "../models/adoptModel.js"; // Fixed naming consistency

// Add a new adoption form
const addforms = async (req, res) => {
  try {
    const { name, email, phoneNo, livingSituation, previousPets, otherPets } = req.body;

    // Validate required fields
    if (!name || !email || !phoneNo || !livingSituation) {
      return res.status(400).json({
        success: false,
        message: "All required fields (name, email, phoneNo, livingSituation) must be provided.",
      });
    }

    // Check for duplicates (e.g., based on email)
    const duplicateForm = await adoptModel.findOne({ email });
    if (duplicateForm) {
      return res.status(400).json({
        success: false,
        message: "A form with this email already exists.",
      });
    }

    // Create a new adoption form
    const newAdopt = new adoptModel({
      name,
      email,
      phoneNo,
      livingSituation,
      previousPets: previousPets || "", // Optional field
      otherPets: otherPets || "", // Optional field
    });

    const savedForm = await newAdopt.save();
    console.log("Form submitted successfully:", savedForm);
    res.status(201).json({
      success: true,
      message: "Form added successfully",
      form: savedForm,
    });
  } catch (error) {
    console.error("Error in adding form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// List all adoption forms
const listform = async (req, res) => {
  try {
    const forms = await adoptModel.find({});
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    console.error("Error in listing forms:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Approve a form
const approveform = async (req, res) => {
  console.log("Approve request received:", req.params.id); // Debug log
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const form = await adoptModel.findById(id);
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    form.status = "Approved";
    await form.save();

    console.log("Form approved successfully:", form);
    res.status(200).json({ success: true, message: "Request approved successfully", data: form });
  } catch (error) {
    console.error("Error approving form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove an adoption form by ID
const removeform = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Form ID is required." });
    }

    const form = await adoptModel.findById(id);
    if (!form) {
      return res.status(404).json({ success: false, message: "Form doesn't exist." });
    }

    await adoptModel.findByIdAndDelete(id);

    console.log("Form deleted successfully:", id);
    res.status(200).json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error in removing form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addforms, listform, removeform, approveform };
