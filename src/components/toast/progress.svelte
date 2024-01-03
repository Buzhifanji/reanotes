<script lang="ts">
	import { createProgress, melt, type Toast, type ToastsElements } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import type { ToastData } from './toaster.svelte';

	export let elements: ToastsElements;
	$: ({ content, title, description, close } = elements);

	export let toast: Toast<ToastData>;
	$: ({ data, id, getPercentage } = toast);

	const percentage = writable(0);
	const {
		elements: { root: progress },
		options: { max }
	} = createProgress({
		max: 100,
		value: percentage
	});

	onMount(() => {
		let frame: number;
		const updatePercentage = () => {
			percentage.set(getPercentage());
			frame = requestAnimationFrame(updatePercentage);
		};
		frame = requestAnimationFrame(updatePercentage);

		return () => cancelAnimationFrame(frame);
	});
</script>

<div
	use:melt={$content(id)}
	in:fly={{ duration: 150, x: '100%' }}
	out:fly={{ duration: 150, x: '100%' }}
	class="toast rounded-lg relative p-0"
>
	<div class="hidden alert-info"></div>
	<div class="hidden alert-success"></div>
	<div class="hidden alert-warning"></div>
	<div class="hidden alert-error"></div>

	<div class="alert shadow-lg {`alert-${data.color}`}">
		<div
			{...$progress}
			use:progress
			class="absolute left-5 top-2 h-1 w-[50%] overflow-hidden rounded-full bg-black/40"
		>
			<div
				class="h-full w-full bg-accent"
				style={`transform: translateX(-${100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
			/>
		</div>

		<div>
			<h3 class="font-bold" use:melt={$title(id)}>{data.title}</h3>
			<div class="text-xs" use:melt={$description(id)}>{data.description}</div>
		</div>
		<button use:melt={$close(id)} aria-label="close notification" class="btn btn-sm">
			<X class="h-5 w-5" />
		</button>
	</div>
</div>
