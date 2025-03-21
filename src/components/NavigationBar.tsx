"use client";
import { Button } from "@/components/ui/button";
// import { ArrowDown, ArrowRight, Moon, Search } from "lucide-react";

import * as dropdownMenu from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { ArrowDown, ArrowRight, Moon, Search } from "lucide-react";
import { SearchMovie } from "./SearchMovie";
import { Separator } from "./ui/separator";

type movieGenresType = {
  id: number;
  name: string;
};

export const NavigationBar = () => {
  const [movieGenres, setmovieGenres] = useState<movieGenresType[]>([]);

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setmovieGenres(res.data.genres || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="flex h-[59px] w-full">
      <div className="flex items-center px-4 justify-between w-full">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M5.83366 2.1665V18.8332M14.167 2.1665V18.8332M1.66699 10.4998H18.3337M1.66699 6.33317H5.83366M1.66699 14.6665H5.83366M14.167 14.6665H18.3337M14.167 6.33317H18.3337M3.48366 2.1665H16.517C17.5203 2.1665 18.3337 2.97985 18.3337 3.98317V17.0165C18.3337 18.0198 17.5203 18.8332 16.517 18.8332H3.48366C2.48034 18.8332 1.66699 18.0198 1.66699 17.0165V3.98317C1.66699 2.97985 2.48034 2.1665 3.48366 2.1665Z"
              stroke="#4338CA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[16px] text-[#4338CA] font-bold">Movie Z</p>
        </div>
        <div className="flex gap-3 items-center">
          <dropdownMenu.DropdownMenu>
            <dropdownMenu.DropdownMenuTrigger className="bg-white text-black text-[14px] rounded-[6px] font-medium flex items-center gap-2 border px-4 py-2">
              <ArrowDown />
              Genre
            </dropdownMenu.DropdownMenuTrigger>
            <dropdownMenu.DropdownMenuContent className="w-[577px] p-10">
              <dropdownMenu.DropdownMenuLabel className="text-[24px] font-semibold">
                Genres
              </dropdownMenu.DropdownMenuLabel>
              <dropdownMenu.DropdownMenuLabel className="text-[16px] font-normal">
                See lists of movies by genre
              </dropdownMenu.DropdownMenuLabel>
              <dropdownMenu.DropdownMenuSeparator />
              <div className="flex gap-4 pt-4 w-full flex-wrap">
                {movieGenres.map((value) => (
                  <Badge key={value.id} variant="outline">
                    {value.name} <ArrowRight />{" "}
                  </Badge>
                ))}
              </div>
            </dropdownMenu.DropdownMenuContent>
          </dropdownMenu.DropdownMenu>

          <div className="flex items-center px-3 py-2 border rounded-[8px] w-[355px] gap-2.5 focus:border-pink-600 focus:ring-0 ">
            <Search className="stroke-1" />
            <input
              onChange={handleInputValue}
              placeholder="Search..."
              className="border-none shadow-none p-0 h-[20px] outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col h-fit w-fit absolute top-[100px] z-40 p-3 bg-white rounded-[8px]">
            <SearchMovie inputValue={inputValue} />
          </div>
        </div>

        <div className="border w-[36px] h-[36px] flex items-center justify-center rounded-[10px]">
          <Moon className="stroke-1" />
        </div>
      </div>
    </div>
  );
};
