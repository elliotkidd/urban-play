"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const HubspotTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsDict = Object.fromEntries(
    searchParams ? searchParams.entries() : [],
  );

  const emailAddress = searchParamsDict.email ? searchParamsDict.email : null;

  var firstLoad = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var _hsq = (window._hsq = window._hsq || []);

      if (firstLoad.current === true) {
        _hsq.push(["setPath", pathname]);
        _hsq.push(["trackPageView"]);

        if (emailAddress) {
          _hsq.push([
            "identify",
            {
              email: emailAddress,
            },
          ]);
        }

        // I think we only need the trackPageView entry once before the identify.
        _hsq.push(["setPath", pathname]);
        _hsq.push(["trackPageView"]);

        firstLoad.current = false;
      } else {
        _hsq.push(["setPath", pathname]);
        _hsq.push(["trackPageView"]);
      }
    }
  }, [pathname, searchParamsDict]);

  return null;
};

export default HubspotTracker;
