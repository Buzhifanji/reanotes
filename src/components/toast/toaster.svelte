<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		description: string;
		color: 'info' | 'success' | 'warning' | 'error';
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="toast rounded-lg"
		>
			<div class="hidden alert-info"></div>
			<div class="hidden alert-success"></div>
			<div class="hidden alert-warning"></div>
			<div class="hidden alert-error"></div>

			<div class="alert shadow-lg {`alert-${data.color}`}">
				<div>
					<h3 class="font-bold" use:melt={$title(id)}>{data.title}</h3>
					<div class="text-xs" use:melt={$description(id)}>{data.description}</div>
				</div>
				<button use:melt={$close(id)} aria-label="close notification" class="btn btn-sm">
					<X class="h-5 w-5" />
				</button>
			</div>
		</div>
	{/each}
</div>
