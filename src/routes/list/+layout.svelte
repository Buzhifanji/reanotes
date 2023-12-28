<script lang="ts">
	import { page } from '$app/stores';
	import RouterTransition from '@components/transition/router.svelte';
	import { getPathName } from '@shared';
	import { BookText, Newspaper, Settings } from 'lucide-svelte';

	const bookPath = '/list/book-list';
	const articlePath = '/list/article-list';
	const settingPath = '/list/setting';
</script>

<main class="h-screen w-full flex">
	<aside class="flex flex-col justify-between bg-base-200">
		<nav>
			<ul class="menu rounded-box gap-4">
				<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">首页</a>
				</li> -->
				<li aria-current={getPathName($page.url.pathname, bookPath)}>
					<a href={bookPath}>
						<BookText />
					</a>
				</li>
				<li aria-current={getPathName($page.url.pathname, articlePath)}>
					<a href={articlePath}>
						<Newspaper />
					</a>
				</li>
			</ul>
		</nav>
		<ul class="menu rounded-box gap-4">
			<li aria-current={getPathName($page.url.pathname, settingPath)}>
				<a href={settingPath}>
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
