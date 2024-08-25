import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generate } from './generator';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

await main();
async function main() {
	for (const mode of ['client', 'server'] as const) {
		const code = generate(mode, true);
		await fs.writeFile(path.resolve(root, `src/internal/${mode}.ts`), code);
	}
}
