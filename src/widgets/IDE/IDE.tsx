"use client";

import Editor from "@monaco-editor/react";
// import { useEffect, useState } from "react";
import { codeLines } from '@/shared/configs/homeConfig'


const IDE = () => {
  return (
            <Editor
              height="92vh"
              defaultLanguage="javascript"
              defaultValue={codeLines.map(line => line.code).join('\n')}
              theme="vs-dark"
              className="h"
            />
  );
}

export default IDE