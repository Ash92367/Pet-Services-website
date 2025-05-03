import React from 'react';
import './Hom.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title"> <span className='bold'>What</span> we offer</h1>
      <p className="subtitle">
      </p>
      <div className="services-grid">
        <div className="service-item">
          <div className="icon">🐾</div>
          <h3>Pet Adoption</h3>
          <p>
            Our extensive program includes comprehensive physical exams</p><p> and internal parasite testing.
          </p>
        </div>

        <div className="service-item">
          <div className="icon">🛍️</div>
          <h3>Pet Supplies</h3>
          <p>
            A wide range of high-quality products to meet all your pet's needs.
          </p>
        </div>

        <div className="service-item">
          <div className="icon">⚕️</div>
          <h3>Pet Care</h3>
          <p>
            Dedicated care to keep your furry friend healthy and happy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
