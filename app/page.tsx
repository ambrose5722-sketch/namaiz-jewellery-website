import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MirrorHall from "@/components/MirrorHall";
import Collection from "@/components/Collection";
import CraftSection from "@/components/CraftSection";
import ArtOfMacrame from "@/components/ArtOfMacrame";
import BrandStory from "@/components/BrandStory";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <MirrorHall />
      <Collection />
      <CraftSection />
      <ArtOfMacrame />
      <BrandStory />
      <FinalCTA />
    </main>
  );
}
