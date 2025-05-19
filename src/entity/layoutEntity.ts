// layoutEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseLayoutEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
