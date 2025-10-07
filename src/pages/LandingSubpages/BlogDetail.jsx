import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articles } from "../../components/LandingPage/data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = articles.find((item) => String(item.id) === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <p className="text-xl font-medium text-center">Blog not found.</p>
      </div>
    );
  }

  const currentIndex = articles.findIndex((item) => String(item.id) === id);

  const goToBlog = (index) => {
    if (index >= 0 && index < articles.length) {
      navigate(`/blog/${articles[index].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      <title>{blog.metaTitle || blog.title}</title>
      <meta
        name="description"
        content={blog.metaDescription || blog.description}
      />
      <meta name="keywords" content={blog.metaKeywords || ""} />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-['DM_Sans']">
            {blog.title}
          </h1>
          <p className="text-gray-400 mt-2 font-['Manrope']">{blog.date}</p>
        </div>

        <div className="mb-10 font-['DM_Sans']">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 md:h-[30rem] object-cover rounded-lg shadow-md"
          />
        </div>

        {blog.projects?.map((project, idx) => (
          <div key={idx} className="mb-6 space-y-0 font-['Manrope']">
            <p className="text-white mt-2 font-['Manrope']">
              {project.introduction}
            </p>
            <h2 className="text-2xl font-semibold text-white">
              {project.name}
            </h2>
            <p className="italic text-gray-400">{project.category}</p>

            {project.paragraph && (
              <ul className=" list-inside">
                {project.paragraph.split("\n").map((line, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </ul>
            )}

            {project.description && (
              <ul className=" list-inside space-y-0 text-white">
                {project.description.split("\n").map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            )}

             {project.link && (
              <p className="mt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#007bff] font-medium underline hover:text-white"
                >
                  {project.link}
                </a>
              </p>
            )}

            {project.whyHot && (
              <ul className=" list-inside text-white/90 space-y-0 font-medium">
                {project.whyHot.split("\n").map((line, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </ul>
            )}

            {project.additionalNotes && (
              <p className="text-sm text-white/70">
                Note: {project.additionalNotes}
              </p>
            )}
          </div>
        ))}

        {blog.projects?.map(
          (p, idx) =>
            p.heading &&
            p.text && (
              <div key={`heading-${idx}`} className="space-y-4 mb-12">
                <h3 className="text-2xl font-bold">{p.heading}</h3>
                <p className="text-white/80 whitespace-pre-line">{p.text}</p>

                {p.heading1 && p.text1 && (
                  <>
                    <h3 className="text-2xl font-bold mt-6">{p.heading1}</h3>
                    <p className="text-white/80">{p.text1}</p>
                  </>
                )}
              </div>
            )
        )}

        <div className="flex justify-between mt-10 gap-4">
          <button
            onClick={() => goToBlog(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="px-4 py-2 border rounded text-white hover:text-[#CCFF00] hover:border-[#CCFF00] disabled:opacity-30"
          >
            ← Previous
          </button>
          <button
            onClick={() => goToBlog(currentIndex + 1)}
            disabled={currentIndex === articles.length - 1}
            className="px-4 py-2 border rounded text-white hover:text-[#CCFF00] hover:border-[#CCFF00] disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
