import { clsx } from 'svelte/internal/client';
import { createTwcComponent } from './internal/client.js';
import { createCore } from './utils.js';

export const createTwc = createCore(createTwcComponent);
export const twc = createTwc({ compose: clsx });
