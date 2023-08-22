<script>
    import { page } from '$app/stores';
</script>
  
<div class="px-6 py-12 h-full mx-auto flex flex-col items-center justify-center text-center">
    <h1 class="font-sans text-3xl pb-3">{$page.status}</h1>
    <h2 class="font-sans text-lg">{$page.error?.message}</h2>
</div>
