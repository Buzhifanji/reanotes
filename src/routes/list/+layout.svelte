<script lang="ts">
	import { page } from '$app/stores';
	import RouterTransition from '@components/transition/router.svelte';
	import { getPathName } from '@shared';
	import { t } from '@translations';
	import { BookOpen, Newspaper, Settings } from 'lucide-svelte';

	const bookPath = '/list/book-list';
	const articlePath = '/list/article-list';
	const settingPath = '/list/setting';
	const tooltipClass = 'tooltip tooltip-right tooltip-accent';

	$: fullPath = $page.url.pathname;
	const isActive = (path: string, currentPath: string) =>
		path === currentPath ? 'active ' + tooltipClass : tooltipClass;
</script>

<main class="h-screen w-full flex">
	<nav class="flex flex-col justify-between bg-base-200">
		<ul class="menu rounded-box gap-4">
			<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">首页</a>
				</li> -->
			<li aria-current={getPathName(fullPath, bookPath)}>
				<a href={bookPath} class={isActive(fullPath, bookPath)} data-tip={$t('lang.book')}>
					<BookOpen />
				</a>
			</li>
			<li aria-current={getPathName(fullPath, articlePath)}>
				<a href={articlePath} class={isActive(fullPath, articlePath)} data-tip={$t('lang.article')}>
					<Newspaper />
				</a>
			</li>
		</ul>
		<ul class="menu rounded-box gap-4">
			<li aria-current={getPathName(fullPath, settingPath)}>
				<a href={settingPath} class={isActive(fullPath, settingPath)} data-tip={$t('lang.setting')}>
					<Settings />
				</a>
			</li>
		</ul>
	</nav>

	<section class="flex flex-1 flex-row">
		<RouterTransition>
			<slot />
		</RouterTransition>
	</section>
</main>
