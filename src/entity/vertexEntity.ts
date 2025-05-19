// vertexEntity.ts
// Parser para entidade VERTEX (usada em POLYLINE)
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseVertexEntity(entity: DXFEntity): DXFEntity | undefined {
  // Extrai coordenadas e outros dados relevantes do VERTEX
  return {
    ...entity,
    x: entity['10'],
    y: entity['20'],
    z: entity['30'],
    // Adicione outros campos relevantes do VERTEX conforme necessário
  };
}
