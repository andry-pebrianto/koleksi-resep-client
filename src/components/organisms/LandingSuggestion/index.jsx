import React from 'react';
import Right from './Right';
import SuggestionImage from '../../../assets/images/landing-suggestion.webp';

function LandingSuggestion() {
  return (
    <section className="suggestion ff-airbnb mb-10">
      <div className="title-section mb-4 mb-md-5">
        <h1>Popular For You!</h1>
      </div>
      <div className="row">
        <div className="left col-12 col-md-6">
          <img src={SuggestionImage} alt="Suggestion" />
          <div />
        </div>
        <Right />
      </div>
    </section>
  );
}

export default LandingSuggestion;
