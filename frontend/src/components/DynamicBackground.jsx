import React from 'react';

const DynamicBackground = () => {
  return (
    <div className="dynamic-background">
      <div className="floating-shapes">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="floating-shape"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          />
        ))}
      </div>
      <div className="grid-pattern"></div>
    </div>
  );
};

export default DynamicBackground;