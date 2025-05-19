// Tipos para entidades DXF - gerados conforme referência AutoCAD 2012 DXF
// Exemplo: Arc, Line, Circle, Polyline, etc.

export interface ArcEntity {
  type: 'ARC';
  layer?: string;
  color?: number;
  center: { x: number; y: number; z?: number };
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness?: number;
  extrusion?: { x: number; y: number; z: number };
  // ...outros campos relevantes
}

export interface LineEntity {
  type: 'LINE';
  layer?: string;
  color?: number;
  start: { x: number; y: number; z?: number };
  end: { x: number; y: number; z?: number };
  thickness?: number;
  extrusion?: { x: number; y: number; z: number };
  // ...outros campos relevantes
}

export interface CircleEntity {
  type: 'CIRCLE';
  layer?: string;
  color?: number;
  center: { x: number; y: number; z?: number };
  radius: number;
  thickness?: number;
  extrusion?: { x: number; y: number; z: number };
  // ...outros campos relevantes
}

// Adicione outros tipos de entidades conforme a referência DXF
