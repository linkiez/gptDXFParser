"use strict";
// dxfParserJson.ts
// Parser básico para converter DXF em JSON usando TypeScript
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDXF = parseDXF;
exports.dxfToJson = dxfToJson;
const fs = __importStar(require("fs"));
const blocksParser_1 = require("./src/parsers/blocksParser");
const entitiesParser_1 = require("./src/parsers/entitiesParser");
const headerParser_1 = require("./src/parsers/headerParser");
const objectsParser_1 = require("./src/parsers/objectsParser");
const tablesParser_1 = require("./src/parsers/tablesParser");
function parseDXF(filePath) {
    var _a, _b;
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    let i = 0;
    const dxf = {};
    while (i < lines.length) {
        const code = lines[i].trim();
        const value = lines[i + 1] ? lines[i + 1].trim() : '';
        if (code === '0' && value === 'SECTION') {
            const secCode = (_a = lines[i + 2]) === null || _a === void 0 ? void 0 : _a.trim();
            const secValue = (_b = lines[i + 3]) === null || _b === void 0 ? void 0 : _b.trim();
            if (secCode === '2') {
                switch (secValue) {
                    case 'HEADER': {
                        const { header, nextIndex } = (0, headerParser_1.parseHeader)(lines, i + 4);
                        dxf.HEADER = header;
                        i = nextIndex;
                        break;
                    }
                    case 'TABLES': {
                        const { tables, nextIndex } = (0, tablesParser_1.parseTables)(lines, i + 4);
                        dxf.TABLES = tables;
                        i = nextIndex;
                        break;
                    }
                    case 'BLOCKS': {
                        const { blocks, nextIndex } = (0, blocksParser_1.parseBlocks)(lines, i + 4);
                        dxf.BLOCKS = blocks;
                        i = nextIndex;
                        break;
                    }
                    case 'ENTITIES': {
                        const { entities, nextIndex } = (0, entitiesParser_1.parseEntities)(lines, i + 4);
                        dxf.ENTITIES = entities;
                        i = nextIndex;
                        break;
                    }
                    case 'OBJECTS': {
                        const { objects, nextIndex } = (0, objectsParser_1.parseObjects)(lines, i + 4);
                        dxf.OBJECTS = objects;
                        i = nextIndex;
                        break;
                    }
                    default:
                        i += 4;
                }
            }
            else {
                i += 2;
            }
        }
        else if (code === '0' && value === 'EOF') {
            break;
        }
        else {
            i += 2;
        }
    }
    return dxf;
}
function dxfToJson(inputPath, outputPath) {
    const dxf = parseDXF(inputPath);
    fs.writeFileSync(outputPath, JSON.stringify(dxf, null, 2));
    console.log(`Arquivo JSON gerado em: ${outputPath}`);
}
// Exemplo de uso:
// dxfToJson('arquivo.dxf', 'saida.json');
