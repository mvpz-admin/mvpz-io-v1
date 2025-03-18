import { Autocomplete } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { callAPI } from "../../../lib/utils";
import { useRouter } from "next/router";
import Image from "next/image";

const MvpzSearch = ({ onSelect = (data: any) => {}, orgList = [] }) => {
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [list, setList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = (searchKey = "") => {
    if (!searchKey) {
      const result = orgList.slice(0, 5).map((org) => ({
        name: org?.name,
        shortname: org?.shortName,
        location: org?.location,
        image: org?.tribe?.[0]?.tribeLogo,
      }));
      setList(result);
    } else {
      const regex = new RegExp(searchKey, "i");
      const result = orgList
        .filter((org) => {
          return (
            (org?.name && regex.test(org.name)) ||
            (org?.shortName && regex.test(org.shortName)) ||
            (org?.location && regex.test(org.location))
          );
        })
        .map((org) => ({
          name: org?.name,
          shortname: org?.shortName,
          location: org?.location,
          image: org?.tribe?.[0]?.tribeLogo, // Assuming tribeLogo exists in the first tribe
        }));

      setList(result);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [orgList]);

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative  w-[80%]">
      <div className="relative h-[50px] bg-secondary rounded-full overflow-hidden">
        <input
          className="relative z-0 w-full h-full outline-none px-12 placeholder:font-bold"
          placeholder="Enter Organization Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            setShowMenu(true);
          }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-5">
          <FaSearch />
        </div>
      </div>
      {showMenu && list?.length > 0 && (
        <div className="absolute top-[110%]  w-full max-h-[300px] overflow-y-auto bg-secondary rounded-md">
          {list?.map((item, index) => {
            return (
              <div
                className="relative w-full px-4 py-2 flex justify-start items-center gap-4 hover:bg-ternary cursor-pointer"
                key={index + item?.name}
                onClick={() => {
                  onSelect(item);
                }}
              >
                <div className="w-10 h-10 bg-black">
                  {item?.image && (
                    <Image
                      src={item?.image}
                      alt="image"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="w-full">
                  <article className="text-sm">{item?.name}</article>
                  <article className="text-[10px] opacity-50 gap-2">
                    {item?.shortname}
                    <span className="mx-1">.</span>
                    {item?.location}
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MvpzSearch;
