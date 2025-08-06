
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-9">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-center">
          <div className="space-y-4">
            <h4 className="text-lg font-bold">کتاب‌های پیشنهادی</h4>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <span>    کتاب ملت عشق  </span>
              </div>
              <div className="flex items-center mb-2">
                <span>   کتاب کیمیاگر </span>
              </div>
              <div className="flex items-center mb-2">
                <span>   کتاب کتابخانه نیمه شب </span>
              </div>
              <div className="flex items-center mb-2">
                <span>   کتاب غرور و تعصب </span>
              </div>
              <div className="flex items-center mb-2">
                <span>  کتاب کوه پنجم  </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">اشتراک مجله</h4>
            <p>۱۰٪ تخفیف در اولین خرید</p>
            <form className="flex justify-center">
              <input
                type="email"
                className="border text-right border-gray-400 p-3 rounded-l-lg md:w-28 text-black placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
              <button className="bg-black border border-gray-300 text-white p-3 rounded-r-lg hover:bg-slate-800 transition duration-300">
                &rarr;
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">پشتیبانی</h4>
            <p>گیلان DH 1515، ایران</p>
            <p>PAPYROS@gmail.com</p>
            <p>+984566998034</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold"> پاپیروس</h4>
            <a href="#" className="block">
             تماس با ما
            </a>
            <a href="#" className="block">
               دربارهٔ پاپیروس
            </a>
            <a href="#" className="block">
              سؤالات متداول
            </a>
            <a href="#" className="block">
                مجلهٔ معرفی و نقد کتاب
            </a>
          </div>

         <div className="space-y-4 ">
            <h4 className="text-4xl text-white font-bold">PAP<span className="text-purple-900">YROS</span> </h4>
          </div> 
        </div>

        <div className="text-center mt-10 border-t border-gray-700 pt-4">
          <p>&copy; 2024 Rimel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
