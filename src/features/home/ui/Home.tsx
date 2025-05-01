// src/features/home/ui/Home.tsx
'use client'
import { useDeveloperInfo } from '../model/useDeveloperInfo'
import { useActiveLine } from '../lib/useActiveLine'
import CodeEditor from '../../../widgets/CodeEditor/CodeEditor'

const sampleCode = `import React from 'react';

interface Props {
  name: string;
}

export const Hello: React.FC<Props> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Hello;
`

export default function Home() {
  const { name, role, bio } = useDeveloperInfo()
  const activeLine = useActiveLine(2000)

  return (
    // <div className="flex items-center justify-center bg-bg-main h-full">
    <div className="flex flex-1 w-full h-full items-center justify-center bg-bg-main">
      <CodeEditor
        // code={codeLines.join('\n')}
        code={sampleCode}
        language="tsx"
        className="w-full h-full"
        highlightLines={[activeLine]}
      />
    </div>
  )
}
