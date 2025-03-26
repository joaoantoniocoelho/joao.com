"use client";

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiX } from 'react-icons/si';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out through any of the channels below.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://linkedin.com/in/joaoac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <FaLinkedin className="h-7 w-7" />
            </a>
            <a
              href="https://x.com/joaoac_dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <SiX className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/joaoantoniocoelho"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <FaGithub className="h-7 w-7" />
            </a>
            <div className="flex items-center text-white">
              <MdEmail className="h-7 w-7 mr-2" aria-hidden="true" />
              joaoantonioscoelho@gmail.com
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}