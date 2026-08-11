import { useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

type Playlist = {
  id: string;
  title: string;
  artist: string;
  videoId: string;
  sourceUrl: string;
  art: string;
};

const playlists: Playlist[] = [
  {
    id: "1",
    title: "Headlights & Heartlines",
    artist: "Midnight Run Curated Set",
    videoId: "x8yP68UgT9c",
    sourceUrl: "https://youtu.be/x8yP68UgT9c?si=g7k5bak221hHnYAO",
    art: "/manus-storage/route-cab_93e6ddd3.jpg",
  },
  {
    id: "2",
    title: "Chrome, Coffee, Radio",
    artist: "Rest Stop Late-Night Session",
    videoId: "_J0-YKRHuEg",
    sourceUrl: "https://youtu.be/_J0-YKRHuEg?si=kgCjyoyS_R6IaAdy",
    art: "/manus-storage/route-diner_b85bfb89.jpg",
  },
  {
    id: "3",
    title: "First Light Freight",
    artist: "Sunrise Shift Horizon Mix",
    videoId: "HUZhV8EFrNU",
    sourceUrl: "https://youtu.be/HUZhV8EFrNU?si=Wpz4lqssXuK1KeKa",
    art: "/manus-storage/truck-radio-hero_50534794.jpg",
  },
];

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date).toLowerCase();
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeStr, setTimeStr] = useState(() => formatTime(new Date()));

  const currentPlaylist = playlists[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => setTimeStr(formatTime(new Date())), 15000);
    return () => clearInterval(timer);
  }, []);

  function handlePrev() {
    setCurrentIndex((prev) => (prev === 0 ? playlists.length - 1 : prev - 1));
    setIsPlaying(false);
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev === playlists.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  }

  return (
    <main className="saloon-container">
      <div className="saloon-bg">
        <img src="/manus-storage/truck-radio-hero_50534794.jpg" alt="Truck driver highway background" />
        <div className="saloon-vignette" />
      </div>

      <header className="saloon-topbar">
        <div className="top-time">{timeStr}</div>
        <div className="top-online"><span className="online-dot" /><span>32 online</span></div>
        <div className="top-links">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="external-pill">Spotify</a>
          <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="external-pill">YT Music</a>
        </div>
      </header>

      <div className="saloon-hero-title">
        <h1 className="hindi-title">ट्रक स्टॉप</h1>
        <h2 className="sub-hindi-title">रेडियो सैलून</h2>
      </div>

      <div className="saloon-player-dock">
        <div className="player-pill">
          <div className="pill-art-wrap" onClick={() => setIsPlaying(!isPlaying)}>
            <img src={currentPlaylist.art} alt={currentPlaylist.title} />
            <div className="art-overlay-icon">
              {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" />}
            </div>
          </div>

          <div className="pill-track-info">
            <div className="pill-title">{currentPlaylist.title}</div>
            <div className="pill-artist">{currentPlaylist.artist}</div>
          </div>

          <div className="pill-controls">
            <button onClick={handlePrev} aria-label="Previous playlist" title="Previous playlist"><SkipBack size={16} /></button>
            <button onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause" : "Play"} className="pill-play-btn">
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <button onClick={handleNext} aria-label="Next playlist" title="Next playlist"><SkipForward size={16} /></button>
          </div>

          <div className="pill-time"><span>{isPlaying ? "2:14" : "0:00"}</span> / <span>5:04</span></div>
        </div>
        {isPlaying && (
          <iframe
            className="silent-youtube-player"
            src={`https://www.youtube-nocookie.com/embed/${currentPlaylist.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={currentPlaylist.title}
            allow="autoplay; encrypted-media"
          />
        )}
      </div>
    </main>
  );
}
