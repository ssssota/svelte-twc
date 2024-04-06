import { createTwcComponent } from './internal/client.js';
import { compose, createCore } from './utils.js';

export const createTwc = createCore(createTwcComponent);
export const twc = createTwc({ compose });
