<script lang="ts">
	import { langOption, locale, setLang, type LangOption } from '@translations';
	import { ChevronDown } from 'lucide-svelte';

	let currentLang = locale.get() || 'en';
	let langs: LangOption[] = [];

	langOption.subscribe((val) => (langs = val));

	locale.subscribe((val) => (currentLang = val));

	const choose = async (val: string) => {
		await setLang(val);
		currentLang = val;
	};

	$: langName =
		langs.find((v) => v.code.toLocaleUpperCase() === currentLang?.toLocaleUpperCase())?.name ||
		'English';
</script>

<div class="dropdown dropdown-bottom w-32">
	<div tabindex="0" role="button" class="flex gap-3 items-center font-semibold">
		<span>{langName}</span>
		<ChevronDown class="h-4 w-4" />
	</div>
	<ul
		tabindex="0"
		class="dropdown-content z-[1] menu left-[-14px] top-2 p-2 bg-base-100 w-52 border border-white/5 shadow-2xl outline outline-1 rounded-md"
	>
		{#each $langOption as { name, code, direction }}
			<li>
				<button
					on:click={() => choose(code)}
					class={currentLang?.toLocaleUpperCase() === code.toLocaleUpperCase() ? 'active' : ''}
				>
					<span class="font-[sans-serif]">{name}</span>
					<span
						class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
						>{code}</span
					>
				</button>
			</li>
		{/each}
	</ul>
</div>
