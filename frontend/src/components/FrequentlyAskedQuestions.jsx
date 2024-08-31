import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I list my car for sale?',
      answer: 'Listing your car is simple. Just create an account, provide details about your vehicle, upload photos, and set your price. Once approved, your car will be visible to buyers.',
    },
    {
      question: 'How do I contact a seller?',
      answer: 'When you find a car you’re interested in, click on the listing to see more details. There you can find information about the seller.',
    },
    {
      question: 'How can I arrange a test drive?',
      answer: 'Once you contact the seller, you can arrange a test drive at a mutually convenient time and place. Always ensure the meeting is in a safe and public location.',
    },
    {
      question: 'What should I do if I have issues with a buyer or seller?',
      answer: 'We encourage you to contact us immediately if you encounter any issues. Our support team is here to help resolve any disputes or concerns.',
    },
  ];

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 py-12">
      <div className="mx-auto px-6 sm:px-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-neutral-100">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 p-4 rounded-md shadow"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-neutral-900 dark:text-neutral-100" />
                ) : (
                  <FaChevronDown className="text-neutral-900 dark:text-neutral-100" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className='w-full flex justify-center py-6'>
          <p className="text-neutral-700 dark:text-neutral-300 text-lg">
          If you have any additional questions or need further assistance, please don't hesitate to contact our support team. We're here to help!
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
