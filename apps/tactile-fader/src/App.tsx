import { useRef, useState, useEffect, type CSSProperties } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const FADER_HEIGHT = 300;
const HANDLE_HEIGHT = 60;
const SNAP_INTERVAL = 15;

const TactileFader = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const y = useMotionValue(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const steppedY = useTransform(y, (latest: number) => {
    const currentStep = Math.round(latest / SNAP_INTERVAL);
    if (prevStepRef.current !== currentStep) {
      if ("vibrate" in navigator) navigator.vibrate(2);
      prevStepRef.current = currentStep;
    }
    return currentStep * SNAP_INTERVAL;
  });

  useEffect(() => {
    const maxY = FADER_HEIGHT - HANDLE_HEIGHT;
    const unsubscribe = steppedY.on("change", (latest) => {
      if (audioRef.current) {
        const volume = 1 - latest / maxY;
        audioRef.current.volume = Math.max(0, Math.min(1, volume));
      }
    });
    return () => unsubscribe();
  }, [steppedY]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={pageStyle}>
      <div style={playerContainerStyle}>
        <audio
          ref={audioRef}
          src="/music.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        <button onClick={togglePlay} style={playButtonStyle}>
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <span style={timeStyle}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <div style={progressContainerStyle}>
          <div style={{ ...progressBarStyle, width: `${progress}%` }} />
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={progressInputStyle}
          />
        </div>
      </div>

      {/* 페이더 컨테이너 */}
      <div style={containerStyle}>
        <div ref={constraintsRef} style={trackStyle}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} style={{ ...tickStyle, top: `${i * 10}%` }} />
          ))}

          <motion.div
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              dragStartY.current = e.clientY - y.get();
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                const maxY = FADER_HEIGHT - HANDLE_HEIGHT;
                const newY = e.clientY - dragStartY.current;
                y.set(Math.max(0, Math.min(maxY, newY)));
              }
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            style={{
              y: steppedY,
              ...handleWrapperStyle,
            }}
            whileTap={{
              scale: 0.96,
              filter: "brightness(0.9)",
            }}
          >
            <div style={handleBodyStyle}>
              <div style={concaveGrooveStyle} />
              <div style={indicatorLineStyle} />
            </div>
          </motion.div>
        </div>

        <div style={volumeLabelStyle}>VOL</div>
      </div>
    </div>
  );
};

const pageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  gap: "40px",
};

const playerContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "16px 24px",
  backgroundColor: "#f5f5f5",
  borderRadius: "40px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
};

const playButtonStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#333",
};

const timeStyle: CSSProperties = {
  fontFamily: "monospace",
  fontSize: "16px",
  color: "#333",
  minWidth: "100px",
};

const progressContainerStyle: CSSProperties = {
  position: "relative",
  width: "200px",
  height: "6px",
  backgroundColor: "#ddd",
  borderRadius: "3px",
};

const progressBarStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  backgroundColor: "#666",
  borderRadius: "3px",
  pointerEvents: "none",
};

const progressInputStyle: CSSProperties = {
  position: "absolute",
  top: "-8px",
  left: 0,
  width: "100%",
  height: "20px",
  opacity: 0,
  cursor: "pointer",
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
  backgroundColor: "#121212",
  borderRadius: "12px",
  gap: "16px",
};

const volumeLabelStyle: CSSProperties = {
  color: "#666",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "2px",
};

const trackStyle: CSSProperties = {
  width: "16px",
  height: FADER_HEIGHT,
  backgroundColor: "#080808",
  borderRadius: "8px",
  position: "relative",
  border: "2px solid #222",
  boxShadow: "inset 4px 4px 10px #000",
};

const handleWrapperStyle = {
  width: "60px",
  height: HANDLE_HEIGHT,
  position: "absolute" as const,
  left: "-24px",
  cursor: "grab" as const,
  zIndex: 20,
};

const handleBodyStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(145deg, #e6e6e6, #999)",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: `
    0 10px 20px rgba(0,0,0,0.5),
    inset 0 2px 2px rgba(255,255,255,0.8),
    inset 0 -2px 5px rgba(0,0,0,0.3)
  `,
};

const concaveGrooveStyle: CSSProperties = {
  width: "80%",
  height: "60%",
  backgroundColor: "#bbb",
  borderRadius: "4px",
  boxShadow:
    "inset 2px 5px 10px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(255,255,255,0.5)",
  position: "absolute",
};

const indicatorLineStyle: CSSProperties = {
  width: "100%",
  height: "3px",
  backgroundColor: "#333",
  opacity: 0.6,
  zIndex: 5,
  boxShadow: "0 1px 1px rgba(255,255,255,0.3)",
};

const tickStyle: CSSProperties = {
  position: "absolute",
  right: "-25px",
  width: "12px",
  height: "2px",
  backgroundColor: "#444",
  pointerEvents: "none",
};

export default TactileFader;
