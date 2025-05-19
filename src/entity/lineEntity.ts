// lineEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseLineEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    start: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    end: {
      x: entity['11'],
      y: entity['21'],
      z: entity['31'],
    },
  };
}
