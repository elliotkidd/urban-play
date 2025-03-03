import { Button } from "@/components/Button";
import processUrl from "@/utils/processUrl";

import SanityImage from "../SanityImage";
import { Link } from "../navigation/Link";

interface PostCardProps {
  post: any;
  large?: boolean;
  index: number;
}

export default function PostCard({ post, index, large }: PostCardProps) {
  const { mainImage, excerpt, title, publishedAt, categories } = post;
  let date: Date;
  publishedAt ? (date = new Date(publishedAt)) : (date = new Date());

  if (large) {
    return (
      <Link
        href={processUrl(post)}
        className="h-full group grid grid-cols-1 md:grid-cols-5 items-center gap-fluid-xs p-fluid-xs bg-accent/20"
      >
        <div
          className={`relative aspect-landscape w-full
            overflow-hidden bg-primary md:col-span-2`}
        >
          <SanityImage
            src={mainImage}
            className="absolute h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            height={400}
            width={600}
            alt={`${title} preview image`}
          />
        </div>

        <div className={`space-y-3 md:col-span-3`}>
          <div className="">
            {categories && (
              <ul className="flex flex-wrap gap-1">
                {categories.map((category, i) => {
                  return (
                    <li key={i}>
                      <Button as="span" variant="accent" size="xs">
                        {category?.title}
                      </Button>
                    </li>
                  );
                })}{" "}
              </ul>
            )}
          </div>
          <h3 className="line-clamp-2 text-xl font-heading leading-tight">
            {title}
          </h3>
          {excerpt && <p className="line-clamp-3">{excerpt}</p>}
          <div className="text-accent opacity-50 hover:opacity-100 disabled:cursor-not-allowed transition-opacity duration-500">
            <svg
              className="w-12 h-12"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_171_1204)">
                <path
                  d="M28.1323 19.6301C28.9112 21.704 30.4379 22.977 31.9895 24.5355C32.2263 24.7715 32.4693 25.0074 32.7061 25.2372C27.1103 25.1006 21.4024 26.5535 15.8005 26.3859C13.7317 26.3238 13.2768 29.4968 15.3144 29.8942C21.1843 31.0367 27.2038 29.8259 33.1485 29.8755C32.7123 30.2916 32.2886 30.7138 31.8711 31.1422C30.55 32.4773 27.8145 35.0479 28.0388 37.1343C28.1385 38.047 28.7305 38.6431 29.6777 38.4817C31.3103 38.2023 32.9179 35.7806 34.0396 34.6754C35.8591 32.8871 37.7971 31.1112 40.1151 29.9935C41.6979 29.2298 41.1932 27.0627 40.1151 26.1872C38.2769 24.6969 36.557 23.0887 34.8559 21.4433C33.3354 19.9716 32.0767 18.2765 30.0328 17.5748C28.8925 17.1836 27.7148 18.5373 28.1261 19.6363L28.1323 19.6301Z"
                  fill="currentColor"
                />
              </g>
              <circle
                cx="28"
                cy="28"
                r="27"
                stroke="currentColor"
                strokeWidth="2"
              />
              <defs>
                <clipPath id="clip0_171_1204">
                  <rect
                    width="21"
                    height="27.125"
                    fill="white"
                    transform="translate(13.9996 38.5001) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </Link>
    );
  } else
    return (
      <Link
        href={processUrl(post)}
        className="group flex flex-col gap-fluid-xs"
      >
        <div
          className={`relative aspect-landscape w-full
            overflow-hidden bg-primary`}
        >
          <SanityImage
            src={mainImage}
            className="absolute h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            height={400}
            width={600}
            alt={`${title} preview image`}
          />
          <div className="absolute top-4 left-4">
            {categories && (
              <ul className="flex flex-wrap gap-1">
                {categories.map((category, i) => {
                  return (
                    <li key={i}>
                      <Button as="span" variant="accent" size="xs">
                        {category?.title}
                      </Button>
                    </li>
                  );
                })}{" "}
              </ul>
            )}
          </div>
        </div>

        <div className={`space-y-3`}>
          <h3 className="line-clamp-2 text-lg font-heading leading-tight">
            {title}
          </h3>
          <div className="text-accent opacity-50 hover:opacity-100 disabled:cursor-not-allowed transition-opacity duration-500">
            <svg
              className="w-12 h-12"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_171_1204)">
                <path
                  d="M28.1323 19.6301C28.9112 21.704 30.4379 22.977 31.9895 24.5355C32.2263 24.7715 32.4693 25.0074 32.7061 25.2372C27.1103 25.1006 21.4024 26.5535 15.8005 26.3859C13.7317 26.3238 13.2768 29.4968 15.3144 29.8942C21.1843 31.0367 27.2038 29.8259 33.1485 29.8755C32.7123 30.2916 32.2886 30.7138 31.8711 31.1422C30.55 32.4773 27.8145 35.0479 28.0388 37.1343C28.1385 38.047 28.7305 38.6431 29.6777 38.4817C31.3103 38.2023 32.9179 35.7806 34.0396 34.6754C35.8591 32.8871 37.7971 31.1112 40.1151 29.9935C41.6979 29.2298 41.1932 27.0627 40.1151 26.1872C38.2769 24.6969 36.557 23.0887 34.8559 21.4433C33.3354 19.9716 32.0767 18.2765 30.0328 17.5748C28.8925 17.1836 27.7148 18.5373 28.1261 19.6363L28.1323 19.6301Z"
                  fill="currentColor"
                />
              </g>
              <circle
                cx="28"
                cy="28"
                r="27"
                stroke="currentColor"
                strokeWidth="2"
              />
              <defs>
                <clipPath id="clip0_171_1204">
                  <rect
                    width="21"
                    height="27.125"
                    fill="white"
                    transform="translate(13.9996 38.5001) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </Link>
    );
}
