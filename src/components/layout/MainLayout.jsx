import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout() {
  return (
    <div className="shell">
      <Navbar />
      <main className="shell__main"><Outlet /></main>
      <Footer />
    </div>
  );
}
