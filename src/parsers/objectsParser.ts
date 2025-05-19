// objectsParser.ts
// Função para parsear a seção OBJECTS do DXF

import { DXFEntity } from '../dxfParserJson';

// Mapeamento de parsers para objetos DXF (exemplo: DICTIONARY, LAYOUT, MLEADERSTYLE, etc)
import { parseAppidEntity } from '../entity/appidEntity';
import { parseBodyEntity } from '../entity/bodyEntity';
import { parseDictionaryEntity } from '../entity/dictionaryEntity';
import { parseLayoutEntity } from '../entity/layoutEntity';
import { parseMLeaderStyleEntity } from '../entity/mleaderstyleEntity';
import { parseRegionEntity } from '../entity/regionEntity';
import { parseSolid3dEntity } from '../entity/solid3dEntity';
import { parseStyleEntity } from '../entity/styleEntity';
import { parseUcsEntity } from '../entity/ucsEntity';
import { parseViewEntity } from '../entity/viewEntity';

const objectParsers: { [type: string]: (entity: DXFEntity) => DXFEntity | DXFEntity[] | undefined } = {
  APPID: parseAppidEntity,
  UCS: parseUcsEntity,
  VIEW: parseViewEntity,
  STYLE: parseStyleEntity,
  REGION: parseRegionEntity,
  BODY: parseBodyEntity,
  '3DSOLID': parseSolid3dEntity,
  DICTIONARY: parseDictionaryEntity,
  LAYOUT: parseLayoutEntity,
  MLEADERSTYLE: parseMLeaderStyleEntity,
  // Adicione outros parsers de objetos DXF conforme necessário
};

function parseObjectEntity(entity: DXFEntity): DXFEntity {
  const parser = objectParsers[entity.type];
  if (!parser) return entity;
  const parsed = parser(entity);
  if (typeof parsed === 'string') return JSON.parse(parsed);
  if (Array.isArray(parsed)) return parsed[0];
  return entity;
}

function processObjectLine(
  code: string,
  value: string,
  current: DXFEntity | null,
  objects: DXFEntity[]
): DXFEntity | null {
  if (code === '0' && value === 'ENDSEC') {
    if (current) objects.push(parseObjectEntity(current));
    return null;
  }
  if (code === '0' && value !== 'ENDSEC') {
    if (current) objects.push(parseObjectEntity(current));
    return { type: value };
  }
  if (current) {
    current[code] = value;
  }
  return current;
}

export function parseObjects(lines: string[], startIndex: number): { objects: DXFEntity[]; nextIndex: number } {
  const objects: DXFEntity[] = [];
  let i = startIndex;
  let current: DXFEntity | null = null;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    current = processObjectLine(code, value, current, objects);
    if (code === '0' && value === 'ENDSEC') {
      i += 2;
      break;
    }
    i += 2;
  }
  if (current) objects.push(parseObjectEntity(current));
  return { objects, nextIndex: i };
}
