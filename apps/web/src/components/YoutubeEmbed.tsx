"use client";

import ReactPlayer from "react-player";

export function YoutubeEmbed({ url }: { url: string }) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  const videoId = match && match[7].length == 11 ? match[7] : false;
  return (
    <ReactPlayer
      src={videoId ? `https://www.youtube.com/watch?v=${videoId}` : url}
      width="100%"
      className="max-w-4xl mx-auto aspect-video"
      height="100%"
      controls
    />
  );
}
