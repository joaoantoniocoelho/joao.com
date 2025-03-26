"use client";

import { motion } from 'framer-motion';
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const blogPosts = [
  {
    title: "Building Scalable HR Solutions with Node.js and AWS",
    date: "June 15, 2024",
    preview: "Exploring architectural patterns and best practices for developing enterprise-grade HR systems that can handle millions of users with Node.js microservices and AWS..."
  },
  {
    title: "Optimizing React Performance in Large Enterprise Applications",
    date: "May 30, 2024",
    preview: "Techniques for improving React application performance when dealing with complex UI requirements and large datasets in enterprise HR portals..."
  },
  {
    title: "Serverless Architecture for Modern HR Systems",
    date: "May 10, 2024",
    preview: "How to leverage AWS Lambda, DynamoDB, and API Gateway to create scalable and cost-effective payroll processing systems..."
  },
];

export function BlogSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [maxSlides, setMaxSlides] = useState(0);
  
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 16,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setLoaded(true);
      
      // Get the current slides per view based on screen size
      const slidesPerView = getSlidesPerView(slider);
      setSlidesPerView(slidesPerView);
      
      // Calculate max possible slide index
      const maxPossibleSlide = Math.max(0, blogPosts.length - slidesPerView);
      setMaxSlides(maxPossibleSlide);
    },
    updated(slider) {
      // Update slides per view on resize
      const slidesPerView = getSlidesPerView(slider);
      setSlidesPerView(slidesPerView);
      
      // Recalculate max possible slide index
      const maxPossibleSlide = Math.max(0, blogPosts.length - slidesPerView);
      setMaxSlides(maxPossibleSlide);
    }
  });
  
  // Function to get current slides per view based on slider configuration
  const getSlidesPerView = (slider: any) => {
    if (slider.options.slides && typeof slider.options.slides === 'object' && 'perView' in slider.options.slides) {
      return slider.options.slides.perView as number;
    }
    return 1;
  };
  
  // Determine if next/previous buttons should be disabled
  const isNextDisabled = blogPosts.length <= slidesPerView || currentSlide >= maxSlides;
  const isPrevDisabled = currentSlide === 0;

  return (
    <section id="blog" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Posts</h2>
            <a
              href="https://medium.com/@joaoac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
            >
              Read all posts <FiExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  className="keen-slider__slide"
                >
                  <div className="bg-white/5 rounded-lg overflow-hidden p-6 h-full">
                    <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                    <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-4">{post.preview}</p>
                    <a
                      href="https://medium.com/@joaoac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
                    >
                      Read More <FiExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            {loaded && instanceRef.current && (
              <div className="flex justify-center mt-8 gap-4">
                <button
                  onClick={() => instanceRef.current?.prev()}
                  disabled={isPrevDisabled}
                  className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  disabled={isNextDisabled}
                  className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}