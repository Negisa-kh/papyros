import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: '/images/22.jpg', alt: 'عکس 1' },
    { id: 2, src: '/images/23.jpg', alt: 'عکس 2' },
    { id: 3, src: '/images/24.jpg', alt: 'عکس 3' },
    { id: 4, src: '/images/25.jpg', alt: 'عکس 4' },
  ];

  return (
    <div className=" mt-20 mb-25 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64    object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;