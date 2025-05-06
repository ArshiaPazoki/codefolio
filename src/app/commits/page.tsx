// src/app/commits/page.tsx
import InteractiveGitGraph from '@/features/git/ui/InteractiveGitGraph';

export default function CommitsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Commit Explorer</h1>
      <InteractiveGitGraph />
    </main>
  );
}
