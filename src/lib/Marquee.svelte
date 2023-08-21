<script lang="ts">
    import { startYear, endYear } from '$lib/config';

    const years = Array
        .from({ length: endYear - startYear + 1 }, (_, i) => i + startYear)
        .sort(() => Math.random() - 0.5);
</script>

<div class="flex overflow-x-hidden">
    {#each {length: 2} as _}
	<div class="marquee">
		{#each years as year}<span class="opacity-80 mr-3.5">{year}</span>{/each}
	</div>
    {/each}
</div>

<style>
    .marquee { animation: scroll 300s linear 0s infinite }
    .marquee>:nth-child(odd) { color: var(--pico-primary) }
    .marquee>:nth-child(even) { color: var(--pico-secondary) }
    @keyframes scroll {
        0% { transform: translateX(0%) }
        100% { transform: translateX(-100%) }
    }
</style>
