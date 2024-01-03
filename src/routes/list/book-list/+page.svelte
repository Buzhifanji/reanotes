<script lang="ts">
	import { addBook, findBookByTitle } from '@api';
	import ListAside from '@components/layout/list-aside.svelte';
	import Header from '@components/layout/list-header.svelte';
	import { addToast } from '@components/toast/toaster.svelte';
	import { bookDB, type Book } from '@database';
	import { getFilename, readChunkFile } from '@shared';
	import { t } from '@translations';
	import { Upload } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let fileInput: HTMLInputElement;
	const fileType = '.pdf'; // 文件类型
	let loading = false;
	let books: Book[] = [];
	let isLoadBooks = true;
	let activeIndex = 0;

	async function addBookAction(file: File, content: Uint8Array) {
		try {
			const { name, size } = file;

			const isExist = await findBookByTitle(name);

			if (isExist) {
				addToast({
					data: {
						title: `${$t('lang.fileExist')}：${name}`,
						description: $t('uploadRepeat'),
						color: 'warning'
					}
				});
				return;
			}
			await addBook({ title: name, size, content });

			addToast({
				data: {
					title: $t('lang.uploadSuccess'),
					description: name,
					color: 'success'
				}
			});
		} catch (err) {
			addToast({
				data: {
					title: $t('lang.uploadError'),
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
					addBookAction(file, val);
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

	async function getBooks() {
		isLoadBooks = true;
		books = await bookDB.books.toArray();
		isLoadBooks = false;
	}

	onMount(() => getBooks());

	const getActiveClass = (isActice: boolean) =>
		isActice ? 'bg-primary text-primary-content bg-opacity-60' : '';

	const changeActive = (i: number) => (activeIndex = i);
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
				<span>{$t('lang.upload')}</span>
			</button>
		</div>
	</Header>
	<section class="flex flex-col gap-4 flex-1 px-4 {isLoadBooks ? 'overflow-hidden' : ''}">
		{#if isLoadBooks}
			<div class="flex flex-col gap-4">
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
				<div class="skeleton w-full h-28"></div>
			</div>
		{:else}
			{#each books as { title, excerpt, id }, index}
				<a href="/pdf-reader/{id}">
					<div
						class="w-full cursor-pointer flex gap-4 rounded p-2.5 {getActiveClass(
							index === activeIndex
						)}"
						on:mouseover={() => changeActive(index)}
					>
						<div class="avatar">
							<div class="w-20 rounded">
								<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
							</div>
						</div>
						<div class="stat p-0 border-b">
							<div class="stat-value text-xl ellipsis">{getFilename(title)}</div>
							<div class="stat-title ellipsis">
								{excerpt || `【${$t('lang.unknown')}】`}
							</div>
							<div class="stat-desc">21% more than last month</div>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	</section>
</main>
<ListAside>侧边栏</ListAside>
