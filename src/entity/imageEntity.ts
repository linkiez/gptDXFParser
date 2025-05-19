// imageEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseImageEntity(entity: DXFEntity): DXFEntity {
  return { ...entity };
}
