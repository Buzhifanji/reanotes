<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>PDF</title>
	<meta name="description" content="PDF Reader" />
</svelte:head>

<main class="flex flex-row flex-1">
	<nav>目录</nav>
	<section class="flex-1">
		<h1>{data.slug}</h1>
		<div class="text-column">
			<p>文章列表</p>
		</div>
	</section>
	<aside>侧边栏</aside>
</main>
