<script lang="ts">
	import Nav from '@components/layout/nav.svelte';
	import RouterTransition from '@components/transition/router.svelte';
</script>

<main class="h-screen w-full flex">
	<Nav class="md:flex hidden" />

	<section class="flex flex-1 flex-row">
		<RouterTransition>
			<slot />
		</RouterTransition>
	</section>
</main>
