"use client";

import { useParams } from "next/navigation";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";

type Credits = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

type MovieTypes = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  crew: Credits[];
};

export const MovieCrew = () => {
  const params = useParams();

  const [Similiar, setSimiliar] = useState<MovieTypes | null>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setSimiliar(res.data || null))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="flex gap-[53px]">
          <p className="text-[16px] font-bold w-[64px]">Director</p>
          {Similiar?.crew?.map((value: any, index: number) => {
            if (value.job === "Director") {
              return (
                <p key={index} className="text-[14px]">
                  {value.name}
                </p>
              );
            }
            return null;
          })}
        </div>

        <Separator />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[53px]">
          <p className="text-[16px] font-bold  w-[64px]">Writers</p>
          {Similiar?.crew
            ?.filter((value: any) => value.known_for_department === "Writing")
            .slice(0, 5)
            .map((value: any, index: number) => (
              <p key={index} className="text-[14px]">
                {value.name}
              </p>
            ))}
        </div>
        <Separator />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[53px]">
          <p className="text-[16px] font-bold  w-[64px]">Stars</p>

          {Similiar?.crew
            ?.filter((value: any) => value.known_for_department === "Acting")
            .slice(0, 5)
            .map((value: any, index: number) => (
              <p key={index} className="text-[14px]">
                {value.name}
              </p>
            ))}
        </div>
        <Separator />
      </div>
    </div>
  );
};
