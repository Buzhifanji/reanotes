<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<div class="bg-base-200 h-screen flex-col hidden md:flex w-64 lg:w-72">
	<div class="flex py-3 px-1.5">
		<a href="/list/book-list">
			<button class="btn btn-circle btn-outline btn-xs">
				<ArrowLeft class="w-5 h-5" />
			</button>
		</a>
	</div>
	<slot />
</div>
