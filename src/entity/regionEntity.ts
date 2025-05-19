// regionEntity.ts
import { DXFEntity } from '../dxfParserJson';

export function parseRegionEntity(entity: DXFEntity): DXFEntity | undefined {
  // REGION: entidade de região 2D, geralmente não possui muitos dados diretos além de handle e layer
  return {
    ...entity,
    // Adicione campos relevantes se necessário
  };
}
