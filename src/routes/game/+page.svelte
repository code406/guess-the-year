<script lang="ts">
    import allQuestions from '$lib/questions.json';
    import { startYear, endYear } from '$lib/Config.svelte';
    import { scale } from 'svelte/transition';
    import { tweened } from 'svelte/motion';

    const initialValues = {
        guess: Math.round((startYear + endYear) / 2),
        lives: 100,
        round: 0,
        state: 'guess',
    }
    
    let questions = getQuestions();
    let { guess, lives, round, state } = initialValues;
    let tween = getTween(lives);
    $: question = questions[round];

    function fixGuess() {
        guess = guess ? Math.floor(Math.min(Math.max(guess, startYear), endYear)) : initialValues.guess;
    }

    function getTween(n: number) {
        return tweened(n, {interpolate: (a, b) => t => Math.floor(a + ((b - a) * t))});
    }

    function getQuestions() {
        return allQuestions.sort(() => Math.random() - 0.5);
    }

    function pressNext() {
        if (state === 'guess') {
            state = 'answer';
            var margin = Math.abs(guess - question.year);
            lives = Math.max(lives - margin, 0);
            tween.set(lives, { duration: 700 });
        } else if (state === 'answer' && lives > 0 && round < questions.length - 1) {
            round++;
            guess = initialValues.guess;
            state = 'guess';
        } else if (state === 'gameover') {
            questions = getQuestions();
            ({ guess, lives, round, state } = initialValues);
            tween = getTween(lives);
        } else {
            state = 'gameover';
        }
    }
</script>

<div in:scale={{ duration: 500, delay: -200 }}>
    {#if state === 'gameover'}
    <article class="py-8 sm:py-10 flex flex-col justify-center text-center items-center [text-wrap:balance]">
        <h2 class="text-2xl font-bold mb-8">Game over</h2>
        <p class="text-lg mb-8">You scored <strong>{round}</strong> points!</p>
        <p class="text-lg mb-8">I'm still working on showing whether that's good or bad...</p>
        <button on:click={pressNext} role="button" class="mb-4 w-fit text-lg font-bold">
            play again
        </button>
    </article>

    {:else}
    <!-- score and lives -->
    <div class="flex justify-between">
        <article class="flex py-2 space-x-4 mb-5">
            <p>score</p>
            <strong class="text-[var(--pico-primary)]">{round}</strong>
        </article>
        <article class="flex py-2 space-x-4 mb-5">
            <p>lives</p>
            <strong class="text-[var(--pico-ok)]">{$tween}</strong>
        </article>
    </div>

    <!-- question area -->
    <article class="py-8 sm:py-10 flex flex-col justify-center text-center items-center [text-wrap:balance]">
        <!-- question -->
        <p class="text-[var(--pico-muted-color)] pb-4">
            <span class="inline-block">What year did the following</span>
            <span class="inline-block">event happen?</span>
        </p>
        <p class="text-xl xs:text-2xl font-bold pb-8 px-1 h-32 4xs:h-28 xs:h-24 flex items-center">
            <span>{@html question.question}</span>
        </p>

        <!-- guess input -->
        <div class="w-28 3xs:mb-2">
            <label for="guess-number">Guess:</label>
            <input type="number" name="guess-number" min={startYear} max={endYear} disabled={state === 'answer'}
                step=1 bind:value={guess} on:blur={fixGuess} placeholder="year"
                class="text-xl text-center font-bold border-[var(--pico-primary-background)] border-2 rounded-md">
        </div>

        {#if state === 'guess'}
        <!-- guess range slider -->
        <div class="px-3 sm:px-6 flex w-full space-x-4 py-2">
            <span>{startYear}</span>
            <input type="range" name="guess-slider" min={startYear} max={endYear}
                step=1 bind:value={guess} class="pt-1">
            <span>{endYear}</span>
        </div>
        <label for="guess-slider" class="mb-8 text-sm text-[var(--pico-muted-color)]">
            drag the slider or type the answer
        </label>

        {:else}
        <!-- answer -->
        <p class="text-lg font-bold pb-8 px-1 h-32 4xs:h-28 xs:h-24 flex items-center">
            <span>Answer was: {@html question.year}</span>
        </p>
        {/if}

        <!-- confirm/continue button -->
        <button on:click={pressNext} role="button" class="text-lg mb-1 py-2 px-4 w-2/5 font-bold">
            {#if state === 'guess'}confirm{:else}continue{/if}
        </button>
    </article>
    {/if}
</div>

<style>
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        appearance: textfield;
        -moz-appearance: textfield;
    }
    input[type=number]:disabled {
        opacity: unset;
    }
</style>
