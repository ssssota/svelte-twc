import type { Component, ComponentProps } from 'svelte';
import type {
	HTMLAnchorAttributes,
	HTMLAreaAttributes,
	HTMLAttributes,
	HTMLAudioAttributes,
	HTMLBaseAttributes,
	HTMLBlockquoteAttributes,
	HTMLButtonAttributes,
	HTMLCanvasAttributes,
	HTMLColAttributes,
	HTMLColgroupAttributes,
	HTMLDataAttributes,
	HTMLDelAttributes,
	HTMLDetailsAttributes,
	HTMLDialogAttributes,
	HTMLEmbedAttributes,
	HTMLFieldsetAttributes,
	HTMLFormAttributes,
	HTMLHtmlAttributes,
	HTMLIframeAttributes,
	HTMLImgAttributes,
	HTMLInputAttributes,
	HTMLInsAttributes,
	HTMLKeygenAttributes,
	HTMLLabelAttributes,
	HTMLLiAttributes,
	HTMLLinkAttributes,
	HTMLMapAttributes,
	HTMLMenuAttributes,
	HTMLMetaAttributes,
	HTMLMeterAttributes,
	HTMLObjectAttributes,
	HTMLOlAttributes,
	HTMLOptgroupAttributes,
	HTMLOptionAttributes,
	HTMLOutputAttributes,
	HTMLParamAttributes,
	HTMLProgressAttributes,
	HTMLQuoteAttributes,
	HTMLScriptAttributes,
	HTMLSelectAttributes,
	HTMLSlotAttributes,
	HTMLSourceAttributes,
	HTMLStyleAttributes,
	HTMLTableAttributes,
	HTMLTdAttributes,
	HTMLTextareaAttributes,
	HTMLThAttributes,
	HTMLTimeAttributes,
	HTMLTrackAttributes,
	HTMLVideoAttributes,
	HTMLWebViewAttributes
} from 'svelte/elements';

export type Compose = (...args: any[]) => string;
export type TwcOptions = {
	compose: Compose;
};
export type HTMLPropsMap = {
	a: HTMLAnchorAttributes;
	audio: HTMLAudioAttributes;
	area: HTMLAreaAttributes;
	base: HTMLBaseAttributes;
	blockquote: HTMLBlockquoteAttributes;
	button: HTMLButtonAttributes;
	canvas: HTMLCanvasAttributes;
	col: HTMLColAttributes;
	colgroup: HTMLColgroupAttributes;
	data: HTMLDataAttributes;
	details: HTMLDetailsAttributes;
	del: HTMLDelAttributes;
	dialog: HTMLDialogAttributes;
	embed: HTMLEmbedAttributes;
	fieldset: HTMLFieldsetAttributes;
	form: HTMLFormAttributes;
	html: HTMLHtmlAttributes;
	iframe: HTMLIframeAttributes;
	img: HTMLImgAttributes;
	ins: HTMLInsAttributes;
	input: HTMLInputAttributes;
	keygen: HTMLKeygenAttributes;
	label: HTMLLabelAttributes;
	li: HTMLLiAttributes;
	link: HTMLLinkAttributes;
	map: HTMLMapAttributes;
	menu: HTMLMenuAttributes;
	meta: HTMLMetaAttributes;
	meter: HTMLMeterAttributes;
	quote: HTMLQuoteAttributes;
	object: HTMLObjectAttributes;
	ol: HTMLOlAttributes;
	optgroup: HTMLOptgroupAttributes;
	option: HTMLOptionAttributes;
	output: HTMLOutputAttributes;
	param: HTMLParamAttributes;
	progress: HTMLProgressAttributes;
	slot: HTMLSlotAttributes;
	script: HTMLScriptAttributes;
	select: HTMLSelectAttributes;
	source: HTMLSourceAttributes;
	style: HTMLStyleAttributes;
	table: HTMLTableAttributes;
	textarea: HTMLTextareaAttributes;
	td: HTMLTdAttributes;
	th: HTMLThAttributes;
	time: HTMLTimeAttributes;
	track: HTMLTrackAttributes;
	video: HTMLVideoAttributes;
	webview: HTMLWebViewAttributes;
};
export type Attributes<El extends keyof HTMLElementTagNameMap> = El extends keyof HTMLPropsMap
	? HTMLPropsMap[El]
	: HTMLAttributes<HTMLElementTagNameMap[El]>;
export type HTMLElementTagNames = keyof HTMLElementTagNameMap;
export type TwcFunction<El> = (
	strings: TemplateStringsArray,
	...values: any[]
) => Component<
	El extends Component
		? ComponentProps<El>
		: El extends HTMLElementTagNames
			? Attributes<El>
			: never
>;

export type TwcForComponent = <C extends Component<any>>(component: C) => TwcFunction<C>;
export type TwcForElement = {
	[El in HTMLElementTagNames]: TwcFunction<El>;
};
export type Twc = TwcForComponent & TwcForElement;
export function createCore(
	createTwcComponent: (el: HTMLElementTagNames, options: TwcOptions) => any
) {
	return (options: TwcOptions) => {
		const cache = new Map<HTMLElementTagNames, TwcFunction<HTMLElementTagNames>>();
		return new Proxy(
			(component: Component) =>
				(strings: TemplateStringsArray, ...values: any[]) => {
					const cls = String.raw(
						{ raw: typeof strings === 'string' ? [strings] : strings },
						...values
					);
					return (internal: any, props: any) =>
						component(internal, { ...props, class: options.compose(cls, props.class) });
				},
			{
				get(_, el: HTMLElementTagNames): TwcFunction<HTMLElementTagNames> {
					const cached = cache.get(el);
					if (cached) return cached;
					const component = createTwcComponent(el, options);
					cache.set(el, component);
					return component;
				}
			}
		) as Twc;
	};
}

export const compose: Compose = (...args) => args.filter(Boolean).join(' ');
