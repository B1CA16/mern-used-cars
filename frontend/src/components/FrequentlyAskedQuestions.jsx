import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Accordion from './Accordion';

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      title: 'How do I list my car for sale?',
      body: 'Listing your car is simple. Just create an account, provide details about your vehicle, upload photos, and set your price. Once approved, your car will be visible to buyers.',
    },
    {
      title: 'How do I contact a seller?',
      body: 'When you find a car you’re interested in, click on the listing to see more details. There you can find information about the seller.',
    },
    {
      title: 'How can I arrange a test drive?',
      body: 'Once you contact the seller, you can arrange a test drive at a mutually convenient time and place. Always ensure the meeting is in a safe and public location.',
    },
    {
      title: 'What should I do if I have issues with a buyer or seller?',
      body: 'We encourage you to contact us immediately if you encounter any issues. Our support team is here to help resolve any disputes or concerns.',
    },
  ];

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 py-12">
      <div className="mx-auto px-6 sm:px-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-neutral-100">
          Frequently Asked Questions (FAQ)
        </h2>
        <Accordion values={faqs} />
        <div className="w-full flex justify-center py-6">
          <p className="text-neutral-700 dark:text-neutral-300 text-lg">
            If you have any additional questions or need further assistance, please don't hesitate to contact our support team. We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
