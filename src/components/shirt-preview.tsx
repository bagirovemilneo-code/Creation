import { ShirtMockup } from "@/features/editor/shirt-mockup";

type ShirtPreviewProps = {
  color?: string;
  design?: "type" | "orbit" | "flower" | "blank";
  className?: string;
};

function isDarkColor(color: string) {
  const hex = color.replace(/^#/, "");
  if (!/^[\da-f]{6}$/i.test(hex)) return false;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return .2126 * red + .7152 * green + .0722 * blue < 125;
}

export function ShirtPreview({ color = "#f8f6ef", design = "type", className = "market-shirt" }: ShirtPreviewProps) {
  const dark = isDarkColor(color);
  const ink = dark ? "#f2f4f8" : "#252c37";
  const blue = dark ? "#84a6f5" : "#436dce";

  return (
    <ShirtMockup color={color} dark={dark} className={className} ariaLabel={design === "blank" ? "T-shirt məhsul illüstrasiyası" : "T-shirt üzərində nümunə dizayn illüstrasiyası"}>
      {design === "type" && <g>
        <text x="260" y="273" textAnchor="middle" fill={ink} fontFamily="Arial, Helvetica, sans-serif" fontSize="61" fontWeight="800" letterSpacing="-3">BAKU</text>
        <rect x="249" y="296" width="22" height="22" rx="2" fill={blue} />
      </g>}
      {design === "orbit" && <g fill="none" stroke={blue} strokeWidth="4">
        <circle cx="248" cy="268" r="67" />
        <circle cx="274" cy="268" r="67" opacity=".68" />
        <circle cx="261" cy="268" r="28" fill={blue} stroke="none" />
      </g>}
      {design === "flower" && <g fill={blue}>
        <path d="M259 261C208 260 172 217 192 193C213 169 250 200 259 244C264 203 306 168 328 196C348 222 309 257 278 263C311 269 345 306 319 328C295 347 264 310 261 279C252 314 216 350 193 325C169 299 208 269 241 264Z" />
        <circle cx="260" cy="264" r="14" fill={color} />
      </g>}
    </ShirtMockup>
  );
}
