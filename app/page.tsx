import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ExperienceSection } from '@/components/experience-section';
import { BlogSection } from '@/components/blog-section';
import { ContactSection } from '@/components/contact-section';
import { getMediumPosts } from '@/services/medium';

export const revalidate = 3600;

export default async function Home() {
  const blogPosts = await getMediumPosts();

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <BlogSection posts={blogPosts} />
      <ContactSection />
    </main>
  );
}