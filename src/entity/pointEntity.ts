// pointEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parsePointEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    point: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
  };
}
