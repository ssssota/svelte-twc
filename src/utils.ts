import type { ComponentType, SvelteComponent } from 'svelte';
import {
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

export type Twc = {
	[El in keyof HTMLElementTagNameMap]: (
		strings: TemplateStringsArray,
		...values: any[]
	) => ComponentType<SvelteComponent<Attributes<El>>>;
};
export function createCore(
	createTwcComponent: (
		el: keyof HTMLElementTagNameMap,
		options: TwcOptions
	) => (strings: TemplateStringsArray, ...values: any[]) => any
) {
	return (options: TwcOptions) => {
		return new Proxy(
			{},
			{
				get(_, el: keyof HTMLElementTagNameMap) {
					return createTwcComponent(el, options);
				}
			}
		) as Twc;
	};
}

export const compose: Compose = (...args) => args.filter(Boolean).join(' ');
