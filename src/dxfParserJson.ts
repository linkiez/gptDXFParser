// dxfParserJson.ts
// Parser básico para converter DXF em JSON usando TypeScript

import * as fs from 'fs';
import { parseBlocks } from './parsers/blocksParser';
import { parseEntities } from './parsers/entitiesParser';
import { parseHeader } from './parsers/headerParser';
import { parseObjects } from './parsers/objectsParser';
import { parseTables } from './parsers/tablesParser';

export interface DXFEntity {
  type: string;
  [key: string]: string | number | boolean | DXFEntity | DXFEntity[] | { [key: string]: any } | undefined;
}

export interface DXFSection {
  [key: string]: DXFEntity[];
}

export function parseDXF(filePath: string): DXFSection {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  let i = 0;
  const dxf: DXFSection = {};
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    if (code === '0' && value === 'SECTION') {
      const secCode = lines[i + 2]?.trim();
      const secValue = lines[i + 3]?.trim();
      if (secCode === '2') {
        switch (secValue) {
          case 'HEADER': {
            const { header, nextIndex } = parseHeader(lines, i + 4);
            dxf.HEADER = header;
            i = nextIndex;
            break;
          }
          case 'TABLES': {
            const { tables, nextIndex } = parseTables(lines, i + 4);
            dxf.TABLES = tables;
            i = nextIndex;
            break;
          }
          case 'BLOCKS': {
            const { blocks, nextIndex } = parseBlocks(lines, i + 4);
            dxf.BLOCKS = blocks;
            i = nextIndex;
            break;
          }
          case 'ENTITIES': {
            const { entities, nextIndex } = parseEntities(lines, i + 4);
            dxf.ENTITIES = entities;
            i = nextIndex;
            break;
          }
          case 'OBJECTS': {
            const { objects, nextIndex } = parseObjects(lines, i + 4);
            dxf.OBJECTS = objects;
            i = nextIndex;
            break;
          }
          default:
            i += 4;
        }
      } else {
        i += 2;
      }
    } else if (code === '0' && value === 'EOF') {
      break;
    } else {
      i += 2;
    }
  }
  return dxf;
}

export function dxfToJson(inputPath: string, outputPath: string): void {
  const dxf = parseDXF(inputPath);
  fs.writeFileSync(outputPath, JSON.stringify(dxf, null, 2));
  console.log(`Arquivo JSON gerado em: ${outputPath}`);
}

// Exemplo de uso:
// dxfToJson('arquivo.dxf', 'saida.json');
