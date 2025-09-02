"use client";

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <a
            href="https://linkedin.com/in/joaoac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a
            href="https://x.com/joaoac_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SiX className="w-7 h-7" />
          </a>
          <a
            href="https://github.com/joaoantoniocoelho"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}