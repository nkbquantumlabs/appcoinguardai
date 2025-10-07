import React, { useState, useRef, useEffect } from "react";
import { articles } from "../../components/LandingPage/data/blogs";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => (
  <div className="relative bg-white/5 border border-transparent rounded-lg shadow-sm hover:border-white/20 transition-all duration-300 group overflow-hidden flex flex-col h-full">
   
    <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/0 group-hover:via-white/5 group-hover:to-white/10 transition-all duration-500 pointer-events-none"></div>

   
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-[#CCFF00] rounded-tl-md transition-all duration-300"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-[#CCFF00] rounded-tr-md transition-all duration-300"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-[#CCFF00] rounded-bl-md transition-all duration-300"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-[#CCFF00] rounded-br-md transition-all duration-300"></div>

    <Link to={`/blog/${article.id}`}>
      <img className="rounded-t-lg w-full h-48 object-cover" src={article.image} alt={article.title} />
    </Link>
    <div className="p-5 flex flex-col flex-grow">
      <p className="text-xs text-gray-400 mb-1 font-['Manrope']">{article.date}</p>
      <Link to={`/blog/${article.id}`}>
        <h5 className="mb-3 text-2xl font-bold tracking-tight font-['DM_Sans'] text-white">
          {article.title}
        </h5>
      </Link>
      <p className="mb-6 font-normal font-['Manrope'] text-white/70">
        {article.description}
      </p>
      <div className="mt-auto font-['Manrope']">
        <Link
          to={`/blog/${article.id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white group-hover:text-[#CCFF00] transition-colors duration-300 border border-white/20 rounded-full group-hover:border-[#CCFF00]/50"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2 group-hover:stroke-[#CCFF00] transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

const ViewMoreButton = () => (
  <div className="mt-6 flex justify-center mb-8">
    <div className="relative group">
      <button className="px-8 py-3 bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300">
        <Link target="_blank" to="https://blog.coinguard.ai/">
          View More
        </Link>
      </button>
      {/* Square corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#CCFF00] transition-all duration-300"></div>
    </div>
  </div>
);

const BlogList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const cardWidth = scrollContainerRef.current.scrollWidth / articles.length;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20 text-white font-['DM_Sans']">
        Latest Updates
      </h2>

      {/* Mobile View */}
      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx="true">{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="relative w-[calc(100vw-32px)] flex-shrink-0 snap-center px-2"
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-4">
          {articles.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === activeIndex ? "bg-[#CCFF00]" : "bg-white"
              }`}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth =
                    scrollContainerRef.current.scrollWidth / articles.length;
                  scrollContainerRef.current.scrollTo({
                    left: cardWidth * index,
                    behavior: "smooth",
                  });
                }
              }}
            />
          ))}
        </div>

        <ViewMoreButton />
      </div>

      {/* Tablet View */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        {articles.slice(0, 2).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        <div className="col-span-2">
          <ArticleCard article={articles[2]} />
          <ViewMoreButton />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="hidden lg:block">
        <ViewMoreButton />
      </div>
    </div>
  );
};

export default BlogList;