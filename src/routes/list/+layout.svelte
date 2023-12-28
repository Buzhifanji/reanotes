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
</script>

<main class="h-screen w-full flex">
	<aside class="flex flex-col justify-between bg-base-200">
		<nav>
			<ul class="menu rounded-box gap-4">
				<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">首页</a>
				</li> -->
				<li aria-current={getPathName($page.url.pathname, bookPath)}>
					<a href={bookPath} class={tooltipClass} data-tip={$t('lang.artilceList')}>
						<BookOpen />
					</a>
				</li>
				<li aria-current={getPathName($page.url.pathname, articlePath)}>
					<a href={articlePath} class={tooltipClass} data-tip="文章列表">
						<Newspaper />
					</a>
				</li>
			</ul>
		</nav>
		<ul class="menu rounded-box gap-4">
			<li aria-current={getPathName($page.url.pathname, settingPath)}>
				<a href={settingPath} class={tooltipClass} data-tip="设置">
					<Settings />
				</a>
			</li>
		</ul>
	</aside>

	<section class="flex flex-1">
		<RouterTransition>
			<slot />
		</RouterTransition>
	</section>
</main>
