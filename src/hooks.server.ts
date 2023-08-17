import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const theme = event.cookies.get('preferredColorScheme');

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme', theme ? `data-theme="${theme}"` : '')
    });
}) satisfies Handle;
