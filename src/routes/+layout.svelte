<script lang="ts">
    import "../app.css";
    import { Github, Moon, SunMedium } from 'lucide-svelte';
    import { browser, dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    const githubLink = "https://github.com/code406";
    inject({ mode: dev ? 'development' : 'production' }); // Vercel Web Analytics
    let theme: string;
    if (browser) {
        theme = document.documentElement.dataset.theme
                || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    function toggleTheme() {
        if (theme === 'light') theme = 'dark';
        else theme = 'light';
        document.documentElement.dataset.theme = theme;
        document.cookie = `preferredColorScheme=${theme};path=/;max-age=31536000`;
    }
</script>

<div class="wrapper relative flex flex-col">
    <main class="container flex flex-col flex-grow max-w-3xl pb-14 2xs:pb-16">
        <nav class="py-4 mx-2">
            <ul>
                <li>
                    <button class="as-link" on:click={toggleTheme}>
                        <div class="toggle-sun"><SunMedium /></div>
                        <div class="toggle-moon"><Moon /></div>
                    </button>
                </li>
            </ul>
            <ul>
                <li class="py-0">
                    <a href="/" class="flex flex-col font-bold my-0.5 lg:my-1 items-center">
                        <span class="text-xs text-[var(--pico-primary)]">YET ANOTHER</span>
                        <span class="text-2xl flex items-center space-x-2">guess the year</span>
                        <span class="text-xs text-[var(--pico-primary)]">GAME</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li><a class="secondary" href="{githubLink}"><Github /></a></li>
            </ul>
        </nav>
    
        <slot />
    </main>
    
    <footer class="absolute bottom-0 w-full h-14 2xs:h-16">
        <div class="m-auto max-w-3xl px-2 pt-3 2xs:pt-4 text-sm flex justify-between">
            <p class="text-[var(--pico-muted-color)] mx-2 2xs:mx-4">
                Built by <a href="{githubLink}" role="link" class="secondary">code406</a>
            </p>
            <p class="text-[var(--pico-muted-color)] mx-2 2xs:mx-4">
                Powered by <a href="https://kit.svelte.dev" role="link" class="secondary">SvelteKit</a>
            </p>
        </div>
    </footer>
</div>

<style>
    .wrapper {
        min-height: 100vh;
        min-height: 100dvh;
    }
    .as-link {
        margin: calc(var(--pico-nav-link-spacing-vertical) * -1) calc(var(--pico-nav-link-spacing-horizontal) * -1);
        padding: var(--pico-nav-link-spacing-vertical) var(--pico-nav-link-spacing-horizontal);
        border: 0;
    }
</style>