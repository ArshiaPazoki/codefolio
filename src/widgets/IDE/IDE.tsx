"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useMemo, useCallback, useRef } from "react";
import { codeLines } from "@/shared/configs/homeConfig";

// import OneDarkPro from './themes/OneDark-Pro-darker.json'

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
    fontFamily: 'Jetbrains-Mono',
    fontLigatures: true,
    cursorStyle: "line",
    cursorBlinking: "expand",
    smoothScrolling: true,
    wordWrap: "on",
    wrappingStrategy: "advanced",
    formatOnPaste: true,
    formatOnType: true,
    automaticLayout: true,
    minimap: { 
      enabled: true,
      scale: 2,
      renderCharacters: false,
    },
    bracketPairColorization: {
      enabled: true
    },
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
    // monacoInstance.editor.defineTheme('OneDarkPro',{
    //   base: 'vs-dark',
    //   inherit: true,
    //   rules: [],
    //   ...OneDarkPro,
    // });
    // monacoInstance.editor.setTheme('OneDarkPro');
    monacoInstance.editor.defineTheme('XDarkPro',{
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
       "editor.background": "#171717",
     }
    });
    monacoInstance.editor.setTheme('XDarkPro');
  }, []);

  return (
    <Editor
      height="100vh"
      defaultLanguage="javascript"
      defaultValue={initialCode}
      // theme="vs-dark"
      theme="XDarkPro"
      onMount={handleEditorDidMount}
      options={editorOptions}
    />
  );
};

export default IDE;
