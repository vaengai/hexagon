import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-950 to-stone-900 ">
      <Navbar />
      <Hero />
    </div>
  );
}