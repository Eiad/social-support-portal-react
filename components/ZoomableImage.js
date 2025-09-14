'use client';

import { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

export default function ZoomableImage({ src, alt, className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Main Image Container */}
      <div
        className={`relative inline-block cursor-pointer group ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto mx-auto rounded border border-gray-100 transition-all duration-200 group-hover:shadow-lg"
        />

        {/* Desktop Hover Zoom Icon */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          bg-black/10 backdrop-blur-[1px] rounded transition-all duration-200
          ${isHovered ? 'opacity-100' : 'opacity-0'}
          hidden md:flex
        `}>
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <ZoomIn size={24} className="text-gray-700" />
          </div>
        </div>

        {/* Mobile Zoom Icon (Bottom Right) */}
        <div className="md:hidden absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <ZoomIn size={16} className="text-gray-700" />
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-200 text-white hover:scale-110"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Mobile: Tap to close hint */}
          <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">Tap anywhere to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}