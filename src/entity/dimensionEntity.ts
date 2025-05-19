// dimensionEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseDimensionEntity(entity: DXFEntity): DXFEntity {
  return { ...entity };
}
