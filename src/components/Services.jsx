import { useState } from "react";
import { motion } from "framer-motion";
import { serviceData } from "../assets/assets";
import { GoArrowRight } from "react-icons/go";

const Services = ({ isDarkMode }) => {
  const [tappedIndex, setTappedIndex] = useState(null);

  const handleTap = (index) => {
    setTappedIndex(index);
    setTimeout(() => setTappedIndex(null), 600);
  };

  return (
    <motion.div
      id="services"
      className="w-full px-[12%] py-10 pb-20 scroll-mt-20 2xl:scroll-mt-38 2xl:pb-40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Section Title */}
      <motion.h4
        className="text-center mb-2 text-lg 2xl:text-xl font-ovo"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        what I offer
      </motion.h4>
      <motion.h2
        className="text-center text-5xl 2xl:text-6xl font-ovo"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        My Services
      </motion.h2>

      {/* Section Description */}
      <motion.p
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-base 2xl:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        I am a full stack web developer and designer. I build projects that are
        clear, practical and made to work smoothly for people.
      </motion.p>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-auto gap-6 2xl:gap-8 my-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {serviceData.map(({ icon, title, description, link }, index) => {
          const isTapped = tappedIndex === index;

          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              key={index}
              onTouchStart={() => handleTap(index)}
              onClick={() => handleTap(index)}
              className={`border-[0.5px] rounded-xl p-6 2xl:p-8 cursor-pointer transition duration-500 transform
                ${
                  isTapped
                    ? `${
                        !isDarkMode
                          ? "bg-lightHover -translate-y-1 shadow-black"
                          : "bg-darkHover/70 -translate-y-1 shadow-white"
                      }`
                    : ""
                }
                ${
                  !isDarkMode
                    ? "border-gray-400 hover:-translate-y-1 hover:bg-lightHover hover:shadow-black"
                    : "border-white hover:-translate-y-1 hover:bg-darkHover hover:shadow-white"
                }`}
            >
              <img
                src={icon}
                alt={`${title} service icon`}
                className="w-10 2xl:w-12"
              />

              <h3
                className={`text-lg 2xl:text-xl my-4 ${
                  !isDarkMode ? "text-gray-700" : "text-white"
                }`}
              >
                {title}
              </h3>

              <p
                className={`text-sm 2xl:text-base leading-5 ${
                  !isDarkMode ? "text-gray-600" : "text-white/80"
                } line-clamp-2`}
              >
                {description}
              </p>

              <a
                href={link}
                className="flex items-center gap-2 text-sm 2xl:text-base mt-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
                <GoArrowRight
                  className="text-base 2xl:text-lg"
                  aria-label="Arrow right icon"
                />
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Services;
