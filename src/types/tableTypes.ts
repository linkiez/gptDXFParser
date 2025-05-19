// Tipos para entidades DXF de UCS, View, Style, AppId

export interface UcsEntity {
  type: 'UCS';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}

export interface ViewEntity {
  type: 'VIEW';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}

export interface StyleEntity {
  type: 'STYLE';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}

export interface AppidEntity {
  type: 'APPID';
  handle: string;
  ownerHandle?: string;
  // ...outros campos relevantes
}
