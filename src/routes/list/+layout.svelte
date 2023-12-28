<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="h-screen w-full flex">
	<aside>
		<nav>
			<ul class="menu w-56 bg-base-200 rounded-box h-screen">
				<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">首页</a>
				</li> -->
				<li aria-current={$page.url.pathname === '/list/book-list' ? 'page' : undefined}>
					<a href="/list/book-list">书籍</a>
				</li>
				<li aria-current={$page.url.pathname === '/list/article-list' ? 'page' : undefined}>
					<a href="/list/article-list">文章</a>
				</li>
			</ul>
		</nav>
	</aside>

	<section class="flex flex-1">
		<slot />
	</section>
</main>
