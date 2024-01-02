<script lang="ts">
	import ListAside from '@components/layout/list-aside.svelte';
	import Header from '@components/layout/list-header.svelte';
	import { addToast } from '@components/toast/toaster.svelte';
	import { bookDB } from '@database';
	import { readChunkFile } from '@shared';
	import { t } from '@translations';
	import { Upload } from 'lucide-svelte';

	let fileInput: HTMLInputElement;
	const fileType = '.pdf'; // 文件类型
	let loading = false;

	async function addBook(file: File, content: Uint8Array) {
		try {
			const now = new Date();
			const { name, size } = file;

			const isExist = await bookDB.books.get({ title: name });

			if (isExist) {
				addToast({
					data: {
						title: `文件已存在：${name}`,
						description: '请勿重复上传',
						color: 'warning'
					}
				});
				return;
			}

			const id = await bookDB.books.add({
				title: name,
				author: '',
				size: size,
				excerpt: '',
				domain: '',
				language: '',
				publishTime: '',
				publisher: '',
				cover: '',
				category: '',
				progress: 0,
				status: '',
				lastReadPosition: '',
				readedTime: 0,
				createTime: now,
				lastReadTime: now,
				content
			});

			addToast({
				data: {
					title: '上传文件成功！',
					description: name,
					color: 'success'
				}
			});
		} catch (err) {
			addToast({
				data: {
					title: '上传文件失败！',
					description: err as string,
					color: 'error'
				}
			});
		}
	}

	function fileSelected(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files!;
		if (files.length) {
			loading = true;
			const file = files[0];
			readChunkFile(file)
				.then((val) => {
					addBook(file, val);
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
