/**
 * Server-side routes. Only the listed routes support html5pushstate.
 * Has to match client side routes.
 *
 * Index (/) route does not have to be listed here.
 *
 * @example
 * export const routes: string[] = [
 * 'home', 'about'
 * ];
 **/
export type UniversalRoute = string | { page: string, routes: string[] };

export const ROUTES: UniversalRoute[] = [
  'about',
  'home',
  'lazy',
  'todo',
  'github',
];
