<script>
	import Toaster from '@components/toast/toaster.svelte';
	import RouterTransition from '@components/transition/router.svelte';
	import { initThem } from '@config';
	import '@config/dayjs';
	import { initLang } from '@translations';

	import './styles.css';

	initLang();
	initThem();
</script>

<div class="app bg-base-100 text-base-content">
	<Toaster />
	<RouterTransition>
		<slot />
	</RouterTransition>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
