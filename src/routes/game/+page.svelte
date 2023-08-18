<script>
    const rangeStart = 1900;
    const rangeEnd = new Date().getFullYear();

    let score = 0;
    let lives = 100;
    let guess = 1962;
</script>

<!-- score and lives -->
<div class="flex justify-between">
    <article class="flex py-2 space-x-4 mb-5">
        <p>score</p>
        <strong class="text-[var(--pico-primary)]">{score}</strong>
    </article>
    <article class="flex py-2 space-x-4 mb-5">
        <p>lives</p>
        <strong class="text-[var(--pico-ok)]">{lives}</strong>
    </article>
</div>

<!-- question area -->
<article class="flex flex-col justify-center text-center items-center [text-wrap:balance]">
    <!-- question -->
    <p class="opacity-70 pb-4">What year did the following event happen?</p>
    <p class="text-2xl font-bold pb-8 md:pb-10 px-1">Sandra Day O'Connor becomes the first woman on the U.S. Supreme Court.</p>

    <!-- slider value -->
    <div class="w-28 md:mb-4">
        <label for="guess-number">Guess:</label>
        <input type="number" name="guess-number" bind:value="{guess}" class="text-xl text-center font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
    </div>

    <!-- slider -->
    <div class="px-3 sm:px-6 flex w-full space-x-4 py-2">
        <span>{rangeStart}</span>
        <input type="range" name="guess-slider" min="{rangeStart}" max="{rangeEnd}" step="1" bind:value="{guess}" class="pt-1">
        <span>{rangeEnd}</span>
    </div>
    <label for="guess-slider" class="text-xs opacity-50">drag the slider or type the answer</label>

    <!-- confirm button -->
    <button role="button" class="text-lg sm:text-base mt-8 md:mt-12 mb-1 md:mb-2 py-2 px-4 w-2/5 font-bold">confirm</button>
</article>
