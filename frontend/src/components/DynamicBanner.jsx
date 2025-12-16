import React from 'react';

const DynamicBanner = () => {
  const bannerText = "MEGA SALE: Get 25% OFF on all fresh vegetables! Use code: FRESH25 | FREE DELIVERY on orders above ₹500! Order now and save big! | New Customer Special: Flat ₹200 OFF on your first order! | Flash Deal: Premium fruits at 30% OFF - Limited time only! | Weekend Special: Buy 2 Get 1 FREE on dairy products! | ";

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      color: '#fff',
      padding: '12px 0',
      fontSize: '14px',
      fontWeight: '600',
      overflow: 'hidden',
      zIndex: 1000,
      whiteSpace: 'nowrap'
    }}>
      <div style={{
        display: 'inline-block',
        animation: 'marquee 60s linear infinite'
      }}>
        {bannerText.repeat(3)}
      </div>
    </div>
  );
};

export default DynamicBanner;