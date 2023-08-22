<script lang="ts">
    import allQuestions from '$lib/questions.json';
    import { startYear, endYear } from '$lib/Config.svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { tweened } from 'svelte/motion';
    import Typewriter from 'svelte-typewriter'

    const initialValues = {
        guess: Math.round((startYear + endYear) / 2),
        lives: 100,
        round: 0,
        state: 'guess',
        margin: 0,
        buttonDisabled: false,
        buttonDelay: 2600,
    }

    let questions = getQuestions();
    let { guess, lives, round, state, margin, buttonDisabled, buttonDelay } = initialValues;
    let tween = getTween(lives);
    let buttonTrigger = {};
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

    const grades = [
        { grade: "Oops!", atLeast: -Infinity, description: "Something went wrong..."},
        { grade: "So bad, it's good", atLeast: 0, description: "It's hard to get a score this low on purpose." },
        { grade: "Absolutely Terrible", atLeast: 2, description: "You should be embarrassed." },
        { grade: "Very Bad", atLeast: 4, description: "It's very bad." },
        { grade: "Bad", atLeast: 5, description: "It's very bad." },
        { grade: "Decent", atLeast: 7, description: "It's an ok score." },
        { grade: "Not Bad", atLeast: 9, description: "Not bad, but you can do better." },
        { grade: "Average", atLeast: 10, description: "You should feel satisfied with this score." },
        { grade: "Above Average", atLeast: 11, description: "This was my personal high score." },
        { grade: "Good", atLeast: 12, description: "Quite good. You can close the tab now." },
        { grade: "Great", atLeast: 15, description: "This is very impressive." },
        { grade: "Excellent", atLeast: 20, description: "Well done! This is the third highest grade." },
        { grade: "Superb", atLeast: 25, description: "Well done! This is the second highest grade." },
        { grade: "Perfect", atLeast: 30, description: "The highest grade! You probably cheated." },
    ]
    function getGrade(score: number) {
        return grades.reduce((acc, cur) => score >= cur.atLeast ? cur : acc, grades[0]);
    }

    function pressNext() {
        buttonDisabled = true;
        if (state === 'guess') {
            state = 'answer';
            margin = Math.abs(guess - question.year);
            lives = Math.max(lives - margin, 0);
            tween.set(lives, { duration: 700, delay: 1800 });
            buttonTrigger = {};
            setTimeout(() => buttonDisabled = false, buttonDelay);
        } else if (state === 'answer' && lives > 0 && round < questions.length - 1) {
            round++;
            guess = initialValues.guess;
            state = 'guess';
            buttonDisabled = false;
        } else if (state === 'gameover') {
            questions = getQuestions();
            ({ guess, lives, round, state, buttonDisabled } = initialValues);
            tween = getTween(lives);
        } else {
            state = 'gameover';
            buttonTrigger = {};
            setTimeout(() => buttonDisabled = false, buttonDelay);
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
    <article class="h-[32rem] py-8 sm:py-10 flex flex-col justify-center text-center items-center [text-wrap:balance]">

        {#if state === 'gameover'}
        <Typewriter cursor={false} delay={100} interval={60}>
            <h2 class="font-sans text-2xl xs:text-3xl font-bold mt-2.5 mb-0.5 text-[var(--pico-secondary)] opacity-90">GAME OVER</h2>
        </Typewriter>
        <div class="h-[19.75rem] xs:h-[19.5rem] flex flex-col items-center justify-center space-y-5">
            <p in:fade={{delay: 1200}} class="flex flex-col items-center justify-center space-y-1 xs:space-y-2">
                <span>Score:</span>
                <span class="bg-[var(--pico-ok-bg)] pl-3 pr-3.5 py-1.5 text-3xl font-bold rounded-lg">{round}</span>
            </p>
            <p in:fade={{delay: 2000}} class="flex flex-col items-center justify-center space-y-1 xs:space-y-2">
                <span>Grade:</span>
                <span class="bg-[var(--pico-ok-bg)] pl-3 pr-3.5 py-2 text-xl mx-3 font-bold rounded-lg">{getGrade(round).grade}</span>
            </p>
            <div in:fade={{delay: 2000}} class="w-full flex flex-col items-center">
                <p class="mx-5 mb-4">{getGrade(round).description}</p>
            </div>
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
        <div in:fly={{delay: 1200}} class="mb-9">
            <span>Lives remaining:</span>
            <span class="bg-[var(--pico-ok-bg)] px-2 py-0.5 mx-1 font-bold text-lg rounded-lg">{$tween}</span>
        </div>
        {/if}

        {/if}

        <!-- confirm/continue button -->
        {#key buttonTrigger}
        <button
            in:fly={{delay:buttonDelay}} on:click={pressNext} role="button"
            class="text-lg my-2 py-2 px-4 w-52 font-bold" disabled={buttonDisabled}>
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
    input:disabled, button:disabled {
        opacity: unset;
    }
</style>
