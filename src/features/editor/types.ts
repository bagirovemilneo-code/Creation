export type StudioColor = "ivory" | "ink" | "sage";
export type StudioSize = "S" | "M" | "L" | "XL";
export type StudioFont = "Arial" | "Georgia" | "Verdana";

type LayerTransform = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type TextLayer = LayerTransform & {
  kind: "text";
  text: string;
  fontFamily: StudioFont;
  fontSize: number;
  color: string;
};

export type ImageLayer = LayerTransform & {
  kind: "image";
  dataUrl: string;
  naturalWidth: number;
  naturalHeight: number;
};

export type StudioLayer = TextLayer | ImageLayer;

// Logical preview pixels only. These dimensions are not a printer specification.
export type StudioDocument = {
  schemaVersion: 1;
  id: string;
  product: {
    id: string;
    title: string;
    color: StudioColor;
    size: StudioSize;
  };
  area: { width: 300; height: 360 };
  layers: StudioLayer[];
};
