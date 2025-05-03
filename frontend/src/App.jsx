import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Banner from "./components/Banner";
import AdoptPets from "./pages/Adoptpets";
import PetSupplies from "./pages/Petsupplies";
import PetAccessories from "./pages/PetAccessories";
import Petfood from "./pages/Petfood";
import Cartt from "./pages/Cart";
import Categories from "./components/Categories";
import Popular from "./components/Popular";
import AllPets from "./components/AllPets";
import "./index.css";
import Hom from "./components/Hom";
import { useState } from "react";
import Loginpopup from "./components/Loginpopup";
import AdoptionPopup from "./components/AdoptionPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null); // Track selected pet ID for adoption

  return (
    <StoreContextProvider>
      <Router>
        {/* Login popup */}
        {showLogin && <Loginpopup setShowLogin={setShowLogin} />}
        
        {/* Adoption popup */}
        {showPopup && (
          <AdoptionPopup 
            setShowPopup={setShowPopup} 
            petId={selectedPetId} // Pass selected pet ID to AdoptionPopup
          />
        )}
        
        <Navbar setShowLogin={setShowLogin} />

        <div className="max-w-[90%] mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Categories /> {/* Categories component */}
                  <Popular 
                    setShowPopup={setShowPopup} 
                    setSelectedPetId={setSelectedPetId} // Pass setter for pet ID
                  />
                  <Hom />
                </>
              }
            />
            <Route
              path="/adopt-pets"
              element={
                <AdoptPets 
                  setShowPopup={setShowPopup} 
                  setSelectedPetId={setSelectedPetId} // Pass setter for pet ID
                />
              }
            />
            <Route
              path="/pets"
              element={
                <AllPets 
                  setShowPopup={setShowPopup} 
                  setSelectedPetId={setSelectedPetId} // Pass setter for pet ID
                />
              }
            />
            <Route path="/pet-supplies" element={<PetSupplies />} />
            <Route path="/pet-supplies/accessories" element={<PetAccessories />} />
            <Route path="/pet-supplies/food" element={<Petfood />} />
            <Route path="/cart" element={<Cartt />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </StoreContextProvider>
  );
};

export default App;
