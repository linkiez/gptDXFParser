// bodyEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseBodyEntity(entity: DXFEntity): DXFEntity | undefined {
  // BODY: entidade de corpo 3D, geralmente contém apenas handle, layer e dados binários
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
