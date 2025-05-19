// headerParser.ts
// Função para parsear a seção HEADER do DXF

import { DXFEntity } from '../dxfParserJson';

// Mapeamento para variáveis conhecidas do HEADER (exemplo de expansão)
const headerVarParsers: { [name: string]: (entity: DXFEntity) => DXFEntity } = {
  // Exemplo: $ACADVER, $INSBASE, $EXTMIN, $EXTMAX, etc.
  // '$ACADVER': (entity) => ({ ...entity, version: entity['1'] }),
  // '$INSBASE': (entity) => ({ ...entity, base: { x: entity['10'], y: entity['20'], z: entity['30'] } }),
  // Adicione outros conforme necessário
};

function parseHeaderVar(entity: DXFEntity): DXFEntity {
  if (typeof entity.name === 'string') {
    const parser = headerVarParsers[entity.name];
    return parser ? parser(entity) : entity;
  }
  return entity;
}

function processHeaderLine(
  code: string,
  value: string,
  current: DXFEntity | null,
  header: DXFEntity[]
): DXFEntity | null {
  if (code === '0' && value === 'ENDSEC') {
    if (current) header.push(parseHeaderVar(current));
    return null;
  }
  if (code === '9') {
    if (current) header.push(parseHeaderVar(current));
    return { type: 'HEADER_VAR', name: value };
  }
  if (current) {
    current[code] = value;
  }
  return current;
}

export function parseHeader(lines: string[], startIndex: number): { header: DXFEntity[]; nextIndex: number } {
  const header: DXFEntity[] = [];
  let i = startIndex;
  let current: DXFEntity | null = null;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    current = processHeaderLine(code, value, current, header);
    if (code === '0' && value === 'ENDSEC') {
      i += 2;
      break;
    }
    i += 2;
  }
  if (current) header.push(parseHeaderVar(current));
  return { header, nextIndex: i };
}
