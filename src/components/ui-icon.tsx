const paths = {
  back: "M19 12H5m7-7-7 7 7 7",
  arrow: "M5 12h14m-7-7 7 7-7 7",
  down: "M12 5v14m-7-7 7 7 7-7",
  image: "M4 14v6h16v-6M12 16V3m-5 5 5-5 5 5",
  text: "M5 5h14M12 5v15M8 20h8M5 5v3m14-3v3",
  layers: "m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5",
  product: "m8 3-6 4 3 6 3-2v10h8V11l3 2 3-6-6-4c-1 3-7 3-8 0Z",
  close: "m6 6 12 12M18 6 6 18",
  fit: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  undo: "M9 5 4 10l5 5M4 10h10a6 6 0 0 1 0 12",
  redo: "m15 5 5 5-5 5M20 10H10a6 6 0 0 0 0 12",
  check: "m5 12 4 4L19 6",
  guide: "M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5M8 8h8v8H8Z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  menu: "M4 8h16M4 16h16",
};

export function UiIcon({ name }: { name: keyof typeof paths }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
