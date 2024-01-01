<script lang="ts">
	import ListAside from '@components/layout/list-aside.svelte';
	import Header from '@components/layout/list-header.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<main class="flex flex-col flex-1">
	<Header>
		<span>书籍列表</span>
	</Header>
	<section class="flex-1">
		<div class="text-column">
			<p>书籍列表</p>
		</div>
	</section>
</main>
<ListAside>侧边栏</ListAside>
