<script lang="ts">
    import allQuestions from '$lib/questions.json';
    import { startYear, endYear } from '$lib/Config.svelte';
    import { fly, scale } from 'svelte/transition';
    import { tweened } from 'svelte/motion';
    import Typewriter from 'svelte-typewriter'

    const initialValues = {
        guess: Math.round((startYear + endYear) / 2),
        lives: 100,
        round: 0,
        state: 'guess',
        margin: 0,
    }

    let questions = getQuestions();
    let { guess, lives, round, state, margin } = initialValues;
    let tween = getTween(lives);
    let buttonHideTrigger = {};
    let buttonDisabled = false;
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
            margin = Math.abs(guess - question.year);
            lives = Math.max(lives - margin, 0);
            tween.set(lives, { duration: 700, delay: 1800 });
            buttonHideTrigger = {};
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
            buttonHideTrigger = {};
        }
    }
</script>

<div in:scale={{ duration: 500, delay: -200 }}>
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
    <article class="py-7 3xs:py-9 sm:py-10 flex flex-col justify-center text-center items-center [text-wrap:balance]">

        {#if state === 'gameover'}
        <div>
            <Typewriter cursor={false} delay={100} interval={60}>
            <h2 class="font-sans text-2xl xs:text-3xl font-bold mt-6 mb-14 text-[var(--pico-secondary)] opacity-90">GAME OVER</h2>
            </Typewriter>
            <Typewriter cursor={false} delay={800} interval={100}>
            <p class="text-xl my-8">
                You scored
                <span class="bg-[var(--pico-ok-bg)] px-2.5 py-1 text-2xl ml-1 mr-0.5 font-bold rounded-lg">{round}</span>
                points.
            </p>
            </Typewriter>
            <div in:fly={{delay: 2000}} class="mt-16 mb-5">
                <span class="text-lg">Grade:</span>
                <span class="bg-[var(--pico-ok-bg)] px-2.5 py-1.5 text-xl ml-2 mr-0.5 font-bold rounded-lg">Absolutely Terrible</span>
            </div>
            <p in:fly={{delay: 2000}} class="text-lg h-20 mb-6 xs:mb-5">I'm still figuring out whether that's good or bad...</p>
        </div>

        {:else}
        <!-- question -->
        <p class="text-[var(--pico-muted-color)] pb-4">
            <span class="inline-block">What year did the following</span>
            <span class="inline-block">event happen?</span>
        </p>
        {#key question.question}
        <p in:fly class="text-xl xs:text-2xl font-bold pt-2 pb-6 px-1 h-24 flex items-center">
            <span>{@html question.question}</span>
            <!-- <span>9.3 magnitude earthquake and tsunami strike Indonesia on Dec. 26th</span> -->
        </p>
        {/key}

        {#if state === 'guess'}
        <!-- guess input -->
        <div class="w-28 3xs:mb-2">
            <label for="guess-number">Guess:</label>
            <input type="number" name="guess-number" min={startYear} max={endYear}
                step=1 bind:value={guess} on:blur={fixGuess} placeholder="year"
                class="text-xl text-center font-bold border-[var(--pico-primary-background)] border-2 rounded-md">
        </div>
        <!-- guess range slider -->
        <div class="px-3 sm:px-6 flex w-full space-x-4 pt-4">
            <span>{startYear}</span>
            <input type="range" name="guess-slider" min={startYear} max={endYear}
                step=1 bind:value={guess} class="pt-1">
            <span>{endYear}</span>
        </div>
        <label for="guess-slider" class="mt-2 mb-10 text-sm text-[var(--pico-muted-color)]">
            drag the slider or type the answer
        </label>

        {:else}
        <div class="flex space-x-5">
            <div class="w-24 3xs:mb-2">
                <label for="guess-locked">Guess:</label>
                <input name="guess-locked" bind:value={guess} disabled class="text-xl text-center font-bold border-[var(--pico-primary-background)] border-2 rounded-md">
            </div>
            <div in:fly={{delay: 400}} class="w-24 3xs:mb-2">
                <label for="answer">Answer:</label>
                <input name="answer" bind:value={question.year} disabled class="text-xl text-center font-bold border-[var(--pico-ok)] border-2 rounded-md">
            </div>
        </div>
        <div in:fly={{delay: 800}} class="text-lg my-3.5">
            <span>Missed by:</span>
            <span class="bg-[var(--pico-error-bg)] px-2.5 py-1 text-xl ml-1 mr-0.5 font-bold rounded-lg">{margin}</span>
            <span class="font-bold">years</span>
        </div>
        <div in:fly={{delay: 1500}} class="mb-9">
            <span>Lives remaining:</span>
            <span class="bg-[var(--pico-ok-bg)] px-2 py-0.5 mx-1 font-bold text-lg rounded-lg">{$tween}</span>
        </div>
        {/if}

        {/if}

        <!-- confirm/continue button -->
        {#key buttonHideTrigger}
        <button
            in:fly={{delay:3000}}
            on:click={pressNext} role="button" class="text-lg mb-1 py-2 px-4 w-3/5 sm:w-2/5 font-bold" disabled={buttonDisabled}>
            {#if state === 'guess'}confirm{:else if state === 'answer'}continue{:else}play again{/if}
        </button>
        {/key}
    </article>
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
    input:disabled {
        opacity: unset;
    }
</style>
