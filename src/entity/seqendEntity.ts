// seqendEntity.ts
// Parser para entidade SEQEND (marca fim de sequência de VERTEX em POLYLINE)
import { DXFEntity } from '../dxfParserJson';

export function parseSeqendEntity(entity: DXFEntity): DXFEntity | undefined {
  // Normalmente não há dados relevantes, mas pode ser útil para debug ou extensão futura
  return {
    ...entity
  };
}
