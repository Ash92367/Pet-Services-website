import React from 'react';
import AllPets from '../components/AllPets';

const Adoptpets = ({ setShowPopup, setSelectedPetId }) => {
  return (
    <div>
      <AllPets setShowPopup={setShowPopup} setSelectedPetId={setSelectedPetId} />
    </div>
  );
};

export default Adoptpets;
