import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ExperienceSection } from '@/components/experience-section';
import { BlogSection } from '@/components/blog-section';
import { ContactSection } from '@/components/contact-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}