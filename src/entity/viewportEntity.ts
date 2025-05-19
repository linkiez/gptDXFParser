// viewportEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseViewportEntity(entity: DXFEntity): DXFEntity {
  return {
    ...entity,
    center: {
      x: toStr(entity['10']),
      y: toStr(entity['20']),
      z: toStr(entity['30']),
    },
    width: toStr(entity['40']),
    height: toStr(entity['41']),
    viewCenter: {
      x: toStr(entity['12']),
      y: toStr(entity['22']),
    },
    viewTarget: {
      x: toStr(entity['17']),
      y: toStr(entity['27']),
      z: toStr(entity['37']),
    },
    viewHeight: toStr(entity['45']),
    snapAngle: toStr(entity['50']),
    twistAngle: toStr(entity['51']),
  };
}
