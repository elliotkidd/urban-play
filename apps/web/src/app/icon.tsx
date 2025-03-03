import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 56,
  height: 56,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 56,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.3348 50.2627L28.2523 36.1282L53.6644 26.4009L55 30.0282L34.497 37.8814L42.3088 47.8445L39.3348 50.2627Z"
            fill="#86CD82"
          />
          <path
            d="M32.2828 55.9999L18.6181 38.5585L11.7204 49.2047L8.54467 47.0767L18.3213 31.9749L35.2568 53.5817L32.2828 55.9999Z"
            fill="#86CD82"
          />
          <path
            d="M4.18765 44.1507L1.01187 42.0166L13.0739 23.3902L1 20.0047L2.00913 16.2686L19.1346 21.0687L4.18765 44.1507Z"
            fill="#86CD82"
          />
          <path
            d="M29.5642 18.4874L3.39224 11.1421L4.4073 7.4059L25.5277 13.3305L24.9578 0.592558L28.7569 0.417236L29.5642 18.4874Z"
            fill="#86CD82"
          />
          <path
            d="M35.2034 27.7914L33.9687 0.175321L37.7737 0L38.765 22.29L50.4887 17.7981L51.8243 21.4255L35.2034 27.7914Z"
            fill="#86CD82"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
