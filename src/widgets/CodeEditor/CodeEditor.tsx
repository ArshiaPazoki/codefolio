// src/widgets/CodeEditor/CodeEditor.tsx
'use client'

import { FC, useMemo } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
// const vscDarkPlus = oneDark;

const customTheme = {
  ...vscDarkPlus,
  // wrapper styles
  'pre[class*="language-"]': {
    background: '#1e1e1e',
    margin: 0,
    padding: '1rem',
    overflow: 'auto',
    borderRadius: '8px',
    fontFamily: 'Consolas, Courier New, monospace',
    fontSize: '0.9rem',
    lineHeight: '1.4',
  },
  'code[class*="language-"]': {
    background: 'none',
    padding: 0,
    fontFamily: 'Consolas, Courier New, monospace',
  },
  // token colors
  // comment: { color: '#6a9955', fontStyle: 'italic' },
  // keyword: { color: '#569cd6', fontWeight: 'bold' },
  // string: { color: '#ce9178' },
  // function: { color: '#dcdcaa' },
  // number: { color: '#b5cea8' },
  // boolean: { color: '#b5cea8' },
  // operator: { color: '#d4d4d4' },
  // punctuation: { color: '#d4d4d4' },
  // className: { color: '#4ec9b0' },
  // ...add/override any token
}

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('html', html)
interface CodeEditorProps {
  code: string
  language: 'tsx' | 'js' | 'ts' | 'json' | 'css' | 'html'
  className?: string
  showLineNumbers?: boolean
  wrapLines?: boolean
  highlightLines?: number[]  // 0-based indices
}

const CodeEditor: FC<CodeEditorProps> = ({
  code,
  language,
  className = '',
  showLineNumbers = true,
  wrapLines = false,
  highlightLines = [],
}) => {
  // react-syntax-highlighter needs a string of lines, so ensure trailing newline
  const formattedCode = useMemo(() => {
    return code.endsWith('\n') ? code : code + '\n'
  }, [code])

  return (
    <div className={`${className} rounded-md overflow-hidden shadow-lg`}>
      <SyntaxHighlighter
        language={language}
        style={customTheme}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLines}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'var(--vscode-editor-background, #1e1e1e)',
          fontFamily: 'var(--vscode-editor-font-family, Consolas, "Courier New", monospace)',
          fontSize: '0.875rem',
          lineHeight: '1.4',
        }}
        lineNumberStyle={{
          color: 'var(--vscode-editorLineNumber-foreground,rgb(200, 200, 200))',
          paddingRight: '1rem',
          paddingLeft:'10px',
          // borderLeft:'1px dashed red',
        }}
        wrapLines={wrapLines}
        useInlineStyles={true}
        showInlineLineNumbers={false}
        lineProps={(lineNumber) => ({
          style: highlightLines.includes(lineNumber - 1)
            ? { display: 'block',backgroundColor: 'rgba(38, 143, 255, 0.15)' }
            : {},
        })}
      >
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeEditor
