// Tipos para entidades DXF de objetos: Dictionary, Layout, MLeaderStyle, etc.

export interface DictionaryEntity {
  type: 'DICTIONARY';
  handle: string;
  ownerHandle?: string;
  entries?: { [key: string]: string };
  // ...outros campos relevantes
}

export interface LayoutEntity {
  type: 'LAYOUT';
  handle: string;
  ownerHandle?: string;
  name: string;
  // ...outros campos relevantes
}

export interface MLeaderStyleEntity {
  type: 'MLEADERSTYLE';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}
