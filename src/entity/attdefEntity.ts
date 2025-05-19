// attdefEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseAttdefEntity(entity: DXFEntity): DXFEntity {
  return {
    ...entity,
    tag: entity['2'],
    prompt: entity['3'],
    defaultValue: entity['1'],
    point: {
      x: toStr(entity['10']),
      y: toStr(entity['20']),
      z: toStr(entity['30']),
    },
    height: toStr(entity['40']),
  };
}
