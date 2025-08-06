import imag1 from "/images/4.jpg";
import imag2 from "/images/5.jpg";
import imag3 from "/images/6.jpg";
import imag4 from "/images/7.jpg";
import imag5 from "/images/8.jpg";
import imag6 from "/images/9.jpg";

const people = [
  {
    name: "صادق هدایت",
    role: "ایرانی | تولد ۱۲۸۱ - درگذشت ۱۳۳۰",
    imag: imag1,
  },
  {
    name: "ویکتور هوگو",
    role: "فرانسوی | تولد ۱۸۰۲ - درگذشت ۱۸۸۵",
    imag: imag2,
  },
  {
    name: "جورج اورول",
    role: "انگلیسی | تولد ۱۹۰۳ - درگذشت ۱۹۵۰",
    imag: imag3,
  },
  {
    name: "الکساندر دوما",
    role: "فرانسوی | درگذشت۱۸۷۰-تولد۱۸۰۲",
    imag: imag4,
  },
  {
    name: "آلبر کامو",
    role: "فرانسوی | تولد ۱۹۱۳ - درگذشت ۱۹۶۰",
    imag: imag5,
  },
  {
    name: "چارلز دیکنز",
    role: "انگلیسی | تولد ۱۸۱۲ - درگذشت ۱۸۷۰",
    imag: imag6,
  },
  
];

export default function Personality() {
  return (
    <div className="w-full mt-24 py-24 sm:py-32 ">
      <div className="glassmorphism container">
      <div className="max-w-xl text-center mx-auto">
        <h2 className="text-3xl p-5 font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
          نویسنده‌های پیشنهادی
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl gap-20 p-6 lg:px-8 xl:grid-cols-3 ">
      
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex flex-col items-center gap-x-6 text-center">
                <img alt="" src={person.imag} className="size-16 rounded-full" />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm/6 font-semibold text-purple-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}