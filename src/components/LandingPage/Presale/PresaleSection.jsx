import { FaGlobe, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Official X icon
// Assets are served from public directory, so we use direct paths

export default function PresaleSection() {
  const topIcons = [FaGlobe, FaInstagram, FaXTwitter, FaTelegramPlane]; // X icon in place of Twitter
  const progressImages = [
    "/LandingPage/presale/startPresale.png",
    "/LandingPage/presale/EndPresale.png",
    "/LandingPage/presale/claim.png"
  ];
  const progressLabels = [
    { title: "Start Presale", date: "Sept 21, 12:00PM (UTC)" },
    { title: "End Presale", date: "Sept 21, 12:00PM (UTC)" },
    { title: "Claim", date: "Sept 21, 12:00PM (UTC)" },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center mt-8 md:mt-11 px-4 sm:px-6 md:px-8 lg:px-6 relative">
      {/* Video Container */}
      <div className="w-full max-w-[1200px] h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl md:rounded-[36px] overflow-hidden relative">
        <video
          className="w-full h-full object-cover"
          src="/LandingPage/presale/Presale.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Images Container */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 z-10">
          <img
            src="/LandingPage/presale/CoinLogo.png"
            alt="Logo"
            className="h-12 sm:h-14 md:h-16 lg:h-24 w-auto object-contain"
          />
          <img
            src="/LandingPage/presale/coinguard.png"
            alt="Text Image"
            className="h-12 sm:h-14 md:h-16 lg:h-24 w-auto object-contain scale-110"
          />
        </div>
      </div>

      {/* Top Icons */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 -mt-8 md:-mt-10 lg:-mt-12 z-10">
        {topIcons.map((Icon, index) => (
          <div
            key={index}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 p-3 sm:p-3.5 md:p-4 lg:p-4 bg-zinc-500/60 rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-3xl outline outline-2 outline-offset-[-2px] outline-zinc-500 backdrop-blur-sm flex justify-center items-center"
          >
            <Icon className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
          </div>
        ))}
      </div>

      {/* Progress Bar & Icons */}
      <div className="w-full flex flex-col justify-start items-center gap-6 sm:gap-7 md:gap-8 lg:gap-8 mt-10 md:mt-12 lg:mt-16">
        {/* Desktop Progress Bar */}
        <div className="hidden lg:flex w-full max-w-[900px] px-6 py-11 relative justify-between items-center">
          <div className="w-full h-4 bg-zinc-800 border border-zinc-800 rounded-full" />
          <div className="absolute left-0 top-0 w-full flex justify-between items-center px-6">
            {progressImages.map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 p-3 bg-zinc-800 rounded-3xl flex justify-center items-center"
              >
                <img
                  src={img}
                  alt={`progress-${index}`}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Progress Icons */}
        <div className="flex lg:hidden flex-col gap-6 sm:gap-7 md:gap-8 w-full max-w-md px-4">
          {progressImages.map((img, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 p-2 sm:p-2.5 md:p-3 bg-zinc-800 rounded-xl sm:rounded-2xl md:rounded-3xl flex justify-center items-center flex-shrink-0">
                <img
                  src={img}
                  alt={`progress-${index}`}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                <div className="text-white text-base sm:text-lg md:text-xl font-medium">
                  {progressLabels[index].title}
                </div>
                <div className="text-stone-300 text-xs sm:text-sm md:text-base">
                  {progressLabels[index].date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline Labels */}
        <div className="hidden lg:flex w-full max-w-[900px] px-6 justify-between items-start">
          {progressLabels.map((label, index) => (
            <div key={index} className="w-36 flex flex-col items-center gap-4">
              <div className="text-white text-2xl font-medium text-center">
                {label.title}
              </div>
              <div className="text-stone-300 text-base text-center">
                {label.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
