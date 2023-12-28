<script lang="ts">
	import { t } from '@translations';
	import Lang from '../lang.svelte';
</script>

<svelte:head>
	<title>Setting</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div class="container mx-auto">
	<ul class="menu">
		<li class="flex-row justify-around items-center">
			<span class="label-text">{$t('lang.language')}</span>
			<Lang />
		</li>
	</ul>
</div>
