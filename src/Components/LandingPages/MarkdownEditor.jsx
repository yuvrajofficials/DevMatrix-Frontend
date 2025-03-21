import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For extended Markdown support

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("# Hello, **Markdown**!");

  // Function to insert text at cursor position
  const insertAtCursor = (syntaxStart, syntaxEnd = "") => {
    const textarea = document.getElementById("markdown-input");
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = markdown.substring(0, startPos);
    const textAfter = markdown.substring(endPos, markdown.length);
    
    const newText = textBefore + syntaxStart + markdown.substring(startPos, endPos) + syntaxEnd + textAfter;
    setMarkdown(newText);
    
    // Refocus and set cursor inside syntax
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = startPos + syntaxStart.length;
      textarea.selectionEnd = endPos + syntaxStart.length;
    }, 0);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Markdown Editor</h1>

      {/* Toolbar Buttons */}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => insertAtCursor("**", "**")} className="btn">Bold</button>
        <button onClick={() => insertAtCursor("_", "_")} className="btn">Italic</button>
        <button onClick={() => insertAtCursor("~~", "~~")} className="btn">Strikethrough</button>
        <button onClick={() => insertAtCursor("`", "`")} className="btn">Code</button>
        <button onClick={() => insertAtCursor("> ")} className="btn">Quote</button>
        <button onClick={() => insertAtCursor("# ")} className="btn">Heading</button>
        <button onClick={() => insertAtCursor("- ")} className="btn">List</button>
        <button onClick={() => insertAtCursor("1. ")} className="btn">Numbered List</button>
        <button onClick={() => insertAtCursor("[Text](url)")} className="btn">Link</button>
        <button onClick={() => setMarkdown("")} className="btn bg-red-500 text-white">Clear</button>
      </div>

      {/* Markdown Editor & Preview */}
      <div className="flex flex-1 gap-4">
        {/* Markdown Input */}
        <textarea
          id="markdown-input"
          className="w-1/2 p-2 border rounded-lg shadow bg-white"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        
        {/* Markdown Preview */}
        <div className="w-1/2 p-4 border rounded-lg shadow bg-white prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>

      {/* Tailwind Button Styles */}
      <style>
        {`
          .btn {
            padding: 6px 12px;
            background: #4A90E2;
            color: white;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: 0.2s;
          }
          .btn:hover {
            background: #357ABD;
          }
        `}
      </style>
    </div>
  );
};

export default MarkdownEditor;
