<script lang="ts">
    import "../app.css";
    import { Github, Globe, Moon } from 'lucide-svelte';

    const title = 'Guess The Year';
    const subtitle = 'Game';
</script>

<svelte:head>
    <title>{title} {subtitle}</title>
</svelte:head>

<main class="container">
    <nav>
        <ul class="flex flex-col items-end">
            <li class="pb-0 lowercase font-bold text-2xl">{title}</li>
            <li class="pt-0 uppercase font-bold pico-color-amber-300 text-xs">{subtitle}</li>
        </ul>
        <ul>
            <li><a class="secondary" href="/"><Globe /></a></li>
            <li><a class="secondary" href="/"><Github /></a></li>
            <li><a class="secondary" href="/"><Moon /></a></li>
        </ul>
    </nav>

    <slot />
</main>

<style>
    nav {
        padding-block: 1rem;
    }
</style>