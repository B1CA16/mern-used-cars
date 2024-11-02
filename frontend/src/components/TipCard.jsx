import React from 'react';

const TipCard = ({ tip }) => {
  return (
    <div className="dark:bg-neutral-800 bg-neutral-100 p-6 rounded-md shadow">
      <div className="flex justify-center mb-4">
        {tip.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{tip.title}</h3>
      <p className="dark:text-neutral-300 text-neutral-700 text-center">{tip.description}</p>
    </div>
  );
};

export default TipCard;
