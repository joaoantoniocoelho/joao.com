"use client";

import { motion } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import experiencesData from '@/data/experiences.json';
import { useState } from 'react';

export function ExperienceSection() {
  // Get only the first 2 experiences to display on the home page
  const featuredExperiences = experiencesData.experiences.slice(0, 2);
  // State to track expanded state for each experience
  const [expandedItems, setExpandedItems] = useState<{[key: number]: boolean}>({});
  
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  return (
    <section id="experience" className="py-16 bg-black/50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">Experience</h2>
            <a 
              href="/experiences" 
              className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
            >
              View All Experiences
              <FiArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-5 rounded-lg w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <span className="text-gray-500 text-sm">•</span>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                      >
                        {exp.company} <FiExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                </div>
                {exp.companyInfo && (
                  <p className="text-gray-400 mb-3 text-xs italic border-l-2 border-gray-700 pl-3 text-left">
                    {exp.companyInfo}
                  </p>
                )}
                <div className="mb-3 text-left">
                  <p className="text-gray-300 text-sm">
                    {expandedItems[index] 
                      ? exp.description 
                      : `${exp.description.substring(0, 200)}${exp.description.length > 200 ? '...' : ''}`}
                  </p>
                  {exp.description.length > 200 && (
                    <button 
                      onClick={() => toggleExpand(index)}
                      className="mt-1 flex items-center text-gray-400 hover:text-white transition-colors text-xs font-medium"
                    >
                      {expandedItems[index] ? (
                        <>
                          Show Less <FiChevronUp className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Show More <FiChevronDown className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}