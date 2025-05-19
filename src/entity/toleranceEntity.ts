// toleranceEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseToleranceEntity(entity: DXFEntity): DXFEntity | undefined {
  // TOLERANCE: entidade para cotas de tolerância geométrica
  return {
    ...entity,
    insertionPoint: {
      x: entity['10'],
      y: entity['20'],
      z: entity['30'],
    },
    direction: {
      x: entity['11'],
      y: entity['21'],
      z: entity['31'],
    },
    // Adicione outros campos relevantes conforme necessário
  };
}
