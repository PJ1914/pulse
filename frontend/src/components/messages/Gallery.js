// Gallery.js
import React from 'react';
import { IoImageOutline } from 'react-icons/io5';

export default function Gallery({ onFileSelect }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <label className="gallery-icon">
            <IoImageOutline size={24} />
            <input
                type="file"
                accept="image/*,video/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </label>
    );
}
