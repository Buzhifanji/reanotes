<script lang="ts">
	import { page } from '$app/stores';
	import { getPathName } from '@shared';
	import { t } from '@translations';
	import { BookOpen, Newspaper, Settings } from 'lucide-svelte';

	export let show = false; // 是否显示标题
	let clazz = '';
	export { clazz as class };

	const tooltipClass = 'tooltip tooltip-right tooltip-accent flex';

	const listNav = [
		{ path: '/list/book-list', Icon: BookOpen, name: 'lang.book' },
		{ path: '/list/article-list', Icon: Newspaper, name: 'lang.article' }
	];

	const otherNav = [{ path: '/list/setting', Icon: Settings, name: 'lang.setting' }];

	$: fullPath = $page.url.pathname;
	const isActive = (path: string, currentPath: string) =>
		path === currentPath ? 'active ' + tooltipClass : tooltipClass;
</script>

<nav class="flex flex-col justify-between bg-base-200 {clazz}">
	<ul class="menu rounded-box gap-4">
		<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">首页</a>
				</li> -->
		{#each listNav as { path, Icon, name }}
			<li aria-current={getPathName(fullPath, path)}>
				{#if show}
					<a href={path} class={isActive(fullPath, path)}>
						<Icon class="h-5 w-5" />
						<span>{$t(name)}</span>
					</a>
				{:else}
					<a href={path} class={isActive(fullPath, path)} data-tip={$t(name)}>
						<Icon class="h-5 w-5" />
					</a>
				{/if}
			</li>
		{/each}
	</ul>
	<ul class="menu rounded-box gap-4">
		{#each otherNav as { path, Icon, name }}
			<li aria-current={getPathName(fullPath, path)}>
				{#if show}
					<a href={path} class={isActive(fullPath, path)}>
						<Icon class="h-5 w-5" />
						<span>{$t(name)}</span>
					</a>
				{:else}
					<a href={path} class={isActive(fullPath, path)} data-tip={$t(name)}>
						<Icon class="h-5 w-5" />
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
