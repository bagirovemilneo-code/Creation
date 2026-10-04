"use client";

import { useId, type ReactNode } from "react";

type ShirtMockupProps = {
  color: string;
  dark: boolean;
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
};

const silhouette = "M174 71 95 110 37 208 123 251 151 206 141 510Q260 539 379 510L369 206 397 251 483 208 425 110 346 71Q260 112 174 71Z";

export function ShirtMockup({ color, dark, className = "studio-shirt", children, ariaLabel }: ShirtMockupProps) {
  const id = useId().replace(/:/g, "");
  const reference = (name: string) => `url(#${id}-${name})`;
  const seam = dark ? "#d5dbe1" : "#404851";

  return (
    <svg className={className} viewBox="0 0 520 580" role={ariaLabel ? "img" : undefined} aria-hidden={ariaLabel ? undefined : true} aria-label={ariaLabel}>
      <defs>
        <clipPath id={`${id}-shape`}><path d={silhouette} /></clipPath>
        <clipPath id={`${id}-print`}><rect x="156" y="145" width="208" height="249" /></clipPath>
        <filter id={`${id}-shadow`} x="-25%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#1a2433" floodOpacity=".13" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#18202a" floodOpacity=".045" />
        </filter>
        <filter id={`${id}-soft-fold`} x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id={`${id}-light`} x1="155" y1="85" x2="366" y2="535" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity={dark ? ".1" : ".18"} />
          <stop offset=".48" stopColor="#ffffff" stopOpacity={dark ? ".018" : ".035"} />
          <stop offset="1" stopColor="#14202d" stopOpacity={dark ? ".08" : ".045"} />
        </linearGradient>
        <linearGradient id={`${id}-depth`} x1="37" y1="300" x2="483" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#101c2a" stopOpacity={dark ? ".1" : ".055"} />
          <stop offset=".2" stopColor="#101c2a" stopOpacity=".012" />
          <stop offset=".35" stopColor="#ffffff" stopOpacity={dark ? ".025" : ".035"} />
          <stop offset=".68" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".8" stopColor="#101c2a" stopOpacity=".012" />
          <stop offset="1" stopColor="#101c2a" stopOpacity={dark ? ".1" : ".055"} />
        </linearGradient>
        <linearGradient id={`${id}-collar`} x1="260" y1="75" x2="260" y2="121" gradientUnits="userSpaceOnUse">
          <stop stopColor="#121b25" stopOpacity={dark ? ".18" : ".1"} />
          <stop offset=".55" stopColor="#ffffff" stopOpacity={dark ? ".06" : ".12"} />
          <stop offset="1" stopColor="#121b25" stopOpacity={dark ? ".09" : ".06"} />
        </linearGradient>
        <radialGradient id={`${id}-shoulder-light`} cx="145" cy="117" r="157" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity={dark ? ".045" : ".08"} />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d={silhouette} fill={color} filter={reference("shadow")} />
      <g clipPath={reference("shape")}>
        <path d={silhouette} fill={reference("light")} />
        <path d={silhouette} fill={reference("depth")} />
        <path d={silhouette} fill={reference("shoulder-light")} />

        {/* Broad, low-contrast folds leave the printable center smooth. */}
        <g fill="none" strokeLinecap="round" filter={reference("soft-fold")}>
          <path d="M150 207Q145 263 150 332T149 446" stroke="#152231" strokeOpacity={dark ? ".13" : ".045"} strokeWidth="13" />
          <path d="M372 212Q375 279 372 343T375 455" stroke="#152231" strokeOpacity={dark ? ".12" : ".045"} strokeWidth="14" />
          <path d="M160 245Q154 282 160 326" stroke="#ffffff" strokeOpacity={dark ? ".04" : ".1"} strokeWidth="8" />
          <path d="M160 465Q192 456 211 461M323 474Q350 461 369 469" stroke="#152231" strokeOpacity={dark ? ".065" : ".025"} strokeWidth="10" />
          <path d="M63 209Q99 220 123 237M397 236Q426 218 460 207" stroke="#152231" strokeOpacity={dark ? ".1" : ".04"} strokeWidth="11" />
        </g>

        <path d="M174 71Q260 112 346 71L325 81Q260 159 195 81Z" fill={color} />
        <path d="M174 71Q260 112 346 71L325 81Q260 159 195 81Z" fill={reference("collar")} />
        <path d="M195 81Q260 159 325 81" fill="none" stroke={seam} strokeOpacity={dark ? ".16" : ".11"} strokeWidth="3.5" />
        <path d="M196 80Q260 153 324 80" fill="none" stroke="#ffffff" strokeOpacity={dark ? ".08" : ".23"} strokeWidth="1" />
        <path d="M200 85Q260 154 320 85" fill="none" stroke={seam} strokeOpacity={dark ? ".11" : ".075"} strokeWidth=".6" strokeDasharray="1 2" />

        <path d="M144 497Q260 524 376 497M53 205 126 242M394 242 467 205" fill="none" stroke={seam} strokeOpacity={dark ? ".14" : ".085"} strokeWidth=".8" />
        <path d="M144 500Q260 527 376 500M52 208 124 244M396 244 468 208" fill="none" stroke="#ffffff" strokeOpacity={dark ? ".045" : ".17"} strokeWidth=".8" />
        <path d="M146 503Q260 529 374 503M55 208 123 242M397 242 464 208" fill="none" stroke={seam} strokeOpacity={dark ? ".075" : ".055"} strokeWidth=".5" strokeDasharray="1.4 2.4" />
        {children && <g clipPath={reference("print")}>{children}</g>}
      </g>
      <path d={silhouette} fill="none" stroke={dark ? "#f0f3f7" : "#24303c"} strokeOpacity={dark ? ".075" : ".08"} strokeWidth=".7" />
    </svg>
  );
}
