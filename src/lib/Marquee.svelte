<script lang="ts">
    import { browser } from '$app/environment';
    import Marquee from "svelte-fast-marquee";
    
    // all years in range from 1900 to current year
    const years = Array.from(
        { length: new Date().getFullYear() - 1900 + 1 },
        (_, i) => i + 1900
    ).sort(() => Math.random() - 0.5);

    export let direction: "left" | "right" = "left";

    // set marquee speed depending on screen size
    let speed = 4;
    $: if (browser) {
        if (window.innerWidth < 350) speed = 1;
        else if (window.innerWidth < 390) speed = 1.2;
        else if (window.innerWidth < 430) speed = 1.4;
        else if (window.innerWidth < 480) speed = 1.6
        else if (window.innerWidth < 530) speed = 1.8;
        else if (window.innerWidth < 580) speed = 2;
        else if (window.innerWidth < 640) speed = 2.2;
        else speed = 2.5;
    }
</script>

<Marquee speed={speed} direction={direction}>
    {#each years as year, i}
    {#if i % 2 === 0}
    <span class="opacity-80 mr-3.5 text-[var(--pico-muted-color)]">{year}</span>
    {:else}
    <span class="opacity-80 mr-3.5 text-[var(--pico-primary)]">{year}</span>
    {/if}
    {/each}        
</Marquee>
