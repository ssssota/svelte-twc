declare module 'svelte/internal/*' {
	declare function template(...values: any[]): any;
	declare function push(...values: any[]): any;
	declare function pop(...values: any[]): any;
	declare function child(...values: any[]): any;
	declare function rest_props(...values: any[]): any;
	declare function spread_attributes(...values: any[]): any;
	declare function set_attributes(...values: any[]): any;
	declare function template_effect(...values: any[]): any;
	declare function append(...values: any[]): any;
	declare function snippet(...values: any[]): any;
	declare function append(...values: any[]): any;
	declare function reset(...values: any[]): any;
	declare function noop(...values: any[]): any;
	export {
		append,
		child,
		noop,
		pop,
		push,
		reset,
		rest_props,
		set_attributes,
		snippet,
		spread_attributes,
		template,
		template_effect
	};
}
