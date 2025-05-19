// rayEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseRayEntity(entity: DXFEntity): DXFEntity {
  return {
    ...entity,
    point: {
      x: toStr(entity['10']),
      y: toStr(entity['20']),
      z: toStr(entity['30']),
    },
    direction: {
      x: toStr(entity['11']),
      y: toStr(entity['21']),
      z: toStr(entity['31']),
    },
  };
}
