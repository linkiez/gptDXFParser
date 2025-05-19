// circleEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseCircleEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    center: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    radius: entity['40'],
  };
}
