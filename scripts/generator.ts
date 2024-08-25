import { compile } from 'svelte/compiler';

const componentName = 'TwcComponent';
const functionName = 'createTwcComponent';
const replaceElement = 'div';
const classVariable = 'cls';

export function generate(mode: 'client' | 'server', typescript = false) {
	const { js } = compile(
		`
		<script>
			let { children, class: className, ...props } = $props();
		</script>
		<${replaceElement} {...props} class={COMPOSE(className, CLASS)}>{@render children?.()}</${replaceElement}>
	`,
		{ generate: mode, filename: `${componentName}.svelte` }
	);
	// return code if typescript is true, otherwise return empty string
	const ifTs = typescript ? (code: string) => code : (_code: string) => '';

	return js.code
		.replace(/CLASS/g, classVariable)
		.replace(/COMPOSE/g, 'options.compose')
		.replace(`<${replaceElement}`, '<${el}')
		.replace(`${replaceElement}>`, '${el}>')
		.replace(
			`import * as $ from "svelte/internal/${mode}";`,
			[
				'$&',
				`export function ${functionName}(el${ifTs(': keyof HTMLElementTagNameMap')}, options${ifTs(': { compose: (...args: any[]) => string }')}) {`,
				`return (strings${ifTs(': string | TemplateStringsArray')}, ...values${ifTs(': any[]')}) => {`,
				`const ${classVariable} = String.raw({ raw: typeof strings === 'string' ? [strings] : strings }, ...values);`
			].join('\n')
		)
		.replace('export default', 'return')
		.replace(/$/, '};\n}\n');
}
