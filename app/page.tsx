import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { CoursesGrid } from '@/components/courses-grid';
import { FeaturesSection } from '@/components/features-section';
import { TrainersSection } from '@/components/trainers-section';
import { AchievementsSection } from '@/components/achievements-section';
import { SuccessStoriesSection } from '@/components/success-stories-section';
import { RecognitionSection } from '@/components/recognition-section';
import { LocationSection } from '@/components/location-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <CoursesGrid />
      <FeaturesSection />
      <TrainersSection />
      <AchievementsSection />
      <SuccessStoriesSection />
      <RecognitionSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
