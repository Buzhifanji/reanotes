<script lang="ts">
	import ListAside from '@components/layout/list-aside.svelte';
	import Header from '@components/layout/list-header.svelte';
	import { addToast } from '@components/toast/toaster.svelte';
	import { readChunkFile } from '@shared';
	import { t } from '@translations';
	import { Upload } from 'lucide-svelte';

	let fileInput: HTMLInputElement;
	const fileType = '.pdf'; // 文件类型
	let loading = false;

	function fileSelected(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files!;
		if (files.length) {
			loading = true;
			readChunkFile(files[0])
				.then((val) => {
					console.log('val', val);
				})
				.catch((err) => {
					addToast({
						data: {
							title: $t('lang.readFileError'),
							description: err,
							color: 'error'
						}
					});
				})
				.finally(() => {
					loading = false;
					fileInput!.value = '';
				});
		}
	}

	function openUpload() {
		if (loading) return;
		fileInput?.click();
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<main class="flex flex-col flex-1">
	<Header>
		<div class="flex justify-between w-full">
			<span>书籍列表</span>

			<button class="btn btn-sm btn-primary" on:click={openUpload}>
				{#if loading}
					<span class="loading loading-spinner"></span>
				{/if}
				<input
					type="file"
					class="hidden"
					on:change={fileSelected}
					bind:this={fileInput}
					accept={fileType}
				/>
				<Upload class="w-5 h-5" />
				<span>上传</span>
			</button>
		</div>
	</Header>
	<section class="flex-1">
		<div class="text-column">
			<p>书籍列表</p>
		</div>
	</section>
</main>
<ListAside>侧边栏</ListAside>
