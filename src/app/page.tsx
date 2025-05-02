// import ComingSoon from '../widgets/ComingSoon/ComingSoon'
import Hero from '../features/home/ui/Hero';
export default function Page() {
  return (
    // wrap in a container that itself is full-height
    <div className="flex-1 flex">
      {/* <ComingSoon title="<Arshia Pazoki/>" subtitle="🚧🚧🚧 We’re working on something awesome—check back soon! 🚧🚧🚧" /> */}
      <Hero/>
    </div>
  );
}
