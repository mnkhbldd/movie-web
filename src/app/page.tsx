import { NavigationBar, Nowplaying } from "@/components";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="w-full h-full flex flex-col gap-[24px] items-center">
        <NavigationBar />
        <Nowplaying />
      </div>
      <p>Test</p>
    </div>
  );
}
