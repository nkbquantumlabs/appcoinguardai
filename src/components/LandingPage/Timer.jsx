import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CountdownTimer = ({ targetDate, endDate, title, description, gifSrc, isFirstSlide }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [endTimeLeft, setEndTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCountdown = () => {
      if (!isFirstSlide) {
        const targetTime = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
          setTimeLeft({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
          });
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        });
      }
    };

    const updateEndCountdown = () => {
      if (!endDate) return;
      const endTime = new Date(endDate).getTime();
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setEndTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setEndTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    updateCountdown();
    updateEndCountdown();
    const timer = setInterval(() => {
      updateCountdown();
      updateEndCountdown();
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, endDate, isFirstSlide]);

  const renderTitle = () => {
    if (title.includes("PREBUYING")) {
      const parts = title.split("ROUND");
      return (
        <>
          <span className="text-[#ccff00]">PREBUYING</span>
          <span className="text-white"> ROUND{parts[1]}</span>
        </>
      );
    } else if (title === "APP LAUNCH") {
      return (
        <>
          <span className="text-[#ccff00]">APP</span>
          <span className="text-white"> LAUNCH</span>
        </>
      );
    } else if (title.includes("ROUND 2")) {
      return <span className="text-white">{title}</span>;
    } else if (title.includes("OFFICIAL TOKEN LAUNCH")) {
      return (
        <>
          <span className="text-[#ccff00]">OFFICIAL</span>
          <span className="text-white"> TOKEN LAUNCH</span>
        </>
      );
    }
    return <span className="text-[#ccff00]">{title}</span>;
  };

  return (
    <div className="flex items-center justify-center py-6 px-0 sm:px-4 h-full min-h-[450px] w-full">
      <div className="w-[94%] sm:w-full max-w-[1150px] mx-auto">
        <div className="relative group border border-gray-700 hover:border-[#ccff00]/50 transition-all duration-300 p-4 sm:p-6 md:p-6 rounded-none flex flex-col md:flex-row items-center gap-6 lg:gap-8 h-[450px] sm:h-[520px] md:h-[560px] lg:h-[450px] w-full">
          {/* Corner borders */}
          {[
            'top-0 left-0 border-t border-l',
            'top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l',
            'bottom-0 right-0 border-b border-r'
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 border-gray-500 group-hover:border-[#ccff00] transition-all duration-300 ${pos}`}
            />
          ))}

          {/* Left GIF */}
          <div className="w-full md:w-[35%] flex justify-center order-2 md:order-none">
            <img
              src={gifSrc}
              alt="Countdown Animation"
              className="w-[80px] min-[350px]:w-[120px] sm:w-[140px] md:w-[160px] lg:w-[220px] xl:w-[240px] h-auto object-contain"
            />
          </div>

          {/* Right Text Content */}
          <div className="w-full md:w-[65%] flex justify-end order-1 md:order-none">
            <div className="w-full max-w-[600px] text-center md:text-left ml-auto p-3 sm:p-4 md:p-6 lg:p-6 rounded-xl md:backdrop-blur-md md:bg-white/5 md:border md:border-white/10 md:shadow-[0_0_40px_#ffffff15] flex flex-col justify-between h-full">
              <div>
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-3 lg:mb-5">
                  {renderTitle()}
                </h1>

                {isFirstSlide ? (
                  <div className="mb-4">
                    <div className="text-[#ccff00] text-xs sm:text-sm font-mono tracking-widest mb-2">
                      PREBUY SALE ENDS IN
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 mb-4">
                      <div className="flex justify-center lg:justify-start items-baseline gap-1 sm:gap-2 mb-4 lg:mb-0">
                        {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
                          <React.Fragment key={unit}>
                            {idx !== 0 && (
                              <div className="text-[#ccff00] text-xl sm:text-2xl pb-2">:</div>
                            )}
                            <div className="text-center min-w-[40px] sm:min-w-[50px]">
                              <div className="text-[#ccff00] text-3xl sm:text-4xl xl:text-5xl font-bold">
                                {endTimeLeft[unit]}
                              </div>
                              <div className="text-gray-400 text-xs sm:text-sm mt-1">
                                {unit.toUpperCase()}
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                      <a
                        href="https://app.coinguard.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full lg:w-auto max-w-[900px]:w-full max-w-[900px]:text-center lg:mt-0 inline-block bg-[#ccff00] text-black font-bold py-2 px-6 rounded-full hover:bg-[#b3e600] transition-all duration-300 text-sm sm:text-base text-center"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2">
                      <span className="text-[#ccff00] text-xs sm:text-sm font-mono tracking-widest">
                        {timeLeft.days === '00' && timeLeft.hours === '00' &&
                        timeLeft.minutes === '00' && timeLeft.seconds === '00'
                          ? 'EVENT STARTED'
                          : 'STARTS IN'}
                      </span>
                    </div>
                    <div className="flex justify-center md:justify-start items-baseline gap-1 sm:gap-2 mb-4">
                      {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
                        <React.Fragment key={unit}>
                          {idx !== 0 && (
                            <div className="text-[#ccff00] text-xl sm:text-2xl pb-2">:</div>
                          )}
                          <div className="text-center min-w-[40px] sm:min-w-[50px]">
                            <div className="text-[#ccff00] text-3xl sm:text-4xl xl:text-5xl font-bold">
                              {timeLeft[unit]}
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm mt-1">
                              {unit.toUpperCase()}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <p className="text-gray-300 text-xs sm:text-sm lg:text-base">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreBuyingLaunch = () => {
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const phases = [
    {
      id: 1,
      title: "PREBUYING ROUND 1",
      targetDate: "2025-06-25T19:30:00",
      endDate: "2025-08-25T23:59:59",
      description: "From June 25 to August 25, 2025, users can buy CGT tokens at the initial presale rate via our official website. Funds may be used for platform development, security, and ecosystem expansion.",
      gifSrc: "/elements/cg.gif"
    },
    {
      id: 2,
      title: "APP LAUNCH",
      targetDate: "2025-08-05T00:00:00",
      description: "On August 5, 2025, the Coinguard mobile app goes live on Google Play Store and Apple App Store Features: Scam alerts, wallet scanner, contract analysis, and portfolio tracking.",
      gifSrc: "/elements/app.gif"
    },
    {
      id: 3,
      title: "PREBUYING ROUND 2",
      targetDate: "2025-09-06T00:00:00",
      description: "From September 6 to September 30, 2025, the second presale round begins with limited token allocation. You can consider increasing the token price slightly to create upward momentum.",
      gifSrc: "/elements/cg.gif"
    },
    {
      id: 4,
      title: "OFFICIAL TOKEN LAUNCH",
      targetDate: "2025-10-10T00:00:00",
      description: "On October 10, 2025, CGT becomes tradable on public Solana-based DEXs, such as Jupiter, Raydium, or Orca. Liquidity will be added & Token transfers will be fully enabled.",
      gifSrc: "/elements/launch.gif"
    }
  ];

  return (
    <div className="relative bg-black w-full overflow-hidden py-8">
      <div className="relative w-[98%] sm:w-full max-w-[1400px] mx-auto px-0 sm:px-4 md:px-6 lg:px-8">
        {/* Navigation arrows - hidden on mobile */}
        {!isMobile && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 z-10 -translate-y-1/2 bg-black/70 hover:bg-[#ccff00]/20 text-white hover:text-[#ccff00] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-[#ccff00]/50"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 z-10 -translate-y-1/2 bg-black/70 hover:bg-[#ccff00]/20 text-white hover:text-[#ccff00] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-[#ccff00]/50"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <Swiper
          modules={[Pagination, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active'
          }}
          spaceBetween={50}
          slidesPerView={1}
          className="!overflow-visible"
        >
          {phases.map((phase, index) => (
            <SwiperSlide key={phase.id} className="!h-auto">
              <CountdownTimer
                targetDate={phase.targetDate}
                endDate={phase.endDate}
                title={phase.title}
                description={phase.description}
                gifSrc={phase.gifSrc}
                isFirstSlide={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="custom-pagination flex justify-center gap-1 mt-6 mb-2" />
      </div>

      {/* Fixed style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-bullet {
            width: 6px;
            height: 6px;
            background: #333;
            border-radius: 50%;
            display: inline-block;
            margin: 0 3px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .custom-bullet-active {
            background: #ccff00;
            transform: scale(1.2);
          }
          .swiper-button-disabled {
            opacity: 0.3;
            cursor: not-allowed;
            pointer-events: none;
          }
          .swiper-slide {
            height: auto !important;
          }
        `
      }} />
    </div>
  );
};

export default PreBuyingLaunch;