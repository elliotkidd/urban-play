"use client";

import Link, { LinkProps } from "next/link";
import { ComponentProps } from "react";

interface ClientSideRouteProps
  extends Omit<ComponentProps<typeof Link>, "href"> {
  children: React.ReactNode;
  route: string;
  className?: string;
}

function ClientSideRoute({
  children,
  route,
  className,
  ...props
}: ClientSideRouteProps) {
  return (
    <Link href={route} className={className} {...props}>
      {children}
    </Link>
  );
}

export default ClientSideRoute;
