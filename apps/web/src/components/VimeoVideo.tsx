import { useDimensions } from "@/hooks/useDimensions";

export const VimeoVideo = ({ videoId }: { videoId: string }) => {
  const { width, height } = useDimensions();

  if (!videoId || videoId === "") return null;

  const isLandscape = 16 / 9 > width / height;

  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0`}
      allow="autoplay; fullscreen"
      allowFullScreen
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: isLandscape ? "auto" : "100%",
        height: isLandscape ? "100dvh" : "auto",
        aspectRatio: "16 / 9",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transformOrigin: "center center",
      }}
    />
  );
};
