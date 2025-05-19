// mleaderstyleEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseMLeaderStyleEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
