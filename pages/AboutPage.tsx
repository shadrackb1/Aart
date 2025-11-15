
import React from 'react';
import PageTransition from '../components/layout/PageTransition';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-black tracking-tighter text-brand-dark sm:text-6xl">About Aart</h1>
              <p className="mt-6 text-xl text-gray-500">
                We believe that clothing is more than just fabric; it's a canvas for self-expression. Aart was born from a desire to merge the worlds of contemporary art and minimalist fashion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="mt-16 prose prose-lg max-w-none text-gray-700"
            >
              <h2>Our Story</h2>
              <p>
                Founded in a small studio by a collective of artists and designers, Aart started as an experiment: can we create apparel that feels like a piece of art, yet is wearable and timeless? We obsessed over every detail, from the weight of the cotton to the precise placement of a seam. Our goal wasn't to follow trends, but to create foundational pieces that serve as the building blocks of a thoughtful wardrobe.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                To empower creative individuals by providing them with high-quality, ethically-made apparel that is both beautiful and functional. We design for longevity, creating pieces that you will cherish and wear for years to come.
              </p>
              
              <h2>Our Values</h2>
              <ul>
                <li><strong>Quality over Quantity:</strong> We prioritize premium materials and meticulous craftsmanship.</li>
                <li><strong>Mindful Design:</strong> Every piece is designed with intent, balancing aesthetics with everyday utility.</li>
                <li><strong>Ethical Production:</strong> We partner with manufacturers who share our commitment to fair labor and sustainable practices.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
