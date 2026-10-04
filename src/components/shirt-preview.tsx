type ShirtPreviewProps = {
  color?: string;
  design?: "type" | "orbit" | "flower" | "blank";
  className?: string;
};

export function ShirtPreview({ color = "#f8f6ef", design = "type", className }: ShirtPreviewProps) {
  const dark = ["#20352c", "#22352c", "#202d26", "#25382c", "#1e2d25", "#233c30", "#292b2a"].includes(color.toLowerCase());
  const ink = dark ? "#f5f3e9" : "#26352d";
  const seam = dark ? "#42574a" : "#ddd9ce";
  return (
    <svg className={className ?? "market-shirt"} viewBox="0 0 400 420" role="img" aria-label="T-shirt üzərində nümunə dizayn illüstrasiyası">
      <path d="M128 54 65 82 20 169 87 204 111 166 106 365Q200 389 294 365L289 166 313 204 380 169 335 82 272 54Q200 89 128 54Z" fill={color} stroke={seam} strokeWidth="2" strokeLinejoin="round" />
      <path d="M146 62Q200 132 254 62" fill="none" stroke={seam} strokeWidth="4" />
      <path d="M155 67Q200 116 245 67M31 169 87 195M369 169 313 195M113 357Q200 378 287 357" fill="none" stroke={seam} strokeWidth="1.3" />
      <path d="M109 179 119 291M291 179 281 291" fill="none" stroke={seam} strokeWidth="1" opacity=".65" />
      {design === "type" && <g fill={ink}>
        <text x="200" y="191" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="900" letterSpacing="-1">ÖZ İZİNİ</text>
        <text x="200" y="224" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="900" letterSpacing="-1">QOY.</text>
        <path d="M200 242 204 253 216 254 207 262 210 274 200 268 190 274 193 262 184 254 196 253Z" fill="#d6f55b" />
        <text x="200" y="298" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="7" fontWeight="700" letterSpacing="2.7">CREATED BY YOU</text>
      </g>}
      {design === "orbit" && <g fill="none" stroke="#d6f55b" strokeWidth="2.4">
        <ellipse cx="200" cy="222" rx="64" ry="23" transform="rotate(-35 200 222)" />
        <ellipse cx="200" cy="222" rx="64" ry="23" transform="rotate(35 200 222)" />
        <ellipse cx="200" cy="222" rx="64" ry="23" transform="rotate(90 200 222)" />
        <circle cx="200" cy="222" r="8" fill="#d6f55b" stroke="none" />
        <circle cx="246" cy="187" r="5" fill={ink} stroke="none" />
        <text x="200" y="303" textAnchor="middle" fill={ink} stroke="none" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" letterSpacing="4">ÖZ ORBİTİNDƏ.</text>
      </g>}
      {design === "flower" && <g>
        <path d="M200 230C155 222 132 180 158 168C177 156 196 181 200 196C204 171 231 150 245 169C260 190 234 219 218 225C250 216 269 243 249 262C229 279 207 251 202 243C204 279 182 299 164 280C147 261 176 239 192 233Z" fill="#f98d68" />
        <circle cx="201" cy="229" r="14" fill="#d6f55b" />
        <text x="200" y="310" textAnchor="middle" fill={ink} fontFamily="Georgia, serif" fontSize="15" fontStyle="italic">Bir az sən.</text>
      </g>}
    </svg>
  );
}
