import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import the icons

const Accordion = ({ values }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleValue = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {values.map((value, index) => (
        <div
          key={index}
          className="bg-white dark:bg-neutral-800 p-4 rounded-md shadow hover:bg-neutral-100 hover:dark:bg-neutral-700/50 group transition-all duration-300"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleValue(index)}
          >
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {value.title}
            </h3>
            {openIndex === index ? (
              <FaChevronUp className="text-neutral-900 dark:text-neutral-100 group-hover:scale-125 transition-transform duration-300" />
            ) : (
              <FaChevronDown className="text-neutral-900 dark:text-neutral-100 group-hover:scale-125 transition-transform duration-300" />
            )}
          </div>
          {openIndex === index && (
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              {value.body}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
