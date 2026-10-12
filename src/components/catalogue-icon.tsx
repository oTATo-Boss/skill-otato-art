import type { ReactNode } from "react";

type IconName = "file" | "arrow" | "terminal" | "copy" | "check";

type CatalogueIconProps = {
  name: IconName;
  className?: string;
};

const icons: Record<IconName, ReactNode> = {
  file: <path d="M5 3h9l5 5v13H5zM14 3v5h5M8 12h8m-8 4h5" />,
  arrow: <path d="M4 12h15m-6-5 6 5-6 5" />,
  terminal: <path d="m4 5 7 7-7 7m11 0h6" />,
  copy: (
    <>
      <path className="back" d="M5 3h12a2 2 0 0 1 2 2v16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <g className="copy-front">
        <path className="paper" d="M11 8h9l5 5v11a1 1 0 0 1-1 1H11a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" />
        <path d="M20 8v5h5M13 18h8m-8 3h5" />
      </g>
    </>
  ),
  check: <path d="m5 14 6 6L24 7" />,
};

export function CatalogueIcon({ name, className = "icon" }: CatalogueIconProps) {
  const size = name === "copy" || name === "check" ? 28 : 24;

  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  );
}
