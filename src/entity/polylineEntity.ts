// polylineEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parsePolylineEntity(entity: DXFEntity): DXFEntity {
  return {
    ...entity,
    // vertices: entity.vertices (já está presente se for POLYLINE)
  };
}
