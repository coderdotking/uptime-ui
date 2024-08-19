"use client";
import { cn } from "@/lib/utils";
import { pageConfig } from "@/uptime.config";
import LogoSvg from "@/assets/svg/logo.svg";
import Link from "next/link";
import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

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

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div  onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
      {theme == "light" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </div>
  );
};

export default function Header() {
  const pageConfigFilter = pageConfig.links.filter(
    (link) => (link as any).highlight
  );
  return (
    <header className={cn(" border-gray-200")}>
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
        <div className=" flex gap-4 text-sm">
          <div className="flex gap-4">
            {pageConfig.links.map(linkToElement)}
          </div>
          {pageConfigFilter.length > 0 && (
            <div className="flex gap-4">
              {pageConfigFilter.map(linkToElement)}
            </div>
          )}
          <div className="cursor-pointer">
            <ToggleMode />
          </div>
        </div>
      </div>
    </header>
  );
}
