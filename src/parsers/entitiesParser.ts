// entitiesParser.ts
// Função para parsear a seção ENTITIES do DXF

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

// Função para identificar e parsear entidades específicas da seção ENTITIES
function parseEntity(lines: string[], startIndex: number): { entity: DXFEntity; nextIndex: number } {
  const type = lines[startIndex + 1]?.trim();
  const entity: DXFEntity = { type };
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

// Mapeamento de tipo para parser
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
  POLYLINE: parsePolylineEntity,
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

// Função para parsear entidades específicas usando parsers modulares
function parseSpecificEntity(type: string, entity: DXFEntity): DXFEntity | DXFEntity[] | undefined {
  const parser = entityParsers[type];
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

// Função auxiliar para parsear POLYLINE (com VERTEX/SEQEND)
function parsePolyline(lines: string[], startIndex: number): { polyline: DXFEntity & { vertices: DXFEntity[] }; nextIndex: number } {
  const polyline: DXFEntity & { vertices: DXFEntity[] } = { type: lines[startIndex + 1]?.trim(), vertices: [] };
  let i = startIndex + 2;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    if (code === '0' && value === 'VERTEX') {
      const { entity: vertex, nextIndex } = parseEntity(lines, i);
      polyline.vertices.push(vertex);
      i = nextIndex;
    } else if (code === '0' && value === 'SEQEND') {
      i += 2;
      break;
    } else if (code === '0') {
      break;
    } else {
      polyline[code] = value;
      i += 2;
    }
  }
  return { polyline, nextIndex: i };
}

// Função auxiliar para finalizar e adicionar a entidade atual
function finalizeCurrentEntity(current: DXFEntity | null, entities: DXFEntity[]) {
  if (current) {
    const parsed = parseSpecificEntity(current.type, current);
    if (parsed !== undefined) {
      if (Array.isArray(parsed)) {
        parsed.forEach(e => {
          if (typeof e === 'string') entities.push(JSON.parse(e));
          else entities.push(e);
        });
      } else {
        entities.push(parsed);
      }
    }
  }
}

// Função auxiliar para processar uma linha de entidade
function processEntityLine(
  code: string,
  value: string,
  current: DXFEntity | null
): DXFEntity | null {
  if (current) {
    current[code] = value;
  }
  return current;
}

// Função detalhada para parsear a seção ENTITIES com suporte a subentidades (ex: POLYLINE -> VERTEX -> SEQEND)
export function parseEntities(lines: string[], startIndex: number): { entities: DXFEntity[]; nextIndex: number } {
  const entities: DXFEntity[] = [];
  let i = startIndex;
  let current: DXFEntity | null = null;
  while (i < lines.length) {
    const code = lines[i].trim();
    const value = lines[i + 1] ? lines[i + 1].trim() : '';
    if (code === '0') {
      finalizeCurrentEntity(current, entities);
      current = null;
      if (value === 'ENDSEC') {
        i += 2;
        break;
      }
      if (value === 'POLYLINE' || value === 'LWPOLYLINE') {
        const { polyline, nextIndex } = parsePolyline(lines, i);
        entities.push(polyline);
        i = nextIndex;
        continue;
      }
      current = { type: value };
    } else {
      current = processEntityLine(code, value, current);
    }
    i += 2;
  }
  finalizeCurrentEntity(current, entities);
  return { entities, nextIndex: i };
}
