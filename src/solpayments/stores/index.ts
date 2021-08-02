import { writable } from 'svelte/store';
import type { Merchant } from '../layout';

/** the merchant accounts */
export const merchantAccounts = writable<Merchant[]>([]);
