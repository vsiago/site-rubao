// components/CustomFileUploadButton.jsx
import React from "react";

const CustomFileUploadButton = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="relative">
      {/* Input file oculto */}
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Botão personalizado */}
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
      >
        Escolher Arquivo
      </label>
    </div>
  );
};

export default CustomFileUploadButton;
