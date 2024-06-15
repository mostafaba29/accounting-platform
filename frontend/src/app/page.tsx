"use client";
import Image from "next/image";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import OurVision from "@/components/LandingPage/OurVision";
export default function Home() {
  return (
    <main >
      <NavigationBar />
      <OurVision />
      <Footer />
    </main>
  );
}
