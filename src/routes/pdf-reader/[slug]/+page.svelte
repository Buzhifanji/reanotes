<script lang="ts">
	import CatalogBox from '@components/layout/catalog-box.svelte';
	export let data;
</script>

<svelte:head>
	<title>PDF</title>
	<meta name="description" content="PDF Reader" />
</svelte:head>

<main class="flex flex-row flex-1">
	<CatalogBox>
		<nav>目录</nav>
	</CatalogBox>
	<section class="flex-1">
		<h1>{data.slug}</h1>
		<div class="text-column">
			<p>文章列表</p>
		</div>
	</section>
	<aside>侧边栏</aside>
</main>