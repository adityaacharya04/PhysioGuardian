import React from 'react';

const faqs = [
  {
    question: 'What should I do if I feel sharp pain during an exercise?',
    answer: 'Stop the exercise immediately. If the pain persists, consult a medical professional.',
  },
  {
    question: 'How often should I exercise?',
    answer: 'This depends on your individual condition and goals. It is best to consult with a physiotherapist to create a personalized exercise plan.',
  },
  {
    question: 'Can I use this app instead of seeing a real physiotherapist?',
    answer: 'This app is intended to be a supplementary tool to your physiotherapy treatment. It is not a replacement for professional medical advice.',
  },
];

const FAQ = () => {
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
