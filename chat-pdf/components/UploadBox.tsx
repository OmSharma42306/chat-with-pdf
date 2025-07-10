'use client'
import { useRef } from "react";

export default function UploadBox() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      alert(`Selected: ${file.name}`);
      // TODO: Send to backend / LangChain logic
    }
  };

  return (
    <div className="mt-8">
      <input
        type="file"
        accept=".pdf"
        ref={fileRef}
        className="mb-4"
      />
      <br />
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload PDF
      </button>
    </div>
  );
}
