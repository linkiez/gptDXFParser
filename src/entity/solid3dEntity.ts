// solid3dEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseSolid3dEntity(entity: DXFEntity): DXFEntity | undefined {
  // 3DSOLID: entidade de sólido 3D, geralmente contém apenas handle, layer e dados binários
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
