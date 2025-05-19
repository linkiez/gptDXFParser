// leaderEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseLeaderEntity(entity: DXFEntity): DXFEntity {
  return { ...entity };
}
