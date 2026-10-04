// Dimensions must come from the selected printer's validated specification.
export type DesignLayer =
  | { id: string; kind: "text"; x: number; y: number; width: number; height: number; rotation: number; text: string; fontFamily: string; fontSize: number; color: string }
  | { id: string; kind: "image"; x: number; y: number; width: number; height: number; rotation: number; assetId: string };

export type DesignDocument = {
  schemaVersion: 1;
  id: string;
  productVariantId: string;
  printArea: { widthMm: number; heightMm: number };
  coordinateUnit: "mm";
  layers: DesignLayer[];
};

