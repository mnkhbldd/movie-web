"use client";
import { Nowplaying, Popular, TopRated, Upcoming } from "@/components";

import * as React from "react";

export default function Home() {
  return (
    <div className="h-auto  w-full flex flex-col items-center gap-[52px] py-[52px]">
      <Nowplaying />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
