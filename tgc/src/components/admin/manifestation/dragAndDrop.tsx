'use client'
import React from 'react';

interface DragAndDropAreaProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  imageFileName: string;
}


const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({ onDrop, onDragOver, imageFileName }) => {  return (
    <div className="border border-gray-300 border-dashed rounded-md px-4 py-8 text-center" 
         onDrop={onDrop} 
         onDragOver={onDragOver}>
      <p className="text-lg font-medium mb-4">Drag & Drop Image Here</p>
      {imageFileName && <p className="text-gray-600 dark:text-gray-400">Uploaded Image: {imageFileName}</p>}
    </div>
  );
}

export default DragAndDropArea;
