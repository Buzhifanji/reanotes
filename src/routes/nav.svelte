<script lang="ts">
	import { page } from '$app/stores';
</script>

<aside>
	<nav>
		<ul class="menu bg-base-200 w-56 rounded-box">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">首页</a>
			</li>
			<li aria-current={$page.url.pathname === '/books' ? 'page' : undefined}>
				<a href="/books">书籍</a>
			</li>
			<li aria-current={$page.url.pathname === '/articles' ? 'page' : undefined}>
				<a href="/articles">书籍</a>
			</li>
		</ul>
	</nav>
</aside>
