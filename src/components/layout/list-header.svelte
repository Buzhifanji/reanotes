<script lang="ts">
	import Nav from '@components/layout/nav.svelte';
	import { AlignJustify } from 'lucide-svelte';
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex flex-col">
		<header class="navbar">
			<div class="flex-none md:hidden">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<AlignJustify class="w-5 h-5" />
				</label>
			</div>
			<div class="flex-1 flex px-2 mx-2">
				<slot />
			</div>
		</header>
	</div>

	<div class="drawer-side">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<Nav class="h-full" show={true} />
	</div>
</div>
