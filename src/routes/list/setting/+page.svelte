<script lang="ts">
	import Header from '@components/layout/list-header.svelte';
	import { t } from '@translations';
	import Lang from './lang.svelte';
	import Theme from './theme.svelte';
</script>

<svelte:head>
	<title>{$t('lang.setting')}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="w-full flex flex-col overflow-hidden">
	<Header>
		<h4 class="w-full text-center font-bold">{$t('lang.setting')}</h4>
	</Header>
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
</div>
