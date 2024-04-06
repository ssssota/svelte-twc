// TwcComponent.svelte (Svelte v5.0.0-next.94)
// Note: compiler output will change before 5.0 is released!
import * as $ from "svelte/internal/server";
export function createTwcComponent(el: keyof HTMLElementTagNameMap, options: { compose: (...args: any[]) => string }) {
return (strings: TemplateStringsArray, ...values: any[]) => {
const cls = String.raw({ raw: strings }, ...values);

return function TwcComponent($$payload, $$props) {
	$.push(true);

	let { children, class: className, ...props } = $$props;

	$$payload.out += `<${el}${$.spread_attributes(
		[
			props,
			{ "class": options.compose(className, cls) }
		],
		true,
		false,
		""
	)}><!--[-->`;

	children?.($$payload);
	$$payload.out += `<!--]--></${el}>`;
	$.pop();
}};
}