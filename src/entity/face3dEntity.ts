// face3dEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parse3DFaceEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    points: [
      {
        x: entity['10'],
        y: entity['20'],
        z: entity['30'],
      },
      {
        x: entity['11'],
        y: entity['21'],
        z: entity['31'],
      },
      {
        x: entity['12'],
        y: entity['22'],
        z: entity['32'],
      },
      {
        x: entity['13'],
        y: entity['23'],
        z: entity['33'],
      },
    ],
  };
}
