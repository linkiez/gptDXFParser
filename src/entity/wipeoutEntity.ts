// wipeoutEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseWipeoutEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    insertionPoint: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    uVector: {
      x: entity['11'],
      y: entity['21'],
    },
    vVector: {
      x: entity['12'],
      y: entity['22'],
    },
    size: {
      x: entity['13'],
      y: entity['23'],
    },
    displayProps: entity['280'],
  };
}
