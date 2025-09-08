import React from "react";
import Navbar from "./components/screen/Navbar";
import Hero from "./components/screen/Hero";

export default function App() {
  return (
     <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
} 
