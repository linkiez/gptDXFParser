// Tipos para entidades DXF de bloco, insert, viewport, etc.

export interface InsertEntity {
  type: 'INSERT';
  layer?: string;
  color?: number;
  blockName: string;
  insertionPoint: { x: number; y: number; z?: number };
  scale?: { x: number; y: number; z: number };
  rotation?: number;
  columns?: number; // 70
  rows?: number; // 71
  columnSpacing?: number; // 44
  rowSpacing?: number; // 45
  extrusion?: { x: number; y: number; z: number }; // 210,220,230
  attribs?: any[]; // lista de atributos (caso existam)
  // DXF codes comuns: 2 (block name), 10/20/30 (insertion), 41/42/43 (scale), 50 (rotation), 70 (columns), 71 (rows), 44 (col spacing), 45 (row spacing), 210/220/230 (extrusion)
}

export interface ViewportEntity {
  type: 'VIEWPORT';
  layer?: string;
  color?: number;
  center: { x: number; y: number; z?: number };
  width: number;
  height: number;
  viewCenter?: { x: number; y: number };
  snapBase?: { x: number; y: number };
  snapSpacing?: { x: number; y: number };
  gridSpacing?: { x: number; y: number };
  viewDirection?: { x: number; y: number; z: number };
  viewTarget?: { x: number; y: number; z: number };
  lensLength?: number;
  frontClip?: number;
  backClip?: number;
  twistAngle?: number;
  status?: number;
  id?: number;
  // DXF codes comuns: 10/20/30 (center), 40 (width), 41 (height), 12/22 (view center), 13/23 (snap base), 14/24 (snap spacing), 15/25 (grid spacing), 16/26/36 (view direction), 17/27/37 (view target), 42 (lens), 43 (front clip), 44 (back clip), 50 (twist), 68 (status), 69 (id)
}
