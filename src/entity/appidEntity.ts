// appidEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseAppidEntity(entity: DXFEntity): DXFEntity | undefined {
  // APPID: entidade de identificador de aplicação
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
