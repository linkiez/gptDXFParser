// Tipos para entidades DXF de hachura, imagem, etc.

export interface HatchEntity {
  type: 'HATCH';
  layer?: string;
  color?: number;
  pattern: string;
  elevation?: number;
  solid?: boolean;
  // ...outros campos relevantes
}

export interface ImageEntity {
  type: 'IMAGE';
  layer?: string;
  color?: number;
  insertionPoint: { x: number; y: number; z?: number };
  uVector: { x: number; y: number };
  vVector: { x: number; y: number };
  size: { x: number; y: number };
  imageDefHandle: string;
  // ...outros campos relevantes
}
