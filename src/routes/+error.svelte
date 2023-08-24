<script>
    import { page } from '$app/stores';
</script>
  
<div class="flex-grow px-6 pt-12 pb-36 flex flex-col justify-center text-center">
    <h1 class="font-sans text-[var(--pico-muted-color)] text-3xl pb-3">{$page.status}</h1>
    <h2 class="font-sans text-[var(--pico-muted-color)] text-lg">{$page.error?.message}</h2>
</div>
