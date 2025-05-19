// Tipos para entidades DXF de dimensão, leader, tolerância, etc.

export interface DimensionEntity {
  type: 'DIMENSION';
  layer?: string;
  color?: number;
  definitionPoint: { x: number; y: number; z?: number };
  text?: string;
  // ...outros campos relevantes
}

export interface LeaderEntity {
  type: 'LEADER';
  layer?: string;
  color?: number;
  vertices: { x: number; y: number; z?: number }[];
  // ...outros campos relevantes
}

export interface ToleranceEntity {
  type: 'TOLERANCE';
  layer?: string;
  color?: number;
  insertionPoint: { x: number; y: number; z?: number };
  direction: { x: number; y: number; z?: number };
  // ...outros campos relevantes
}
