import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatementSection from './components/StatementSection';
import CraftSection from './components/CraftSection';
import WorkSection from './components/WorkSection';
import StackSection from './components/StackSection';
import AboutContactSection from './components/AboutContactSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatementSection />
        <CraftSection />
        <WorkSection />
        <StackSection />
        <AboutContactSection />
      </main>
    </div>
  );
}
