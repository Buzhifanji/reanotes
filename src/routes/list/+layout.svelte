<script lang="ts">
	import { page } from '$app/stores';
	import { getPathName } from '@shared';
	import { BookText, Newspaper } from 'lucide-svelte';

	const bookPath = '/list/book-list';
	const articlePath = '/list/article-list';
</script>

<main class="h-screen w-full flex">
	<aside>
		<nav>
			<ul class="menu bg-base-200 rounded-box h-screen gap-4">
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
	</aside>

	<section class="flex flex-1">
		<slot />
	</section>
</main>
