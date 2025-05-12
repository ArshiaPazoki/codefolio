import { Icon } from 'lucide-react';
import Hero from '../features/home/ui/Hero';

export const metadata = {
  title: 'ArshiaPazoki | CodeFolio',
  description: 'Arshia Pazoki Portfolio',
}

export default function Page() {
  return (
    // wrap in a container that itself is full-height
    <div className="flex-1 flex overflow-auto no-scrollbar">
      <Hero/>
    </div>
  );
}
