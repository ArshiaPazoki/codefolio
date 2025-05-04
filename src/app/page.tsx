import Hero from '../features/home/ui/Hero';
export default function Page() {
  return (
    // wrap in a container that itself is full-height
    <div className="flex-1 flex overflow-auto no-scrollbar">
      <Hero/>
    </div>
  );
}
