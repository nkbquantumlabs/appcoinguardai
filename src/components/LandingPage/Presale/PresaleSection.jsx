// import {
//   FaCalendarAlt,
//   FaGift,
//   FaGlobe, // Substitute for browser
//   FaInstagram,
//   FaRocket,
//   FaTelegramPlane, // Telegram icon
//   FaTwitter,
// } from "react-icons/fa";
// import videoBg from "../../../../public/presale/presale.mp4"; // replace with your video path

// export default function PresaleSection() {
//   const topIcons = [FaGlobe, FaInstagram, FaTwitter, FaTelegramPlane];
//   const progressIcons = [FaRocket, FaCalendarAlt, FaGift];
//   const progressIconColors = [
//     "text-lime-400",
//     "text-lime-400",
//     "text-lime-400",
//   ];
//   const progressLabels = [
//     { title: "Start Presale", date: "Sept 21, 12:00PM (UTC)" },
//     { title: "End Presale", date: "Sept 21, 12:00PM (UTC)" },
//     { title: "Claim", date: "Sept 21, 12:00PM (UTC)" },
//   ];

//   return (
//     <div className="w-full flex flex-col justify-center items-center mt-11 relative">
//       {/* Video Container */}
//       <div className="w-full max-w-4xl h-96 rounded-[36px] overflow-hidden relative">
//         <video
//           className="w-full h-full object-cover"
//           src={videoBg}
//           autoPlay
//           loop
//           muted
//         />
//       </div>

//       {/* Top Icons - outside video container */}
//       <div className="flex justify-center items-center gap-6 -mt-12 z-10">
//         {topIcons.map((Icon, index) => (
//           <div
//             key={index}
//             className="w-20 h-20 px-4 py-4 bg-zinc-500/60 rounded-2xl outline outline-2 outline-offset-[-2px] outline-zinc-500 backdrop-blur-blur flex justify-center items-center"
//           >
//             <Icon className="text-white w-12 h-12" />
//           </div>
//         ))}
//       </div>

//       {/* Progress Bar & Icons */}
//       <div className="self-stretch flex flex-col justify-start items-center gap-8 mt-16">
//         <div className="w-[856px] px-6 py-11 relative flex justify-between items-center">
//           <div className="w-full h-4 bg-zinc-800 border border-zinc-800 rounded-full" />
//           <div className="absolute left-0 top-0 w-full flex justify-between items-center px-6">
//             {progressIcons.map((Icon, index) => (
//               <div
//                 key={index}
//                 className="w-24 h-24 p-4 bg-zinc-800 rounded-3xl flex justify-center items-center"
//               >
//                 <Icon className={`${progressIconColors[index]} w-12 h-12`} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Timeline Labels */}
//         <div className="self-stretch px-6 flex justify-center items-center gap-52">
//           {progressLabels.map((label, index) => (
//             <div key={index} className="w-40 flex flex-col items-center gap-4">
//               <div className="text-white text-2xl font-medium text-center">
//                 {label.title}
//               </div>
//               <div className="text-stone-300 text-base text-center">
//                 {label.date}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  FaCalendarAlt,
  FaGift,
  FaGlobe,
  FaInstagram,
  FaRocket,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

export default function PresaleSection() {
  const topIcons = [FaGlobe, FaInstagram, FaTwitter, FaTelegramPlane];
  const progressIcons = [FaRocket, FaCalendarAlt, FaGift];
  const progressIconColors = [
    "text-lime-400",
    "text-lime-400",
    "text-lime-400",
  ];
  const progressLabels = [
    { title: "Start Presale", date: "Sept 21, 12:00PM (UTC)" },
    { title: "End Presale", date: "Sept 21, 12:00PM (UTC)" },
    { title: "Claim", date: "Sept 21, 12:00PM (UTC)" },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center mt-8 md:mt-11 px-4 md:px-6 relative">
      {/* Video Container */}
      <div className="w-full max-w-4xl h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl md:rounded-[36px] overflow-hidden relative">
        <video
          className="w-full h-full object-cover"
          src="/public/presale/presale.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Top Icons - outside video container */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 -mt-8 md:-mt-12 z-10">
        {topIcons.map((Icon, index) => (
          <div
            key={index}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 p-3 md:p-4 bg-zinc-500/60 rounded-xl md:rounded-2xl outline outline-2 outline-offset-[-2px] outline-zinc-500 backdrop-blur-sm flex justify-center items-center"
          >
            <Icon className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12" />
          </div>
        ))}
      </div>

      {/* Progress Bar & Icons */}
      <div className="w-full flex flex-col justify-start items-center gap-6 md:gap-8 mt-10 md:mt-16">
        {/* Desktop Progress Bar (hidden on mobile) */}
        <div className="hidden lg:flex w-full max-w-[856px] px-6 py-11 relative justify-between items-center">
          <div className="w-full h-4 bg-zinc-800 border border-zinc-800 rounded-full" />
          <div className="absolute left-0 top-0 w-full flex justify-between items-center px-6">
            {progressIcons.map((Icon, index) => (
              <div
                key={index}
                className="w-24 h-24 p-4 bg-zinc-800 rounded-3xl flex justify-center items-center"
              >
                <Icon className={`${progressIconColors[index]} w-12 h-12`} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Progress Icons (vertical layout) */}
        <div className="flex lg:hidden flex-col gap-8 w-full max-w-md">
          {progressIcons.map((Icon, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 p-3 sm:p-4 bg-zinc-800 rounded-2xl sm:rounded-3xl flex justify-center items-center flex-shrink-0">
                <Icon
                  className={`${progressIconColors[index]} w-8 h-8 sm:w-10 sm:h-10`}
                />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <div className="text-white text-lg sm:text-xl md:text-2xl font-medium">
                  {progressLabels[index].title}
                </div>
                <div className="text-stone-300 text-sm sm:text-base">
                  {progressLabels[index].date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline Labels */}
        <div className="hidden lg:flex w-full max-w-[856px] px-6 justify-between items-start">
          {progressLabels.map((label, index) => (
            <div key={index} className="w-40 flex flex-col items-center gap-4">
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
