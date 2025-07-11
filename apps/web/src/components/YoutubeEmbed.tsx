"use client";

import YouTube from "react-youtube";

export function YoutubeEmbed({ url }: { url: string }) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  const videoId = match && match[7].length == 11 ? match[7] : false;
  return (
    <YouTube
      videoId={videoId}
      iframeClassName="w-full aspect-video"
      className="w-full aspect-video"
    />
  );
}
