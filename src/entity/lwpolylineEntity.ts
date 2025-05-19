// lwpolylineEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseLwPolylineEntity(entity: DXFEntity): DXFEntity {
  let lwVertices: { x: string; y: string }[] = [];
  if (entity['10'] && entity['20']) {
    let arr10: string[] = [], arr20: string[] = [];
    if (Array.isArray(entity['10'])) arr10 = (entity['10'] as any[]).filter(v => typeof v === 'string');
    else if (typeof entity['10'] === 'string') arr10 = [entity['10']];
    if (Array.isArray(entity['20'])) arr20 = (entity['20'] as any[]).filter(v => typeof v === 'string');
    else if (typeof entity['20'] === 'string') arr20 = [entity['20']];
    for (let idx = 0; idx < arr10.length; idx++) {
      lwVertices.push({
        x: toStr(arr10[idx]) ?? '',
        y: toStr(arr20[idx]) ?? '',
      });
    }
  }
  return {
    ...entity,
    vertices: lwVertices,
  };
}
