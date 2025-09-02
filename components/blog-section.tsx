"use client";

import { motion } from 'framer-motion';
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { getMediumPosts } from '@/services/medium';
import Image from 'next/image';

interface BlogPost {
  title: string;
  date: string;
  preview: string;
  link: string;
  thumbnail: string;
}

export function BlogSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [maxSlides, setMaxSlides] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getMediumPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 640px)": {
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
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">Latest Posts</h2>
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                No posts available at the moment.
              </div>
            ) : (
              <>
                <div ref={sliderRef} className="keen-slider">
                  {blogPosts.map((post, index) => (
                    <motion.article
                      key={index}
                      className="keen-slider__slide flex h-full"
                    >
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/5 rounded-lg overflow-hidden w-full cursor-pointer hover:bg-white/10 transition-colors flex flex-col h-96 sm:h-96"
                      >
                        {post.thumbnail && (
                          <div className="relative w-full h-36 sm:h-40 md:h-48 flex-shrink-0">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow min-h-0">
                          <div className="flex-grow">
                            <p className="text-xs sm:text-sm text-gray-400 mb-2">{post.date}</p>
                            <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight line-clamp-3">{post.title}</h3>
                          </div>
                          <div className="inline-flex items-center text-white hover:text-gray-300 transition-colors text-sm mt-4 flex-shrink-0">
                            Read More <FiExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                      </a>
                    </motion.article>
                  ))}
                </div>

                {loaded && instanceRef.current && blogPosts.length > slidesPerView && (
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
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}