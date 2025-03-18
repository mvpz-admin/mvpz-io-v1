// import React, { useRef, useState } from "react";
// import { FaPause, FaPlay } from "react-icons/fa";
// import { MdFullscreen, MdFullscreenExit, MdPause, MdPlayArrow } from "react-icons/md";

// const VideoPlayer = ({url}) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1); // Volume range: 0.0 - 1.0
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   // Play/Pause Toggle
//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (video) {
//       if (video.paused) {
//         video.play();
//         setIsPlaying(true);
//       } else {
//         video.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   // Update Time
//   const handleTimeUpdate = () => {
//     const video = videoRef.current;
//     if (video) setCurrentTime(video.currentTime);
//   };

//   // Set Duration when metadata is loaded
//   const handleLoadedMetadata = () => {
//     const video = videoRef.current;
//     if (video) setDuration(video.duration);
//   };

//   // Format Time (MM:SS)
//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   // Adjust Volume
//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) videoRef.current.volume = newVolume;
//   };

//   // Full Screen
//   const handleFullScreen = () => {
//     const container = containerRef.current;
//     if (container) {
//       if (!isFullScreen) {
//         if (container.requestFullscreen) {
//           container.requestFullscreen();
//         }
//         setIsFullScreen(true);
//       } else {
//         if (document.exitFullscreen) {
//           document.exitFullscreen();
//         }
//         setIsFullScreen(false);
//       }
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="w-full max-w-xl mx-auto bg-black rounded-lg overflow-hidden relative"
//     >
//       {/* Video */}
//       <video
//         ref={videoRef}
//         className="w-full h-full "
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//         src={url}
//         controls={false} // Disable default browser controls
//       />
//       {/* Custom Controls */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-75 text-white flex items-center justify-between ${
//           isFullScreen ? "text-lg" : "text-sm"
//         }`}
//       >
//         <div className="flex justify-start items-center gap-2 font-inter">
//             {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}

//         >
//           {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
//         </button>

//         {/* Current Time / Duration */}
//         <span className="text-xs ">
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </span>
//         </div>

//         <div className="flex justify-end items-center gap-2">
//             {/* Volume Control */}
//         <input
//           type="range"
//           min="0"
//           max="1"
//           step="0.01"
//           value={volume}
//           onChange={handleVolumeChange}
//           className="w-20 accent-white h-[5px]"

//         />

//         {/* Full Screen */}
//         <button
//           onClick={handleFullScreen}

//         >
//           {isFullScreen ? <MdFullscreenExit size={20} /> : <MdFullscreen size={20}/> }
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

// import React, { useRef, useState } from "react";
// import {
//   MdFullscreen,
//   MdFullscreenExit,
//   MdPause,
//   MdPlayArrow,
//   MdVolumeOff,
//   MdVolumeDown,
//   MdVolumeUp,
// } from "react-icons/md";

// const VideoPlayer = ({ url }: { url: string }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1); // Volume range: 0.0 - 1.0
//   const [showVolumeControl, setShowVolumeControl] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   // Play/Pause Toggle
//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (video) {
//       if (video.paused) {
//         video.play();
//         setIsPlaying(true);
//       } else {
//         video.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   // Update Time
//   const handleTimeUpdate = () => {
//     const video = videoRef.current;
//     if (video) setCurrentTime(video.currentTime);
//   };

//   // Set Duration when metadata is loaded
//   const handleLoadedMetadata = () => {
//     const video = videoRef.current;
//     if (video) setDuration(video.duration);
//   };

//   // Format Time (MM:SS)
//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   // Adjust Volume
//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) videoRef.current.volume = newVolume;
//   };

//   // Full Screen
//   const handleFullScreen = () => {
//     const container = containerRef.current;
//     if (container) {
//       if (!isFullScreen) {
//         if (container.requestFullscreen) {
//           container.requestFullscreen();
//         }
//         setIsFullScreen(true);
//       } else {
//         if (document.exitFullscreen) {
//           document.exitFullscreen();
//         }
//         setIsFullScreen(false);
//       }
//     }
//   };

//   // Get Volume Icon
//   const getVolumeIcon = () => {
//     if (volume === 0) return <MdVolumeOff size={20} />;
//     if (volume < 0.5) return <MdVolumeDown size={20} />;
//     return <MdVolumeUp size={20} />;
//   };

//   return (
//     <div
//       ref={containerRef}
//       className=" h-[600px]  max-w-xl mx-auto bg-black rounded-lg overflow-hidden relative"
//     >
//       {/* Video */}
//       <video
//         ref={videoRef}
//         className="w-full h-full"
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//         src={url}
//         controls={false} // Disable default browser controls
//       />
//       {/* Custom Controls */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-75 text-white flex items-center justify-between ${
//           isFullScreen ? "text-lg" : "text-sm"
//         }`}
//       >
//         <div className="flex justify-start items-center gap-2 font-inter">
//           {/* Play/Pause Button */}
//           <button onClick={togglePlay}>
//             {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
//           </button>
//         </div>

//         <div className="flex justify-end items-center gap-4 font-inter">
//           {/* Current Time / Duration */}
//           <span className="text-xs">
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </span>
//           {/* Volume Control */}
//           <div
//             className="relative flex justify-center items-center gap-2"
//             onMouseEnter={() => setShowVolumeControl(true)}
//             onMouseLeave={() => setShowVolumeControl(false)}
//           >
//             <button>{getVolumeIcon()}</button>
//             {showVolumeControl && (
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className=" w-14 accent-white h-[5px] bg-gray-700"
//               />
//             )}
//           </div>

//           {/* Full Screen */}
//           <button onClick={handleFullScreen}>
//             {isFullScreen ? (
//               <MdFullscreenExit size={20} />
//             ) : (
//               <MdFullscreen size={20} />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;


import React, { useRef, useState } from "react";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPause,
  MdPlayArrow,
  MdVolumeOff,
  MdVolumeDown,
  MdVolumeUp,
} from "react-icons/md";

const VideoPlayer = ({ url }: { url: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range: 0.0 - 1.0
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Play/Pause Toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // Update Time
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) setCurrentTime(video.currentTime);
  };

  // Set Duration when metadata is loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) setDuration(video.duration);
  };

  // Format Time (MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Adjust Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  // Full Screen
  const handleFullScreen = () => {
    const container = containerRef.current;
    if (container) {
      if (!isFullScreen) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        }
        setIsFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setIsFullScreen(false);
      }
    }
  };

  // Get Volume Icon
  const getVolumeIcon = () => {
    if (volume === 0) return <MdVolumeOff size={20} />;
    if (volume < 0.5) return <MdVolumeDown size={20} />;
    return <MdVolumeUp size={20} />;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-auto max-w-screen-lg mx-auto bg-black rounded-lg overflow-hidden relative aspect-video" // Enforce landscape with aspect ratio
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={url}
        controls={false} // Disable default browser controls
      />
      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-75 text-white flex items-center justify-between ${
          isFullScreen ? "text-lg" : "text-sm"
        }`}
      >
        <div className="flex justify-start items-center gap-2 font-inter">
          {/* Play/Pause Button */}
          <button onClick={togglePlay}>
            {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
          </button>
        </div>

        <div className="flex justify-end items-center gap-4 font-inter">
          {/* Current Time / Duration */}
          <span className="text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          {/* Volume Control */}
          <div
            className="relative flex justify-center items-center gap-2"
            onMouseEnter={() => setShowVolumeControl(true)}
            onMouseLeave={() => setShowVolumeControl(false)}
          >
            <button>{getVolumeIcon()}</button>
            {showVolumeControl && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 accent-white h-[5px] bg-gray-700"
              />
            )}
          </div>

          {/* Full Screen */}
          <button onClick={handleFullScreen}>
            {isFullScreen ? (
              <MdFullscreenExit size={20} />
            ) : (
              <MdFullscreen size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;




