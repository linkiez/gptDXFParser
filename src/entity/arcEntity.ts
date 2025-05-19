// arcEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseArcEntity(entity: DXFEntity): DXFEntity {
  return {
    ...entity,
    center: {
      x: toStr(entity['10']),
      y: toStr(entity['20']),
      z: toStr(entity['30']),
    },
    radius: toStr(entity['40']),
    startAngle: toStr(entity['50']),
    endAngle: toStr(entity['51']),
  };
}
