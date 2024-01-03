<script lang="ts">
	import { ArrowLeft, ZoomIn, ZoomOut } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const zoomIn = () => dispatch('zoomIn');
	const zoomOut = () => dispatch('zoomOut');
</script>

<div class="bg-base-200 h-screen flex-col hidden md:flex w-64 lg:w-72">
	<div class="flex py-3 gap-4 px-1.5 items-center">
		<a href="/list/book-list" class="flex">
			<button class="btn btn-circle btn-outline btn-xs btn-accent">
				<ArrowLeft class="w-5 h-5" />
			</button>
		</a>
		<button class="btn btn-square btn-outline btn-xs btn-secondary" on:click={() => zoomIn()}>
			<ZoomIn class="w-5 h-5" />
		</button>
		<button class="btn btn-square btn-outline btn-xs btn-secondary" on:click={() => zoomOut()}>
			<ZoomOut class="w-5 h-5" />
		</button>
	</div>
	<div class="flex-1 overflow-y-auto no-scrollbar">
		<slot />
	</div>
</div>
