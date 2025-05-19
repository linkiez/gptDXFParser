// Tipos para entidades DXF de region, body, 3dsolid, etc.

export interface RegionEntity {
  type: 'REGION';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}

export interface BodyEntity {
  type: 'BODY';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}

export interface Solid3dEntity {
  type: '3DSOLID';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}
