"use client";

import { motion } from 'framer-motion';
import { FiExternalLink, FiChevronDown, FiChevronUp, FiArrowLeft } from 'react-icons/fi';
import experiencesData from '@/data/experiences.json';
import { useState } from 'react';

export default function ExperiencesPage() {
  const { experiences } = experiencesData;
  const [expandedItems, setExpandedItems] = useState<{[key: number]: boolean}>({});
  
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  return (
    <main className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="mb-8 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Professional Experience</h1>
          <p className="text-gray-300 text-lg">
            A comprehensive timeline of my professional journey in software development.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-white/20 transform -translate-x-1/2" />

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${
                index % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:translate-y-12'
              }`}
            >
              <div className={`${index % 2 === 0 ? 'md:text-right' : ''} ${
                index % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:col-start-2'
              }`}>
                <div className="bg-white/5 p-5 rounded-lg w-full">
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
                      {expandedItems[index] || exp.description.length <= 250
                        ? exp.description 
                        : `${exp.description.substring(0, 250)}...`}
                    </p>
                    {exp.description.length > 250 && (
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}