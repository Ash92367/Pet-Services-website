import { useState, useEffect } from "react";
import "./AdoptionPopup.css";

function AdoptionPopup({ setShowPopup, petId }) {
  const [currData, setData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    livingSituation: "",
    address: "",
    previousPets: "",
    otherPets: "",
    pettoadopt: petId || "", // Initialize with petId if available
  });

  const [errors, setErrors] = useState({});

  // Set pettoadopt when petId is passed
  useEffect(() => {
    if (petId) {
      setData((data) => ({ ...data, pettoadopt: petId }));
    }
  }, [petId]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!currData.name.trim()) newErrors.name = "Name is required.";
    if (!currData.email.trim() || !emailRegex.test(currData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!currData.phoneNo.trim() || !/^\d{11}$/.test(currData.phoneNo))
      newErrors.phoneNo = "Phone number must be exactly 11 digits.";
    if (!currData.livingSituation.trim())
      newErrors.livingSituation = "Living situation is required.";
    if (!currData.address.trim()) newErrors.address = "Address is required.";
    if (!currData.pettoadopt)
      newErrors.pettoadopt = "Pet ID is missing. Please reload the page.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Form Data before submission:", currData); // Debug log

    if (!validateForm()) {
      console.error("Validation failed.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/form/addforms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read backend error message
        console.error("Backend error:", errorText);
        throw new Error("Failed to submit the form.");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      alert("Adoption form submitted successfully!");
      setShowPopup(false); // Close the popup on success
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="adoption-popup">
      <div className="adoption-popup-container">
        <div className="adoption-popup-header">
          <h2>Adoption Form</h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setShowPopup(false)}
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="input-container">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={currData.name}
              onChange={onChangeHandler}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={currData.email}
              onChange={onChangeHandler}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="input-container">
            <input
              type="tel"
              name="phoneNo"
              placeholder="Phone Number"
              value={currData.phoneNo}
              onChange={onChangeHandler}
              required
            />
            {errors.phoneNo && (
              <span className="error-text">{errors.phoneNo}</span>
            )}
          </div>
          <div className="input-container">
            <select
              name="livingSituation"
              value={currData.livingSituation}
              onChange={onChangeHandler}
              required
            >
              <option value="" disabled>
                Select Living Situation
              </option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Other">Other</option>
            </select>
            {errors.livingSituation && (
              <span className="error-text">{errors.livingSituation}</span>
            )}
          </div>
          <div className="input-container">
            <textarea
              name="address"
              placeholder="Address"
              value={currData.address}
              onChange={onChangeHandler}
              rows="3"
              required
            ></textarea>
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>
          <div className="input-container">
            <textarea
              name="previousPets"
              placeholder="Previous Pets (if any)"
              value={currData.previousPets}
              onChange={onChangeHandler}
              rows="2"
            ></textarea>
          </div>
          <div className="input-container">
            <textarea
              name="otherPets"
              placeholder="Other Pets (if any)"
              value={currData.otherPets}
              onChange={onChangeHandler}
              rows="2"
            ></textarea>
          </div>
          <div className="submit-btn">
            <button type="submit">Submit Adoption Form</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdoptionPopup;
