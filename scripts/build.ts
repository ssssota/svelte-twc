import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'svelte/compiler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const componentName = 'TwcComponent';
const functionName = 'createTwcComponent';
const replaceElement = 'div';
const classVariable = 'cls';

await main();
async function main() {
	await Promise.all([generate('client'), generate('server')]);
}

function generate(mode: 'client' | 'server') {
	const { js } = compile(
		`
		<script>
			let { children, class: className, ...props } = $props();
		</script>
		<${replaceElement} {...props} class={COMPOSE(className, CLASS)}>{@render children?.()}</${replaceElement}>
	`,
		{ generate: mode, filename: `${componentName}.svelte` }
	);

	return fs.writeFile(
		path.resolve(root, `src/internal/${mode}.ts`),
		js.code
			.replace(/CLASS/g, classVariable)
			.replace(/COMPOSE/g, 'options.compose')
			.replace(`<${replaceElement}`, '<${el}')
			.replace(`${replaceElement}>`, '${el}>')
			.replace(
				`import * as $ from "svelte/internal/${mode}";`,
				[
					'$&',
					`export function ${functionName}(el: keyof HTMLElementTagNameMap, options: { compose: (...args: any[]) => string }) {`,
					'return (strings: string | TemplateStringsArray, ...values: any[]) => {',
					`const ${classVariable} = String.raw({ raw: typeof strings === 'string' ? [strings] : strings }, ...values);`
				].join('\n')
			)
			.replace('export default', 'return')
			.replace(/$/, '};\n}\n')
	);
}
