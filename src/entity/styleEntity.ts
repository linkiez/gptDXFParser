// styleEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseStyleEntity(entity: DXFEntity): DXFEntity | undefined {
  // STYLE: entidade de estilo de texto
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
