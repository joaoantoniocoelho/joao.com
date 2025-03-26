"use client";

import { motion } from 'framer-motion';
import experiencesData from '@/data/experiences.json';

export function AboutSection() {
  const { skills } = experiencesData;
  const firstColumn = skills.slice(0, Math.ceil(skills.length / 2));
  const secondColumn = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg mb-6">
              I&apos;m João, a brazilian software engineer passionate about backend and full-stack development.
              I&apos;ve helped build secure payment systems, compliance solutions, and enterprise-grade HR and payroll applications — always aiming for clean code, scalable architecture, and real-world impact.
              I enjoy working across the stack, especially when cloud platforms and microservices are involved.
              </p>
              <p className="text-gray-300 text-lg mb-6">
              When I'm not coding, you'll usually find me exploring new coffee spots, traveling to experience new cultures, or relaxing at home with my dogs.
              To stay balanced, I practice Muay Thai, and for fun, I enjoy playing racing sims.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-300">
                    <ul className="space-y-2">
                      {firstColumn.map((skill, index) => (
                        <li key={index}>• {skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-gray-300">
                    <ul className="space-y-2">
                      {secondColumn.map((skill, index) => (
                        <li key={index}>• {skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}