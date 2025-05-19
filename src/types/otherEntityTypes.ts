// Tipos para entidades DXF de spline, xline, ray, trace, etc.

export interface SplineEntity {
  type: 'SPLINE';
  layer?: string;
  color?: number;
  knots: number[];
  controlPoints: { x: number; y: number; z?: number }[];
  // ...outros campos relevantes
}

export interface XLineEntity {
  type: 'XLINE';
  layer?: string;
  color?: number;
  point: { x: number; y: number; z?: number };
  direction: { x: number; y: number; z?: number };
  // ...outros campos relevantes
}

export interface RayEntity {
  type: 'RAY';
  layer?: string;
  color?: number;
  point: { x: number; y: number; z?: number };
  direction: { x: number; y: number; z?: number };
  // ...outros campos relevantes
}

export interface TraceEntity {
  type: 'TRACE';
  layer?: string;
  color?: number;
  points: { x: number; y: number; z?: number }[];
  // ...outros campos relevantes
}
