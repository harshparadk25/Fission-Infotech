import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import clsx from "clsx";
import ThemeToggle from "../screen/Theme";

const navLinks = [
  { label: "Work", href: "#" },
  { label: "Services", href: "#", dropdown: "services" },
  { label: "Clients", href: "#" },
  { label: "About", href: "#", dropdown: "about" },
  { label: "Knowledge", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Work");
  const [dropdown, setDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const dropdownRef = useRef(null);

 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  
  const dropdownContent = {
    services: [
      { title: "Design.", desc: "Handcraft the user experience.", bg: "bg-pink-100", hover: "hover:bg-pink-200" },
      { title: "Technology.", desc: "Leverage the power of code.", bg: "bg-blue-100", hover: "hover:bg-blue-200" },
      { title: "Marketing.", desc: "Creative strategies for brands.", bg: "bg-purple-100", hover: "hover:bg-purple-200" },
    ],
    about: [
      { title: "About Us.", desc: "We are super passionate about what we do.", bg: "bg-pink-100", hover: "hover:bg-pink-200" },
      { title: "Team.", desc: "We are a diverse group of individuals.", bg: "bg-blue-100", hover: "hover:bg-blue-200" },
      { title: "Career.", desc: "Can you offer such experience?", bg: "bg-purple-100", hover: "hover:bg-purple-200" },
    ],
  };

  const renderDropdown = (type, isMobile = false) => (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 10 }}
  transition={{ duration: 0.25 }}
  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-auto max-w-[90vw] flex gap-6 p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-40"
>
  {dropdownContent[type].map((item) => (
    <div key={item.title} className={clsx("p-4 rounded-lg transition flex-1 min-w-[180px]", item.bg, item.hover)}>
      <h3 className="font-bold text-lg text-gray-800 dark:text-black">{item.title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-900">{item.desc}</p>
      <span className="block mt-2 text-gray-800 dark:text-gray-900">→</span>
    </div>
  ))}
</motion.div>

  );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur"
          : "bg-transparent border-b border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-black dark:border-white">
              <span className="font-extrabold text-sm dark:text-white">leo9</span>
            </div>
          </a>

          
          <nav className="hidden lg:flex items-center gap-8 relative" ref={dropdownRef}>
            <ul className="flex items-center gap-6 relative">
              {navLinks.map((l) => (
                <li
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(l.dropdown || null)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button
                    onClick={() => setActive(l.label)}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white relative"
                  >
                    {l.label}
                    {active === l.label && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 -bottom-1 h-[2px] w-full bg-black dark:bg-white"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </button>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {l.dropdown && dropdown === l.dropdown && renderDropdown(l.dropdown)}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

           
            <div className="ml-4 flex items-center gap-4">
              <ThemeToggle />
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Contact
              </a>
            </div>
          </nav>

         
          <div className="lg:hidden">
            <button
              className="p-2 inline-flex items-center justify-center rounded-md"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {!open ? <FiMenu size={22} /> : <FiX size={22} />}
            </button>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="lg:hidden"
          >
            <div className="bg-white dark:bg-gray-900 w-full border-t border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="px-6 py-6 space-y-4">
                <ul className="flex flex-col gap-3">
                  {navLinks.map((l) => (
                    <li key={l.label} className="flex flex-col relative">
                      <button
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === l.dropdown ? null : l.dropdown)
                        }
                        className="text-lg font-medium text-gray-800 dark:text-gray-200 flex justify-between items-center w-full"
                      >
                        {l.label}
                        {l.dropdown && <span>{mobileDropdown === l.dropdown ? "▲" : "▼"}</span>}
                      </button>

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {l.dropdown && mobileDropdown === l.dropdown && renderDropdown(l.dropdown, true)}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-4">
                  <ThemeToggle />
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
