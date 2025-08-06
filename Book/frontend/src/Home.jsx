import BookSlide from "./components/BookSlide";
import FamousBooks from "./components/FamousBooks";
import Gallery from "./components/Gallery";
import GlassCircles from "./components/GlassCircles";
import Hero from "./components/Hero";
import Heroo from "./components/Heroo";
import OutstandingBooks from "./components/OutstandingBooks";
import Personality from "./components/Personality";

export default function Home() {
  return (
    <div>
      <Hero/>
      <FamousBooks/>
      <Heroo/>
      <BookSlide />
      <Gallery/>
      <OutstandingBooks/>
      <Personality/>
         <div className="relative">
      <GlassCircles/>
      </div>
    </div>
  );
}
