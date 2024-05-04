import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
export function createTwcComponent(el: keyof HTMLElementTagNameMap, options: { compose: (...args: any[]) => string }) {
return (strings: string | TemplateStringsArray, ...values: any[]) => {
const cls = String.raw({ raw: typeof strings === 'string' ? [strings] : strings }, ...values);

var root = $.template(`<${el}><!></${el}>`);

return function TwcComponent($$anchor, $$props) {
	$.push($$props, true);

	let props = $.rest_props($$props, ["children", "class"]);
	var div = root();
	let attributes;
	var node = $.child(div);

	$.snippet(() => $$props.children, node);

	$.render_effect(() => attributes = $.set_attributes(
		div,
		attributes,
		{
			...props,
			class: options.compose($$props.class, cls)
		},
		true,
		""
	));

	$.append($$anchor, div);
	$.pop();
}};
}
