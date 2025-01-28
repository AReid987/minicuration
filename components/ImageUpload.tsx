
"use client";
import React, { useState } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div>
      <input type="file" accept=".jpg,.jpeg,.bmp,.png,.gif,.tif,.tiff" onChange={handleImageUpload} />
      {image && (
        <div>
          <img
            src={image}
            alt="Uploaded"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <button onClick={rotateImage}>Rotate 90°</button>
        </div>
      )}
    </div>
  );
}
