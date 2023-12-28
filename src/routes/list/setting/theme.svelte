<script lang="ts">
	import { getTheme, setTheme, themes } from '@config';
	import { ChevronDown } from 'lucide-svelte';

	let theme = getTheme();

	const choose = (val: string) => {
		setTheme(val);
		theme = val;
	};
</script>

<div class="dropdown dropdown-bottom w-32">
	<div tabindex="0" role="button" class="flex gap-3 items-center font-semibold">
		<span>{theme}</span>
		<ChevronDown class="h-4 w-4" />
	</div>
	<ul
		tabindex="0"
		class="dropdown-content z-[1] flex flex-row h-96 overflow-y-auto menu left-[-14px] top-2 p-2 bg-base-100 w-52 border border-white/5 shadow-2xl outline outline-1 rounded-md"
	>
		{#each themes as { name, emoji, id }}
			<li class="my-1 cursor-pointer w-full">
				<button on:click={() => choose(id)}>
					<span class="mr-3">{emoji}</span>
					{name}
				</button>
			</li>
		{/each}
	</ul>
</div>
