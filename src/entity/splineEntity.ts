// splineEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseSplineEntity(entity: DXFEntity): DXFEntity | undefined {
  let knots: string[] = [];
  if (entity['40']) {
    if (Array.isArray(entity['40'])) {
      knots = (entity['40'] as any[]).filter(v => typeof v === 'string');
    } else if (typeof entity['40'] === 'string' || typeof entity['40'] === 'number') {
      knots = [String(entity['40'])];
    }
  }
  let arr10: string[] = [], arr20: string[] = [], arr30: string[] = [];
  if (entity['10']) {
    if (Array.isArray(entity['10'])) arr10 = (entity['10'] as any[]).filter(v => typeof v === 'string');
    else if (typeof entity['10'] === 'string') arr10 = [entity['10']];
  }
  if (entity['20']) {
    if (Array.isArray(entity['20'])) arr20 = (entity['20'] as any[]).filter(v => typeof v === 'string');
    else if (typeof entity['20'] === 'string') arr20 = [entity['20']];
  }
  if (entity['30']) {
    if (Array.isArray(entity['30'])) arr30 = (entity['30'] as any[]).filter(v => typeof v === 'string');
    else if (typeof entity['30'] === 'string') arr30 = [entity['30']];
  }
  let controlPoints: { x: string; y: string; z: string }[] = [];
  for (let idx = 0; idx < arr10.length; idx++) {
    if (arr10[idx] && arr20[idx] && arr30[idx]) {
      controlPoints.push({
        x: arr10[idx],
        y: arr20[idx],
        z: arr30[idx],
      });
    }
  }
  return {
    ...entity,
    knots,
    controlPoints,
  };
}
