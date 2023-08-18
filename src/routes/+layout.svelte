<script lang="ts">
    import "../app.css";
    import { Github, SunMedium, Plug, HardHat } from 'lucide-svelte';
    const githubLink = "https://github.com/code406";
</script>

<div style="position: relative; min-height: 100vh; min-height: 100dvh;">
    <main class="container max-w-xl pb-20">
        <nav class="py-4">
            <ul>
                <li><button class="as-link" on:click={() => document.documentElement.dataset.theme = 'light'}><SunMedium /></button></li>
            </ul>
            <ul>
                <li class="py-0">
                    <a href="/" class="flex flex-col font-bold my-1.5 sm:my-2.5 md:3.5 items-center">
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
    
    <footer class="px-6 absolute bottom-0 w-full h-20">
        <div class="m-auto max-w-xl pt-6 text-sm opacity-95 flex">
            <p class="mr-4 flex-grow flex items-center"><HardHat size=18 color="var(--pico-primary)"/><span class="pl-1.5">Built by <a href="{githubLink}" role="link" class="secondary">code406</a></span></p>
            <p class="ml-4 flex-grow flex justify-end items-center"><Plug size=18 color="var(--pico-primary)"/><span class="pl-1">Powered by <a href="https://kit.svelte.dev" role="link" class="secondary">SvelteKit</a></span></p>
        </div>
    </footer>
</div>

<style>
    .as-link {
        margin: calc(var(--pico-nav-link-spacing-vertical) * -1) calc(var(--pico-nav-link-spacing-horizontal) * -1);
        padding: var(--pico-nav-link-spacing-vertical) var(--pico-nav-link-spacing-horizontal);
        border: 0;
    }
    footer {
        word-spacing: 0.025rem;
    }
</style>