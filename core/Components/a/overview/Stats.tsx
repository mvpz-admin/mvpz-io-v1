import React from "react";
import SelectField from "../../../Atoms/Inputs/SelectFeild";

let filterOptions = [
    {
      label: "Batting",
      id: "BATTING",
    },
    {
      label: "Bowling",
      id: "BOWLING",
    },
    {
      label: "Fielding",
      id: "FIELDING",
    },
    {
      label: "All Rounder",
      id: "ALL_ROUNDER",
    },
  ];

  let leagueOptions = [
    {
      label: "T20 International",
      id: "T20I",
    },
    {
      label: "One Day International",
      id: "ODI",
    },
    {
      label: "Indian Premier League",
      id: "IPL",
    },
    {
      label: "Big Bash League",
      id: "BBL",
    },
    {
      label: "Pakistan Super League",
      id: "PSL",
    },
    {
      label: "Caribbean Premier League",
      id: "CPL",
    },
    {
      label: "The Hundred",
      id: "THE_HUNDRED",
    },
    {
      label: "Major League Cricket",
      id: "MLC",
    },
    {
      label: "Bangladesh Premier League",
      id: "BPL",
    },
    {
      label: "County Championship",
      id: "COUNTY",
    }
  ];
  

const StatsTable = ({ title, data }) => {
  return (
    <div className="space-y-2">
      <article className="text-base font-inter font-semibold text-white text-[10px] px-5">
        {title}
      </article>
      <table className="stats-table w-full text-sm text-left rounded-lg font-inter text-[10px] ">
        <thead className="bg-white bg-opacity-10 rounded-lg">
          <tr>
            <th className="p-2 px-4 border"></th>
            <th className="p-2 px-4 border">Span</th>
            <th className="p-2 border">Mat</th>
            <th className="p-2 border">Inns</th>
            <th className="p-2 border">NO</th>
            <th className="p-2 border">Runs</th>
            <th className="p-2 border">HS</th>
            <th className="p-2 border">Avg</th>
            <th className="p-2 border">BF</th>
            <th className="p-2 border">SR</th>
            <th className="p-2 border">100s</th>
            <th className="p-2 border">50s</th>
            <th className="p-2 border">0s</th>
            <th className="p-2 border">4s</th>
            <th className="p-2 border">6s</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {Object.values(row).map((val: string | number, colIdx) => (
                  <td
                    key={colIdx}
                    className={`p-2 ${
                      colIdx === 0 && "px-4"
                    } border font-semibold`}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              {Object.values(data).map((val: string | number, idx) => (
                <td
                  key={idx}
                  className={`p-2 ${idx === 0 && "px-4"} border font-semibold`}
                >
                  {val}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Stats = () => {
  const statsData = {
    overview: {
      team: "overview",
      span: "2011-2025",
      mat: 123,
      inns: 210,
      no: 13,
      runs: 9230,
      hs: "254*",
      avg: 46.85,
      bf: 16608,
      sr: 55.57,
      hundreds: 30,
      fifties: 31,
      ducks: 15,
      fours: 1027,
      sixes: 30,
    },
    teams: [
      {
        team: "Australia",
        span: "2011-2025",
        mat: 30,
        inns: 53,
        no: 2,
        runs: 2232,
        hs: 186,
        avg: 43.76,
        bf: 4292,
        sr: 52.0,
        hundreds: 9,
        fifties: 5,
        ducks: 3,
        fours: 242,
        sixes: 7,
      },
      {
        team: "Bangladesh",
        span: "2015-2024",
        mat: 8,
        inns: 13,
        no: 2,
        runs: 536,
        hs: 204,
        avg: 48.72,
        bf: 748,
        sr: 71.65,
        hundreds: 2,
        fifties: 0,
        ducks: 1,
        fours: 59,
        sixes: 2,
      },
      {
        team: "England",
        span: "2012-2022",
        mat: 28,
        inns: 50,
        no: 3,
        runs: 1991,
        hs: 235,
        avg: 42.36,
        bf: 3824,
        sr: 52.06,
        hundreds: 5,
        fifties: 9,
        ducks: 6,
        fours: 235,
        sixes: 2,
      },
    ],
    hostCountry: [
      {
        team: "In Australia",
        span: "2011-2025",
        mat: 18,
        inns: 34,
        no: 1,
        runs: 1542,
        hs: 169,
        avg: 46.72,
        bf: 2940,
        sr: 52.44,
        hundreds: 7,
        fifties: 4,
        ducks: 2,
        fours: 166,
        sixes: 5,
      },
      {
        team: "In Bangladesh",
        span: "2015-2022",
        mat: 3,
        inns: 5,
        no: 1,
        runs: 59,
        hs: 24,
        avg: 14.75,
        bf: 151,
        sr: 39.07,
        hundreds: 0,
        fifties: 0,
        ducks: 0,
        fours: 5,
        sixes: 0,
      },
      {
        team: "In England",
        span: "2014-2023",
        mat: 17,
        inns: 33,
        no: 0,
        runs: 1096,
        hs: 149,
        avg: 33.21,
        bf: 2111,
        sr: 51.91,
        hundreds: 2,
        fifties: 5,
        ducks: 4,
        fours: 129,
        sixes: 1,
      },
      {
        team: "In India",
        span: "2011-2024",
        mat: 55,
        inns: 87,
        no: 9,
        runs: 4336,
        hs: "254*",
        avg: 55.58,
        bf: 7311,
        sr: 59.3,
        hundreds: 14,
        fifties: 13,
        ducks: 7,
        fours: 474,
        sixes: 16,
      },
      {
        team: "In New Zealand",
        span: "2014-2020",
        mat: 4,
        inns: 8,
        no: 1,
        runs: 252,
        hs: "105*",
        avg: 36.0,
        bf: 438,
        sr: 57.53,
        hundreds: 1,
        fifties: 1,
        ducks: 0,
        fours: 38,
        sixes: 1,
      },
      {
        team: "In South Africa",
        span: "2013-2024",
        mat: 9,
        inns: 18,
        no: 0,
        runs: 891,
        hs: 153,
        avg: 49.5,
        bf: 1649,
        sr: 54.03,
        hundreds: 2,
        fifties: 4,
        ducks: 0,
        fours: 117,
        sixes: 3,
      },
      {
        team: "In Sri Lanka",
        span: "2015-2017",
        mat: 6,
        inns: 10,
        no: 1,
        runs: 394,
        hs: "103*",
        avg: 43.77,
        bf: 707,
        sr: 55.72,
        hundreds: 2,
        fifties: 1,
        ducks: 0,
        fours: 34,
        sixes: 2,
      },
      {
        team: "In West Indies",
        span: "2011-2023",
        mat: 11,
        inns: 15,
        no: 0,
        runs: 660,
        hs: 200,
        avg: 44.0,
        bf: 1301,
        sr: 50.73,
        hundreds: 2,
        fifties: 3,
        ducks: 2,
        fours: 64,
        sixes: 2,
      },
    ],
    continent: [
      {
        team: "In Africa",
        span: "2013-2024",
        mat: 9,
        inns: 18,
        no: 0,
        runs: 891,
        hs: 153,
        avg: 49.5,
        bf: 1649,
        sr: 54.03,
        hundreds: 2,
        fifties: 4,
        ducks: 0,
        fours: 117,
        sixes: 3,
      },
      {
        team: "In Americas",
        span: "2011-2023",
        mat: 11,
        inns: 15,
        no: 0,
        runs: 660,
        hs: 200,
        avg: 44.0,
        bf: 1301,
        sr: 50.73,
        hundreds: 2,
        fifties: 3,
        ducks: 2,
        fours: 64,
        sixes: 2,
      },
      {
        team: "In Asia",
        span: "2011-2024",
        mat: 64,
        inns: 102,
        no: 11,
        runs: 4789,
        hs: "254*",
        avg: 52.62,
        bf: 8169,
        sr: 58.62,
        hundreds: 16,
        fifties: 14,
        ducks: 7,
        fours: 513,
        sixes: 18,
      },
      {
        team: "In Europe",
        span: "2014-2023",
        mat: 17,
        inns: 33,
        no: 0,
        runs: 1096,
        hs: 149,
        avg: 33.21,
        bf: 2111,
        sr: 51.91,
        hundreds: 2,
        fifties: 5,
        ducks: 4,
        fours: 129,
        sixes: 1,
      },
      {
        team: "In Oceania",
        span: "2011-2025",
        mat: 22,
        inns: 42,
        no: 2,
        runs: 1794,
        hs: 169,
        avg: 44.85,
        bf: 3378,
        sr: 53.1,
        hundreds: 8,
        fifties: 5,
        ducks: 2,
        fours: 204,
        sixes: 6,
      },
    ],
  };

  return (
    <div className="relative w-full py-5 space-y-10">
      <div className="relative flex justify-between items-center gap-2 z-10">
        <article className="font-inter text-xl font-bold">Career Statistics</article>
      <div className="flex justify-end items-center gap-5">
      <div className="relative w-[250px] h-[45px]">
            <SelectField options={leagueOptions} />
          </div>
          <div className="relative w-[250px] h-[45px]">
            <SelectField options={filterOptions} />
          </div>
      </div>
      </div>
      <div className="relative w-full space-y-10 z-0">
        <StatsTable title="Career Averages" data={statsData.overview} />
        <StatsTable title="vs Team" data={statsData.teams} />
        <StatsTable title="In Host Country" data={statsData.hostCountry} />
        <StatsTable title="in Continent" data={statsData.continent} />
      </div>
    </div>
  );
};

export default Stats;
