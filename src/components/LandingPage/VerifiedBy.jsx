import { useEffect, useRef, useState } from "react";

function VerifiedBy() {
  const partners = [
    {
      image: "/LandingPage/verified/1.png",
      link: "https://www.binance.com/en/square/profile/coinguardai",
    },
    {
      image: "/LandingPage/verified/2.png",
      link: "https://blog.coinguard.ai/",
    },
    {
      image: "/LandingPage/verified/3.png",
      link: "https://www.publish0x.com/@Coinguard",
    },
    {
      image: "/LandingPage/verified/4.png",
      link: "https://x.com/Coinguard_AI/articles",
    },
  ];

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current?.querySelector(".carousel-inner");

    const handleScroll = () => {
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20 text-white">
          Our Articles
        </h2>

        {/* Mobile View: Carousel */}
        <div className="block sm:hidden" ref={scrollRef}>
          <div className="-mx-4">
            <div
              className="carousel-inner flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style jsx="true">{`
                .carousel-inner::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="snap-center flex-shrink-0 w-full px-2"
                >
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 border border-white/10 rounded-xl h-32 flex items-center justify-center shadow-md transition-all duration-300 hover:border-[#CCFF00]/50 hover:shadow-[0_0_15px_#CCFF00]/50"
                  >
                    <div className="aspect-w-16 aspect-h-9 w-full max-w-[160px]">
                      <img
                        src={partner.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3 mb-[-60px] sm:mb-0">
            {partners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container =
                    scrollRef.current?.querySelector(".carousel-inner");
                  if (container) {
                    const cardWidth = container.offsetWidth;
                    container.scrollTo({
                      left: idx * cardWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-[#CCFF00]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tablet & Desktop View: Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 justify-center gap-5 sm:gap-6 md:gap-8 place-items-center mt-6">
          {partners.map((partner, idx) => (
            <a
              href={partner.link}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 w-full max-w-[220px] h-32 flex items-center justify-center shadow-md transition-all duration-300 hover:border-[#CCFF00]/50 hover:shadow-[0_0_15px_#CCFF00]/50"
            >
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={partner.image}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VerifiedBy;
