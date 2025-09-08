import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import clsx from "clsx";
import ThemeToggle from "../screen/Theme"; 

const navLinks = [
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Clients", href: "#" },
  { label: "About", href: "#" },
  { label: "Knowledge", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Work");

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

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
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-black dark:border-white">
              <span className="font-extrabold text-sm dark:text-white">leo9</span>
            </div>
          </a>

          
          <nav className="hidden lg:flex items-center gap-8 relative">
            <ul className="flex items-center gap-6 relative">
              {navLinks.map((l) => (
                <li key={l.label} className="relative">
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
                </li>
              ))}
            </ul>

            <div className="ml-4">
              <ThemeToggle />
            </div>

            <a
              href="#contact"
              className="ml-4 inline-flex items-center gap-2 px-5 py-2 rounded-md bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              Contact
            </a>
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
                    <li key={l.label}>
                      <button
                        onClick={() => {
                          setActive(l.label);
                          setOpen(false);
                        }}
                        className="text-lg font-medium text-gray-800 dark:text-gray-200"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
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
