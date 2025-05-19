// textEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseTextEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    point: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    text: entity['1'] as string,
    height: entity['40'],
  };
}
