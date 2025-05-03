import React, { useState } from 'react';
import Popular from '../components/Popular';
import Categories from '../components/Categories';
import Hom from '../components/Hom'
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Categories/>
      <Popular />
      <Hom/>
    </>
  );
};

export default Home;
