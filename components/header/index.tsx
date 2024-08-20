import { cn } from "@/lib/utils";
import { pageConfig } from "@/uptime.config";
import LogoSvg from "@/assets/svg/logo.svg";
import Link from "next/link";
import * as React from "react";
import ToggleMode from "./ToggleMode";
import ToggleLayout from "./ToggleLayout";

const linkToElement = (link: {
  label: string;
  link: string;
  highlight?: boolean;
}) => {
  return (
    <a
      key={link.label}
      href={link.link}
      target="_blank"
      style={{
        lineHeight: 1,
      }}
      data-active={link.highlight}>
      {link.label}
    </a>
  );
};

export default function Header() {
  const pageConfigFilter = pageConfig.links.filter(
    (link) => (link as any).highlight
  );
  return (
    <header className={cn(" mt-4")}>
      <div
        className={cn(
          "container lg:px-48 h-14 flex justify-between items-center"
        )}>
        <div className=" font-bold text-lg text-primary">
          <Link href={"/"}>
            <div className=" flex gap-1 items-center">
              <span>
                <LogoSvg className="w-6 h-6" />
              </span>
              <span>{pageConfig.title || "Uptime Checker"}</span>
            </div>
          </Link>
        </div>
        <div className="flex gap-4 text-sm items-center">
          <div className="flex gap-4">
            {pageConfig.links.map(linkToElement)}
          </div>
          {pageConfigFilter.length > 0 && (
            <div className="flex gap-4">
              {pageConfigFilter.map(linkToElement)}
            </div>
          )}
          <ToggleLayout />
          <ToggleMode />
        </div>
      </div>
    </header>
  );
}
