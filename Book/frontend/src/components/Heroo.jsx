import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './Book loading.json'; 

const Heroo = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
      return () => animation.destroy(); 
    }
  }, []);

  return (
    <div className="flex items-center justify-center  text-white container mx-auto px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl text-black">
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <p className="mb-4 text-center md:text-center text-base md:text-lg lg:text-xl font-bold  leading-8">
          <span className='text-fuchsia-800 text-2xl'> کتاب، پنجره‌ای به دنیای بی‌پایان دانش و تخیل   </span> 
            <br></br>
کتاب‌ها نه تنها نوشته‌هایی روی کاغذ هستند، بلکه راهنمایی‌هایی هستند که ما را به سفرهای ناشناخته می‌برند، به گذشته‌ها و آینده‌ها تلنگر می‌زنند و ذهن ما را به فکر و تأمل دعوت می‌کنند. هر صفحه از یک کتاب دریچه‌ای است به دنیایی نو، قصه‌ای تازه، یا علمی ارزشمند که ما را از محدودیت‌های زمان و مکان بیرون می‌کشد    </p>
        </div>
           <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <div ref={containerRef} style={{ width: '100%', height: 'auto', maxWidth: '600px', maxHeight: '700px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Heroo;