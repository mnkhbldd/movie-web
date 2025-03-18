import { Features } from "@/components/Features";
import { NavigationBar } from "@/components/NavigationBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="w-full h-full flex flex-col gap-[24px]">
        <NavigationBar />
        <Features />
      </div>
      <p>Hello</p>
    </div>
  );
}
