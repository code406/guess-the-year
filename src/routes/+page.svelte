<script>
    import Marquee from '$lib/Marquee.svelte';
</script>

<article class="px-0 py-2 mb-5 select-none">
    <Marquee direction="right" />
</article>

<article class="main-article text-center flex flex-col justify-center items-center py-16 px-8 mb-6">
    <p class="text-2xl font-bold">
        <span class="block">Guess the year when</span>
        <span class="block">the event happened.</span>
    </p>
    <p class="text-sm mt-6 text-[var(--pico-muted-color)]">
        <span class="inline-block">Answers range</span>
        <span class="inline-block">from 1900 to {new Date().getFullYear()}.</span>
    </p>
    <p class="text-sm text-[var(--pico-muted-color)]">Playing time: 1-2 minutes.</p>
    <a href="/game" role="button" class="text-lg w-40 sm:text-base mt-8 py-2 font-bold">start game</a>
</article>

<article class="px-0 py-2 mb-5 select-none">
    <Marquee direction="right" />
</article>
