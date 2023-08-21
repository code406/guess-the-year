<script lang="ts">
    import allQuestions from '$lib/questions.json';
    import { startYear, endYear } from '$lib/Config.svelte';

    const initialGuess = Math.round((startYear + endYear) / 2);
    let guess = initialGuess;

    const initialState = {
        round: 0,
        lives: 100,
        questions: shuffleQuestions()
    }
    let { round, lives, questions } = initialState;
    $: question = questions[round];

    function shuffleQuestions() {
        return allQuestions.sort(() => Math.random() - 0.5);
    }

    function fixGuess() {
        guess = guess ? Math.floor(Math.min(Math.max(guess, startYear), endYear)) : initialGuess;
    }

    function nextRound() {
        round++;
        guess = initialGuess;
        question = questions[round];
    }
</script>

<!-- score and lives -->
<div class="flex justify-between">
    <article class="flex py-2 space-x-4 mb-5">
        <p>score</p>
        <strong class="text-[var(--pico-primary)]">{round}</strong>
    </article>
    <article class="flex py-2 space-x-4 mb-5">
        <p>lives</p>
        <strong class="text-[var(--pico-ok)]">{lives}</strong>
    </article>
</div>

<!-- question area -->
<article class="py-8 sm:py-10 question-area flex flex-col justify-center text-center items-center [text-wrap:balance]">
    <!-- question -->
    <p class="text-[var(--pico-muted-color)] pb-4">
        <span class="inline-block">What year did the following</span>
        <span class="inline-block">event happen?</span>
    </p>
    <p class="text-xl xs:text-2xl font-bold pb-8 px-1 h-32 4xs:h-28 xs:h-24 flex items-center">
        <span>{@html question.question}</span>
    </p>

    <!-- slider value -->
    <div class="w-28 3xs:mb-2">
        <label for="guess-number">Guess:</label>
        <input type="number" name="guess-number" min={startYear} max={endYear}
            step=1 bind:value={guess} on:blur={fixGuess}
            class="text-xl text-center font-bold border-[var(--pico-primary-background)] border-2 rounded-md">
    </div>

    <!-- slider -->
    <div class="px-3 sm:px-6 flex w-full space-x-4 py-2">
        <span>{startYear}</span>
        <input type="range" name="guess-slider" min={startYear} max={endYear}
            step=1 bind:value={guess} class="pt-1">
        <span>{endYear}</span>
    </div>
    <label for="guess-slider" class="mb-8 text-sm text-[var(--pico-muted-color)]">
        drag the slider or type the answer
    </label>

    <!-- confirm button -->
    <button role="button" class="text-lg sm:text-base mb-1 py-2 px-4 w-2/5 font-bold" on:click={nextRound}>
        confirm
    </button>
</article>

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
</style>
