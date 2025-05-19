// ellipseEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseEllipseEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    center: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    majorAxisEndPoint: {
      x: entity['11'],
      y: entity['21'],
      z: entity['31'],
    },
    axisRatio: entity['40'],
    startParam: entity['41'],
    endParam: entity['42'],
  };
}
