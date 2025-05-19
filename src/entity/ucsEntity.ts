// ucsEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseUcsEntity(entity: DXFEntity): DXFEntity | undefined {
  // UCS: entidade de sistema de coordenadas do usuário
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
