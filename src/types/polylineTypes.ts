// Tipos para entidades DXF - Polyline, LwPolyline, Vertex, etc.

export interface PolylineEntity {
  type: 'POLYLINE';
  layer?: string;
  color?: number;
  vertices: VertexEntity[];
  closed?: boolean;
  // ...outros campos relevantes
}

export interface LwPolylineEntity {
  type: 'LWPOLYLINE';
  layer?: string;
  color?: number;
  vertices: LwVertexEntity[];
  closed?: boolean;
  // ...outros campos relevantes
}

export interface VertexEntity {
  x: number;
  y: number;
  z?: number;
  bulge?: number;
  // ...outros campos relevantes
}

export interface LwVertexEntity {
  x: number;
  y: number;
  bulge?: number;
  // ...outros campos relevantes
}
