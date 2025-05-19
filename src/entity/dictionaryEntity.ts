// dictionaryEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseDictionaryEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
