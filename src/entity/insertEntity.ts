// insertEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseInsertEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    blockName: entity['2'],
    insertionPoint: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    scale: {
      x: entity['41'] ?? 1,
      y: entity['42'] ?? 1,
      z: entity['43'] ?? 1,
    },
    rotation: entity['50'] ?? 0,
  };
}
