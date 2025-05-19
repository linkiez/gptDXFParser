// blocksParser.ts
// Função para parsear a seção BLOCKS do DXF

import { DXFEntity } from '../dxfParserJson';
import { parseAppidEntity } from '../entity/appidEntity';
import { parseArcEntity } from '../entity/arcEntity';
import { parseAttdefEntity } from '../entity/attdefEntity';
import { parseAttribEntity } from '../entity/attribEntity';
import { parseBodyEntity } from '../entity/bodyEntity';
import { parseCircleEntity } from '../entity/circleEntity';
import { parseDimensionEntity } from '../entity/dimensionEntity';
import { parseEllipseEntity } from '../entity/ellipseEntity';
import { parse3DFaceEntity } from '../entity/face3dEntity';
import { parseHatchEntity } from '../entity/hatchEntity';
import { parseImageEntity } from '../entity/imageEntity';
import { parseInsertEntity } from '../entity/insertEntity';
import { parseLeaderEntity } from '../entity/leaderEntity';
import { parseLineEntity } from '../entity/lineEntity';
import { parseLwPolylineEntity } from '../entity/lwpolylineEntity';
import { parseMLineEntity } from '../entity/mlineEntity';
import { parseMTextEntity } from '../entity/mtextEntity';
import { parsePointEntity } from '../entity/pointEntity';
import { parsePolylineEntity } from '../entity/polylineEntity';
import { parseRayEntity } from '../entity/rayEntity';
import { parseRegionEntity } from '../entity/regionEntity';
import { parseSeqendEntity } from '../entity/seqendEntity';
import { parseShapeEntity } from '../entity/shapeEntity';
import { parseSolid3dEntity } from '../entity/solid3dEntity';
import { parseSolidEntity } from '../entity/solidEntity';
import { parseSplineEntity } from '../entity/splineEntity';
import { parseStyleEntity } from '../entity/styleEntity';
import { parseTextEntity } from '../entity/textEntity';
import { parseToleranceEntity } from '../entity/toleranceEntity';
import { parseTraceEntity } from '../entity/traceEntity';
import { parseUcsEntity } from '../entity/ucsEntity';
import { parseVertexEntity } from '../entity/vertexEntity';
import { parseViewEntity } from '../entity/viewEntity';
import { parseViewportEntity } from '../entity/viewportEntity';
import { parseWipeoutEntity } from '../entity/wipeoutEntity';
import { parseXLineEntity } from '../entity/xlineEntity';

// Estrutura detalhada para BLOCKS: BLOCK, ENDBLK e entidades internas (ex: INSERT, LINE, etc)
// Referência: DXF PDF seção BLOCKS

export interface DXFBlock {
  type: 'BLOCK' | 'ENDBLK';
  name?: string;
  layer?: string;
  basePoint?: { x?: number; y?: number; z?: number };
  entities?: DXFEntity[];
  [key: string]: any;
}

function parseBlockEntity(lines: string[], startIndex: number): { entity: DXFEntity; nextIndex: number } {
  const entity: DXFEntity = { type: lines[startIndex + 1]?.trim() };
  let i = startIndex + 2;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    if (code === '0') break;
    entity[code] = value;
    i += 2;
  }
  return { entity, nextIndex: i };
}

function parseBlockProperties(current: DXFBlock, code: string, value: string) {
  if (code === '2') current.name = value;
  else if (code === '8') current.layer = value;
  else if (code === '10') current.basePoint = { ...(current.basePoint || {}), x: parseFloat(value) };
  else if (code === '20') current.basePoint = { ...(current.basePoint || {}), y: parseFloat(value) };
  else if (code === '30') current.basePoint = { ...(current.basePoint || {}), z: parseFloat(value) };
  else current[code] = value;
}

function isBlockEntityType(type: string): boolean {
  // Conforme PDF, entidades comuns em BLOCKS: INSERT, LINE, CIRCLE, ARC, POLYLINE, LWPOLYLINE, TEXT, MTEXT, etc
  const types = [
    'INSERT', 'LINE', 'CIRCLE', 'ARC', 'POLYLINE', 'LWPOLYLINE', 'TEXT', 'MTEXT', 'POINT', 'ELLIPSE', 'SPLINE', 'SOLID', '3DFACE', 'VERTEX', 'SEQEND', 'ATTRIB', 'ATTDEF', 'HATCH', 'IMAGE', 'DIMENSION', 'LEADER', 'MLINE', 'XLINE', 'RAY', 'SHAPE', 'TRACE', 'VIEWPORT', 'WIPEOUT'
  ];
  return types.includes(type);
}

const entityParsers: { [type: string]: (entity: DXFEntity) => DXFEntity | DXFEntity[] | undefined } = {
  ARC: parseArcEntity,
  CIRCLE: parseCircleEntity,
  LINE: parseLineEntity,
  POINT: parsePointEntity,
  TEXT: parseTextEntity,
  MTEXT: parseMTextEntity,
  ELLIPSE: parseEllipseEntity,
  SPLINE: parseSplineEntity,
  HATCH: parseHatchEntity,
  INSERT: parseInsertEntity,
  SOLID: parseSolidEntity,
  '3DFACE': parse3DFaceEntity,
  LWPOLYLINE: parseLwPolylineEntity,
  POLYLINE: (entity) => parsePolylineEntity(entity),
  VERTEX: parseVertexEntity,
  SEQEND: parseSeqendEntity,
  ATTRIB: parseAttribEntity,
  ATTDEF: parseAttdefEntity,
  DIMENSION: parseDimensionEntity,
  LEADER: parseLeaderEntity,
  IMAGE: parseImageEntity,
  XLINE: parseXLineEntity,
  RAY: parseRayEntity,
  TRACE: parseTraceEntity,
  MLINE: parseMLineEntity,
  VIEWPORT: parseViewportEntity,
  SHAPE: parseShapeEntity,
  WIPEOUT: parseWipeoutEntity,
  TOLERANCE: parseToleranceEntity,
  REGION: parseRegionEntity,
  BODY: parseBodyEntity,
  '3DSOLID': parseSolid3dEntity,
  VIEW: parseViewEntity,
  UCS: parseUcsEntity,
  APPID: parseAppidEntity,
  STYLE: parseStyleEntity,
};

function parseBlockEntityTyped(entity: DXFEntity): DXFEntity | DXFEntity[] | undefined {
  const parser = entityParsers[entity.type];
  const result = parser ? parser(entity) : entity;
  if (typeof result === 'string') {
    try {
      return JSON.parse(result);
    } catch {
      return { ...entity, _raw: result };
    }
  }
  return result;
}

function handleBlockStart(current: DXFBlock | null, blocks: DXFBlock[]): DXFBlock {
  if (current) blocks.push(current);
  return { type: 'BLOCK', entities: [] };
}

function handleBlockEnd(current: DXFBlock | null, blocks: DXFBlock[]): DXFBlock {
  if (current) blocks.push(current);
  return { type: 'ENDBLK' };
}

function processBlockEntity(
  lines: string[],
  i: number,
  current: DXFBlock
): { nextIndex: number } {
  const { entity, nextIndex } = parseBlockEntity(lines, i);
  const parsed = parseBlockEntityTyped(entity);
  if (parsed !== undefined) {
    current.entities ??= [];
    if (Array.isArray(parsed)) {
      current.entities.push(...parsed);
    } else {
      current.entities.push(parsed);
    }
  }
  return { nextIndex };
}

function processBlockLine(
  code: string,
  value: string,
  current: DXFBlock | null,
  blocks: DXFBlock[],
  inBlock: boolean,
  lines: string[],
  i: number
): { current: DXFBlock | null; inBlock: boolean; nextIndex: number } {
  if (code === '0' && value === 'ENDSEC') {
    if (current) blocks.push(current);
    return { current, inBlock, nextIndex: i + 2 };
  }
  if (code === '0' && value === 'BLOCK') {
    current = handleBlockStart(current, blocks);
    inBlock = true;
    return { current, inBlock, nextIndex: i + 2 };
  }
  if (code === '0' && value === 'ENDBLK') {
    current = handleBlockEnd(current, blocks);
    inBlock = false;
    return { current, inBlock, nextIndex: i + 2 };
  }
  if (inBlock && current) {
    if (code === '0') {
      const { nextIndex } = processBlockEntity(lines, i, current);
      return { current, inBlock, nextIndex };
    } else {
      parseBlockProperties(current, code, value);
    }
  }
  return { current, inBlock, nextIndex: i + 2 };
}

export function parseBlocks(lines: string[], startIndex: number): { blocks: DXFBlock[]; nextIndex: number } {
  const blocks: DXFBlock[] = [];
  let i = startIndex;
  let current: DXFBlock | null = null;
  let inBlock = false;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    const result = processBlockLine(code, value, current, blocks, inBlock, lines, i);
    current = result.current;
    inBlock = result.inBlock;
    if (result.nextIndex !== i + 2) {
      i = result.nextIndex;
      continue;
    }
    i += 2;
    if (code === '0' && value === 'ENDSEC') break;
  }
  if (current) blocks.push(current);
  return { blocks, nextIndex: i };
}
