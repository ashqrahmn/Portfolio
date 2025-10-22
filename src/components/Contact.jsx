import { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { GoArrowRight } from "react-icons/go";

const Contact = ({ isDarkMode }) => {
  const [result, setResult] = useState("");
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const API_KEY = import.meta.env.VITE_WEB3FORM_API_KEY;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateName = (name) => {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every((w) => /^[a-zA-Z'-]{2,}$/.test(w));
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    if (validateName(name)) {
      setNameError(false);
      setResult("");
    }
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    if (validateEmail(email)) {
      setEmailError(false);
      setResult("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!validateName(name)) {
      setNameError(true);
      setResult("Please enter a valid name");
      return;
    } else {
      setNameError(false);
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      setResult("Please enter a valid email address");
      return;
    } else {
      setEmailError(false);
    }

    setResult("Sending...");
    setIsSubmitting(true);

    const formData = new FormData(form);
    formData.append("access_key", API_KEY);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResult(data.message);
      form.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setResult(error.message);
    } finally {
      setIsSubmitting(false);
      if (
        validateEmail(email) &&
        validateName(name) &&
        result !== "Sending..."
      ) {
        setTimeout(() => setResult(""), 5000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 2xl:scroll-mt-34 2xl:py-14 bg-no-repeat bg-center bg-[length:90%_auto]"
      style={{
        backgroundImage: isDarkMode ? "none" : `url(${assets.footer_bg_color})`,
      }}
    >
      {/* Section Title */}
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg 2xl:text-xl font-ovo"
      >
        Connect with me
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl 2xl:text-6xl font-ovo"
      >
        Get in touch
      </motion.h2>

      {/* Section Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-base 2xl:text-lg"
      >
        I'd love to hear from you! If you have any questions, thoughts, or
        feedback, please fill out the form below.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8 2xl:gap-8">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className={`flex-1 p-3 2xl:p-4 outline-none border-[0.5px] rounded-md placeholder:text-gray-400
              ${nameError ? "border-red-500 text-red-500 placeholder:text-red-300" : isDarkMode ? "bg-darkHover border-white/90" : "border-gray-400 bg-white"}`}
            type="text"
            name="name"
            placeholder="Your full name"
            required
            onChange={handleNameChange}
          />
          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className={`flex-1 p-3 2xl:p-4 outline-none border-[0.5px] rounded-md placeholder:text-gray-400
              ${emailError ? "border-red-500 text-red-500 placeholder:text-red-300" : isDarkMode ? "bg-darkHover border-white/90" : "border-gray-400 bg-white"}`}
            type="email"
            name="email"
            placeholder="Your email address"
            required
            onChange={handleEmailChange}
          />
        </div>

        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className={`w-full p-4 2xl:p-5 outline-none border-[0.5px] mb-6 rounded-md placeholder:text-gray-400 resize-none
            ${isDarkMode ? "bg-darkHover border-white/90" : "border-gray-400 bg-white"}`}
          rows="8"
          name="message"
          placeholder="Write your message here..."
          required
        ></motion.textarea>

        {/* Submit Button */}
        <motion.div className="w-max mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            onMouseEnter={() => setIsHoveredOrTouched(true)}
            onMouseLeave={() => setIsHoveredOrTouched(false)}
            onTouchStart={() => {
              setIsHoveredOrTouched(true);
              setTimeout(() => setIsHoveredOrTouched(false), 600);
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`py-3 px-8 2xl:py-4 2xl:px-10 flex items-center justify-between gap-2 text-white rounded-full duration-500 cursor-pointer
              ${isDarkMode ? "bg-transparent border-[0.5px] hover:bg-darkHover" : "bg-darkTheme hover:bg-darkHover/90"} 
              ${isSubmitting && "opacity-50 cursor-not-allowed"}`}
            type="submit"
            disabled={isSubmitting}
          >
            Submit now
            <motion.span
              animate={isHoveredOrTouched ? { x: 40, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ type: "tween", duration: 0.4 }}
              className="flex items-center"
            >
              <GoArrowRight className="text-xl 2xl:text-2xl" aria-label="Arrow right icon" />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Submission Status Message */}
        <p
          className={`mt-4 text-center h-6 2xl:text-lg ${
            result.includes("Sending")
              ? "text-orange-500"
              : result.includes("Successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {result}
        </p>
      </motion.form>
    </motion.div>
  );
};

export default Contact;