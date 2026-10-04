"use client";

import { useId } from "react";

type ShirtMockupProps = {
  color: string;
  dark: boolean;
};

const silhouette = "M174 71 95 110 37 208 123 251 151 206 141 510Q260 539 379 510L369 206 397 251 483 208 425 110 346 71Q260 112 174 71Z";

export function ShirtMockup({ color, dark }: ShirtMockupProps) {
  const id = useId().replace(/:/g, "");
  const reference = (name: string) => `url(#${id}-${name})`;
  const seam = dark ? "#d5dbe1" : "#404851";

  return (
    <svg className="studio-shirt" viewBox="0 0 520 580" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-shape`}><path d={silhouette} /></clipPath>
        <filter id={`${id}-shadow`} x="-25%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="17" floodColor="#1a2433" floodOpacity=".14" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#18202a" floodOpacity=".08" />
        </filter>
        <filter id={`${id}-soft-fold`} x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <linearGradient id={`${id}-light`} x1="155" y1="85" x2="366" y2="535" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity={dark ? ".16" : ".3"} />
          <stop offset=".45" stopColor="#ffffff" stopOpacity={dark ? ".025" : ".06"} />
          <stop offset="1" stopColor="#14202d" stopOpacity={dark ? ".12" : ".075"} />
        </linearGradient>
        <linearGradient id={`${id}-body-depth`} x1="140" y1="300" x2="380" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#101c2a" stopOpacity={dark ? ".24" : ".12"} />
          <stop offset=".09" stopColor="#101c2a" stopOpacity=".035" />
          <stop offset=".24" stopColor="#ffffff" stopOpacity={dark ? ".035" : ".05"} />
          <stop offset=".74" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".93" stopColor="#101c2a" stopOpacity=".025" />
          <stop offset="1" stopColor="#101c2a" stopOpacity={dark ? ".2" : ".1"} />
        </linearGradient>
        <linearGradient id={`${id}-collar`} x1="260" y1="75" x2="260" y2="121" gradientUnits="userSpaceOnUse">
          <stop stopColor="#121b25" stopOpacity={dark ? ".28" : ".17"} />
          <stop offset=".55" stopColor="#ffffff" stopOpacity={dark ? ".12" : ".2"} />
          <stop offset="1" stopColor="#121b25" stopOpacity={dark ? ".16" : ".1"} />
        </linearGradient>
        <linearGradient id={`${id}-sleeve-left`} x1="86" y1="128" x2="131" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity={dark ? ".07" : ".17"} />
          <stop offset=".75" stopColor="#152231" stopOpacity=".015" />
          <stop offset="1" stopColor="#152231" stopOpacity={dark ? ".15" : ".11"} />
        </linearGradient>
        <linearGradient id={`${id}-sleeve-right`} x1="430" y1="121" x2="398" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity=".07" />
          <stop offset="1" stopColor="#152231" stopOpacity={dark ? ".21" : ".1"} />
        </linearGradient>
        <pattern id={`${id}-weave`} width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M0 .5H3M.5 0V3" fill="none" stroke={dark ? "#ffffff" : "#17212c"} strokeOpacity={dark ? ".022" : ".017"} strokeWidth=".5" />
        </pattern>
      </defs>

      <path d={silhouette} fill={color} filter={reference("shadow")} />
      <g clipPath={reference("shape")}>
        <path d={silhouette} fill={reference("light")} />
        <path d={silhouette} fill={reference("body-depth")} />
        <path d="M174 71 95 110 37 208 123 251 151 206 166 145Z" fill={reference("sleeve-left")} />
        <path d="M346 71 425 110 483 208 397 251 369 206 354 145Z" fill={reference("sleeve-right")} />

        {/* Folds stay beside and below the logical print rectangle. */}
        <g fill="none" strokeLinecap="round" filter={reference("soft-fold")}>
          <path d="M153 189Q143 230 150 297T149 436" stroke="#152231" strokeOpacity={dark ? ".19" : ".08"} strokeWidth="10" />
          <path d="M365 195Q378 260 372 336T376 459" stroke="#152231" strokeOpacity={dark ? ".21" : ".085"} strokeWidth="12" />
          <path d="M161 204Q154 252 160 311" stroke="#ffffff" strokeOpacity={dark ? ".065" : ".25"} strokeWidth="6" />
          <path d="M356 225Q363 267 359 317" stroke="#ffffff" strokeOpacity={dark ? ".035" : ".17"} strokeWidth="6" />
          <path d="M160 456Q192 447 211 455M323 465Q350 451 369 462" stroke="#152231" strokeOpacity={dark ? ".12" : ".045"} strokeWidth="8" />
          <path d="M65 198Q105 207 134 225M386 219Q416 204 452 195" stroke="#ffffff" strokeOpacity={dark ? ".09" : ".22"} strokeWidth="7" />
        </g>

        <path d="M174 71Q260 112 346 71L325 81Q260 159 195 81Z" fill={color} />
        <path d="M174 71Q260 112 346 71L325 81Q260 159 195 81Z" fill={reference("collar")} />
        <path d="M195 81Q260 159 325 81" fill="none" stroke={seam} strokeOpacity={dark ? ".22" : ".17"} strokeWidth="3.5" />
        <path d="M196 80Q260 153 324 80" fill="none" stroke="#ffffff" strokeOpacity={dark ? ".14" : ".4"} strokeWidth="1" />
        <path d="M200 85Q260 154 320 85" fill="none" stroke={seam} strokeOpacity={dark ? ".18" : ".14"} strokeWidth=".6" strokeDasharray="1 2" />

        <path d="M144 497Q260 524 376 497M53 205 126 242M394 242 467 205" fill="none" stroke={seam} strokeOpacity={dark ? ".21" : ".15"} strokeWidth="1" />
        <path d="M144 500Q260 527 376 500M52 208 124 244M396 244 468 208" fill="none" stroke="#ffffff" strokeOpacity={dark ? ".08" : ".36"} strokeWidth="1" />
        <path d="M146 503Q260 529 374 503M55 208 123 242M397 242 464 208" fill="none" stroke={seam} strokeOpacity={dark ? ".14" : ".11"} strokeWidth=".6" strokeDasharray="1.4 2.4" />
        <path d={silhouette} fill={reference("weave")} />
      </g>
      <path d={silhouette} fill="none" stroke={dark ? "#f0f3f7" : "#24303c"} strokeOpacity={dark ? ".12" : ".15"} strokeWidth="1" />
    </svg>
  );
}
