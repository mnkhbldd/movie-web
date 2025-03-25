import {
  Footer,
  NavigationBar,
  Nowplaying,
  Popular,
  TopRated,
  Upcoming,
} from "@/components";

export default function Home() {
  return (
    <div className="h-auto  w-full flex flex-col items-center gap-[52px] py-[52px]">
      {/* <NavigationBar /> */}
      <Nowplaying />
      <Upcoming />
      <Popular />
      <TopRated />
      {/* <Footer /> */}
    </div>
  );
}
