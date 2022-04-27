import React from 'react';
import Right from './Right';
import NewImage from '../../../assets/images/landing-new.webp';

function LandingNew() {
  return (
    <section className="new ff-airbnb mb-10">
      <div className="title-section mb-4 mb-md-5">
        <h1>New Recipe</h1>
      </div>
      <div className="row">
        <div className="left col-12 col-md-6">
          <img src={NewImage} alt="New Recipe" />
          <div />
        </div>
        <Right />
      </div>
    </section>
  );
}

export default LandingNew;
