<script lang="ts">
	import { t } from '@translations';
	import Lang from './lang.svelte';
	import Theme from './theme.svelte';
</script>

<svelte:head>
	<title>{$t('lang.setting')}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="container mx-auto">
	<ul class="menu gap-4">
		<li class="flex-row justify-around items-center">
			<span class="label-text w-24">{$t('lang.language')}</span>
			<Lang />
		</li>
		<li class="flex-row justify-around items-center">
			<span class="label-text w-24">{$t('lang.theme')}</span>
			<Theme />
		</li>
	</ul>
</div>
