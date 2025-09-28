import { useState } from "react";
import { motion } from "framer-motion";
import { workData } from "../assets/assets";
import { GoArrowRight } from "react-icons/go";
import { RiSendPlaneFill } from "react-icons/ri";

const Project = ({ isDarkMode }) => {
  const [tappedIndex, setTappedIndex] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showMoreTapped, setShowMoreTapped] = useState(false);

  const handleCardTap = (index) => {
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 700);
  };

  const toggleShowMore = () => {
    setShowAllProjects((prev) => !prev);
    setShowMoreTapped(true);
    setTimeout(() => setShowMoreTapped(false), 500);
  };

  const visibleProjects = showAllProjects ? workData : workData.slice(0, 4);

  const arrowVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 180 },
    tap: { rotate: 180 },
  };

  return (
    <motion.div
      id="projects"
      className="w-full px-[12%] py-10 scroll-mt-20 2xl:scroll-mt-28 2xl:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Section Title */}
      <motion.h4
        className="text-center mb-2 text-lg 2xl:text-xl font-ovo"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        My Portfolio
      </motion.h4>
      <motion.h2
        className="text-center text-5xl 2xl:text-6xl font-ovo"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        My latest project
      </motion.h2>

      {/* Section Description */}
      <motion.p
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-base 2xl:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Welcome to my portfolio. Here you'll find projects that reflect what
        I've learned, built, and enjoyed working on.
      </motion.p>

      {/* Projects Grid */}
      <motion.div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-10 gap-5 2xl:gap-8 ${
          isDarkMode ? "text-black" : ""
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {visibleProjects.map((project, index) => {
          const isTapped = tappedIndex === index;
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              key={index}
              className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group 2xl:rounded-xl"
              style={{ backgroundImage: `url(${project.bgImage})` }}
              onTouchStart={() => handleCardTap(index)}
              onClick={() => handleCardTap(index)}
            >
              <div
                className={`bg-white w-10/12 rounded-md absolute left-1/2 py-3 px-5 2xl:py-4 2xl:px-6 flex items-center justify-between
                  transition-all duration-500 ${
                    isTapped ? "bottom-7 2xl:bottom-10" : "bottom-5 2xl:bottom-8"
                  } -translate-x-1/2 group-hover:bottom-7 shadow`}
              >
                <div>
                  <h2 className="font-semibold 2xl:text-xl">{project.title}</h2>
                  <p className="text-sm 2xl:text-base text-gray-700">
                    {project.description}
                  </p>
                </div>

                <div
                  className={`border rounded-full border-black w-9 2xl:w-12 aspect-square flex items-center justify-center
                    shadow-[2px_2px_0_#000] transition group-hover:bg-lime-300 ${
                      isTapped ? "bg-lime-300" : ""
                    }`}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiSendPlaneFill className="text-lg 2xl:text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Show More/Less Button */}
      {workData.length > 4 && (
        <motion.button
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.3 }}
          onClick={toggleShowMore}
          onTouchStart={() => setShowMoreTapped(true)}
          className={`w-max flex items-center justify-center gap-2 border-[0.5px] rounded-full py-3 px-10 2xl:py-4 2xl:px-12 mx-auto mt-6 sm:mt-8 lg:mt-10 mb-20 duration-500 cursor-pointer
            ${
              isDarkMode
                ? "hover:bg-darkHover border-white text-white"
                : "hover:bg-lightHover border-gray-700"
            }
            active:scale-95 ${
              showMoreTapped
                ? isDarkMode
                  ? "bg-darkHover"
                  : "bg-lightHover"
                : ""
            }`}
        >
          {showAllProjects ? "See Less" : "Show More"}

          <motion.span
            variants={arrowVariants}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <GoArrowRight className="text-xl 2xl:text-2xl" aria-label="Arrow right icon" />
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Project;