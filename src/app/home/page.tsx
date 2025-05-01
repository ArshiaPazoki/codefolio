import Home from '../../features/home/ui/Home';

export default function Page() {
  return (
    // wrap in a container that itself is full-height
    <div className="flex-1 flex">
      <Home/>
    </div>
  );
}
