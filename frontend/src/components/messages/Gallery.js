import React, { useCallback } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';
import './Gallery.css'; 

export default function Gallery({ onFileSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      onFileSelect(file);
    });
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*, video/*',
  });

  return (
    <div {...getRootProps()} className={`gallery-dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      <div className="gallery-icon">
        <IoImageOutline size={24} />

      </div>
    </div>
  );
}
