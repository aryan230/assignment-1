import Hero from "@/components/Hero";
import Todos from "@/components/Todos";
import { useState } from "react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Hero />
    </div>
  );
}
