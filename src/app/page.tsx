"use client";
import {
  Footer,
  NavigationBar,
  Nowplaying,
  Popular,
  TopRated,
  Upcoming,
} from "@/components";
// Removed unused import
import { useState } from "react";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function Home() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [mockData, setMockData] = useState<{ name: string }[]>([]);

  const handleOnChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleIsHidden = () => {
    setIsHidden(!isHidden);
    // console.log("clicked");
  };

  const IncreaseNumber = () => {
    setCount(count + 1);
  };

  const addData = () => {
    let newTasks = [...mockData, { name: inputValue }];
    setMockData(newTasks);
  };

  const deleteData = (index: number) => {
    setMockData(mockData.filter((_, i) => i !== index));
  };

  const [position, setPosition] = React.useState("bottom");

  return (
    <div className="h-auto  w-full flex flex-col items-center gap-[52px] py-[52px]">
      <Nowplaying />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
// 1. Counter button shows number
// 2. Input input text solih
// 3. Toggle button text hide or visible
// 4. Input counter
// 5. Todolist input add button shows below
