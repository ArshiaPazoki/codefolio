import ExtendedTimeline from '@/features/timeline/ui/ExtendedTimeline';

export default function Page() {
  return (
    // wrap in a container that itself is full-height
//     <main className="h-screen bg-bg-main text-fg-main p-4">
//     <h2 className="text-3xl font-bold mb-4">My Career as Git Commits</h2>
//     <CodeStyleTimeLine />
//   </main>
<main className="bg-bg-main text-fg-main min-h-screen">
      <ExtendedTimeline />
    </main>
  );
}
