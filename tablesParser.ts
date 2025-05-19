// tablesParser.ts
// Função para parsear a seção TABLES do DXF

import { DXFEntity } from './dxfParserJson';

export function parseTables(lines: string[], startIndex: number): { tables: DXFEntity[]; nextIndex: number } {
  const tables: DXFEntity[] = [];
  let i = startIndex;
  let current: DXFEntity | null = null;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    if (code === '0' && value === 'ENDSEC') {
      if (current) tables.push(current);
      i += 2;
      break;
    }
    if (code === '0' && value.startsWith('TABLE')) {
      if (current) tables.push(current);
      current = { type: value };
    } else if (code === '0' && value === 'ENDTAB') {
      if (current) tables.push(current);
      current = null;
    } else if (current) {
      current[code] = value;
    }
    i += 2;
  }
  if (current) tables.push(current);
  return { tables, nextIndex: i };
}
