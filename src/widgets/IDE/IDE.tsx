"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useMemo, useCallback, useRef } from "react";
import { codeLines } from "@/shared/configs/homeConfig";

const IDE = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Memoized initial code block
  const initialCode = useMemo(
    () => codeLines.map(line => line.code).join("\n"),
    [codeLines]
  );

  // Full editor options
  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    fontFamily: "Fira Code, monospace",
    cursorStyle: "line",
    cursorBlinking: "blink",
    smoothScrolling: true,
    wordWrap: "on",
    wrappingStrategy: "advanced",
    formatOnPaste: true,
    formatOnType: true,
    automaticLayout: true,
    minimap: { enabled: true },
    scrollbar: {
      vertical: "visible",
      horizontal: "visible",
      useShadows: true,
    },
    tabSize: 4,
    lineNumbers: "on",
    renderLineHighlight: "line",
    renderWhitespace: "trailing",
    // rulers: [80, 120],
    folding: true,
    foldingStrategy: "auto",
    codeLens: true,
    contextmenu: true,
    mouseWheelZoom: true,
    fixedOverflowWidgets: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: { other: true, comments: false, strings: true },
    acceptSuggestionOnEnter: "smart",
    ariaLabel: "Monaco Code Editor",
  };

  // Capture the editor instance
  const handleEditorDidMount: OnMount = useCallback((editor, monacoInstance) => {
    editorRef.current = editor;
    const currentCode = editorRef.current?.getValue();
    // Example: Customize tab behavior or add commands here
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS, () => {
      console.log("Ctrl+S pressed — you can trigger save here.");
      console.log({currentCode});
    });
  }, []);

  return (
    <Editor
      height="92vh"
      defaultLanguage="javascript"
      defaultValue={initialCode}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={editorOptions}
    />
  );
};

export default IDE;
