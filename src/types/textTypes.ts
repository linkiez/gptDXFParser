// Tipos para entidades DXF de texto: TEXT, MTEXT, ATTRIB, ATTDEF

export interface TextEntity {
  type: 'TEXT';
  layer?: string;
  color?: number;
  point: { x: number; y: number; z?: number };
  text: string;
  height: number;
  rotation?: number;
  // ...outros campos relevantes
}

export interface MTextEntity {
  type: 'MTEXT';
  layer?: string;
  color?: number;
  point: { x: number; y: number; z?: number };
  text: string;
  height: number;
  width?: number;
  rotation?: number;
  // ...outros campos relevantes
}

export interface AttribEntity {
  type: 'ATTRIB';
  layer?: string;
  color?: number;
  point: { x: number; y: number; z?: number };
  text: string;
  height: number;
  // ...outros campos relevantes
}

export interface AttdefEntity {
  type: 'ATTDEF';
  layer?: string;
  color?: number;
  point: { x: number; y: number; z?: number };
  text: string;
  height: number;
  // ...outros campos relevantes
}
