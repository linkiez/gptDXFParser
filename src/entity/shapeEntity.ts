// shapeEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseShapeEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    name: entity['2'],
    point: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    size: entity['40'],
    rotation: entity['50'],
  };
}
