// hatchEntity.ts
import { DXFEntity } from '../dxfParserJson';

function toStr(val: unknown): string | undefined {
  if (typeof val === 'string' || typeof val === 'number') return String(val);
  return undefined;
}

export function parseHatchEntity(entity: DXFEntity): DXFEntity | undefined {
  return {
    ...entity,
    pattern: entity['2'],
    elevation: entity['30'],
    solid: entity['70'] === '1',
  };
}
