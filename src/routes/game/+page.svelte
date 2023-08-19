<script lang="ts">
    import allQuestions from '$lib/questions.json';

    const rangeStart = 1900;
    const rangeEnd = new Date().getFullYear();
    const initialGuess = Math.round((rangeStart + rangeEnd) / 2);
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
        guess = guess ? Math.floor(Math.min(Math.max(guess, rangeStart), rangeEnd)) : initialGuess;
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
    <!-- make question always take up same space. vertical center -->
    <p class="text-xl 2xl:text-2xl font-bold pb-8 2xl:pb-10 px-1 h-32 4xs:h-28 xs:h-24 flex items-center">
        <span>{@html question.question}</span>
    </p>

    <!-- slider value -->
    <div class="w-28 3xs:mb-2 2xl:mb-4">
        <label for="guess-number">Guess:</label>
        <input type="number" name="guess-number" min={rangeStart} max={rangeEnd}
            step=1 bind:value={guess} on:blur={fixGuess} class="text-xl text-center font-bold border-[var(--pico-primary-background)] border-2 rounded-md">
    </div>

    <!-- slider -->
    <div class="px-3 sm:px-6 flex w-full space-x-4 py-2">
        <span>{rangeStart}</span>
        <input type="range" name="guess-slider" min={rangeStart} max={rangeEnd}
            step=1 bind:value={guess} class="pt-1">
        <span>{rangeEnd}</span>
    </div>
    <label for="guess-slider" class="text-sm text-[var(--pico-muted-color)]">
        drag the slider or type the answer
    </label>

    <!-- confirm button -->
    <button role="button"
        class="text-lg sm:text-base mt-8 2xl:mt-12 mb-1 2xl:mb-2 py-2 px-4 w-2/5 font-bold"
        on:click={nextRound}>
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
