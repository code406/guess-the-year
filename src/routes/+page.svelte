<script>
    import Marquee from '$lib/Marquee.svelte';
    import { startYear, endYear } from '$lib/Config.svelte';
</script>

<article class="px-0 py-2 mb-5 select-none"><Marquee /></article>

<article class="main-article text-center flex flex-col justify-center items-center py-12 2xs:py-16 mb-6">
    <p class="text-2xl font-bold">
        <span class="block">Guess the year when</span>
        <span class="block">the event happened.</span>
    </p>
    <p class="text-sm mt-6 text-[var(--pico-muted-color)]">
        <span class="inline-block">Answers range</span>
        <span class="inline-block">from {startYear} to {endYear}.</span>
    </p>
    <p class="text-sm text-[var(--pico-muted-color)]">Playing time: 1-2 minutes.</p>
    <a href="/game" role="button" class="text-lg w-40 sm:text-base mt-8 py-2 font-bold">start game</a>
</article>

<article class="px-0 py-2 mb-5 select-none"><Marquee /></article>

<article class="p-8 sm:py-10 sm:px-12">
    <h2 class="font-sans text-xl py-1 font-bold opacity-90">About this project</h2>
    <p class="pt-6 text-[var(--pico-muted-color)]">
        This project is a clone of
        <a href="https://davjhan.com/" role="link" class="secondary">David Han</a>'s "Guess the Year game"
        that I'm building for fun, to learn and use various technologies. All the code is available on 
        <a href="https://github.com/code406/guess-the-year" role="link" class="secondary">Github</a>,
        so feel free to check it out!
    </p>
    <p class="pt-5 text-[var(--pico-muted-color)]">
        Anyway, here's my experience so far:
    </p>
    <ul class="pl-8 pt-5 list-disc list-inside text-[var(--pico-muted-color)] space-y-5">
        <li>
            <a href="https://kit.svelte.dev" role="link" class="secondary">SvelteKit</a> is a joy to
            work with. I'm still learning, but I'm already a big fan and I hope the community keeps growing.
        </li>
        <li>
            I like how <a href="https://v2.picocss.com/docs" role="link" class="secondary">Pico CSS</a>
            keeps it minimal and takes care of styling for me, and I also like how quickly I can tweak
            things with <a href="https://tailwindcss.com" role="link" class="secondary">Tailwind CSS</a>.
            They do conflict with each other, but it's nice to have the best of both worlds.
        </li>
        <li>
            <a href="https://www.typescriptlang.org" role="link" class="secondary">Typescript</a> is not my
            favorite language, but it's definitely an improvement over vanilla JavaScript.
        </li>
        <li>
            Deployment to <a href="https://vercel.com" role="link" class="secondary">Vercel</a>
            took about 5 minutes, integration with Github and SvelteKit is pretty impressive.
        </li>
    </ul>
    <p class="pt-5 text-[var(--pico-muted-color)]">
        All in all, developer experience has been great!
    </p>
</article>
