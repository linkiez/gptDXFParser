// viewEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseViewEntity(entity: DXFEntity): DXFEntity | undefined {
  // VIEW: entidade de vista, usada em tabelas e layouts
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
