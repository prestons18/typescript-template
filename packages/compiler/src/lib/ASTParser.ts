import { ParseResult } from 'src/types.js';
import { transformSync } from '@swc/core';
import { IDGenerator } from './IDGenerator.js';

export class ASTParser {
  private ids: string[] = [];
  private idGenerator: IDGenerator = new IDGenerator();

  public async parseAndTransform(
    code: string,
    filename: string
  ): Promise<ParseResult> {
    this.ids = [];

    const result = transformSync(code, {
      filename,
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: { runtime: 'automatic' },
        },
      },
      plugin: (m) => this.visitor(m, filename),
    });

    return {
      transformedCode: result.code!,
      ids: this.ids,
    };
  }

  private visitor(m: any, filename: string) {
    // TODO: Traverse AST
    // Replace JSXText or string lit props with __impress_content
    // Generate IDs using IDGenerator
    return m;
  }
}
