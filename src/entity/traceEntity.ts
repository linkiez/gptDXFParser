// traceEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseTraceEntity(entity: DXFEntity): DXFEntity {
  return {
    ...entity,
    points: [
      {
        x: toStr(entity['10']),
        y: toStr(entity['20']),
        z: toStr(entity['30']),
      },
      {
        x: toStr(entity['11']),
        y: toStr(entity['21']),
        z: toStr(entity['31']),
      },
      {
        x: toStr(entity['12']),
        y: toStr(entity['22']),
        z: toStr(entity['32']),
      },
      {
        x: toStr(entity['13']),
        y: toStr(entity['23']),
        z: toStr(entity['33']),
      },
    ],
  };
}
