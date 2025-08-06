import imag1 from "/images/69.jpg";

export default function OutstandingBooks() {
  return (
    <div className="container min-h-[550px] sm:min-h-[600px] backgrond1   flex justify-center items-center  shadow-lg  text-right">
      <div className=" ">
      <div className="grid grid-cols-1 sm:grid-cols-2 ">
        <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-bold ">
            کتاب کیمیاگر
          </h1>
          <p className="text-md">
            سانتیاگو زادگاهش را رها می‌کند و به شمال آفریقا می‌رود تا در نزدیکی
            اهرام مصر گنجی مدفون‌شده را پیدا کند. پائولو کوئیلو (Paulo Coelho)
            در کتاب کیمیاگر (The Alchemist) با سبکی مشابه به داستان‌های شرقی،
            روایت‌گر قصه‌ی این پسر جوان است. او در مسیرش، با زنی کولی، مردی که
            خودش را پادشاه می‌داند و یک کیمیاگر آشنا شده و نیز عاشق فاطمه، دختر
            صحرا می‌شود. همه‌ی آن‌ها هدایت‌گر سانتیاگو در مسیر جست‌وجویش هستند.
            پئولو کوئیلو در این اثر از جملات قصار و پرمعنایی استفاده کرده که به
            سهم خود، داستان را بسیار زیبا و دل‌نشین کرده‌اند. نویسنده در رمان
            کیمیاگر به مخاطبان خود این مفهوم را می‌رساند که اگر در زندگی هدفی
            پراهمیت دارند، هیچ‌وقت آن را غیرقابل‌ دسترس ندانند و برای آن تلاش
            کنند؛ چرا که هرچه بیشتر ادامه دهند، بیشتر شایسته نتیجه‌ای والا
            خواهند بود. سانتیاگو در طول سفر خود احساساتی از قبیل اشتیاق، ترس،
            تنهایی، عشق و حتی شکست را تجربه می‌کند، اما همچنان مصمم به راه خود
            ادامه می‌دهد. پائولو کوئیلو در این کتاب با اتکا به‌ نقد زندگی
            روزمره، همه‌چیز را با تخیل شروع می‌کند، اما در آخر، آنچه برای
            خواننده روشن است، تحقق رویا و آرزویی‌ست که محال پنداشته شده بود.
            سانتیاگوی کتاب کیمیاگر نمادی از تمامی انسان‌هایی‌ست که می‌خواهند
            برای رسیدن به اهداف خود تلاش کنند، هرچند دیگران آن را حتی با قوه‌ی
            تخیل خود محال بدانند.
          </p>
          <div>
          </div>
        </div>
        <div className="min-h-[450px] sm:min-h-[500px] flex justify-center items-center relative order-1 sm:order-2">
          <div className=" overflow-hidden flex justify-center items-center">
            <img
              src={imag1}
              className="w-[300px] sm:w-[450px] sm:scale-125 mx-auto spin "
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
