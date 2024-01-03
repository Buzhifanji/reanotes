<script lang="ts" context="module">
	import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
	GlobalWorkerOptions.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.js';
</script>

<script lang="ts">
	import BookInfo from '@components/book/info.svelte';
	import CatalogBox from '@components/layout/catalog-box.svelte';
	import { addToast } from '@components/toast/toaster.svelte';
	import Catalog from '@components/tree/catalog.svelte';
	import { bookDB, type Book } from '@database';
	import { createTreeView } from '@melt-ui/svelte';
	import { getEleById } from '@shared';
	import { locale } from '@translations';
	import {
		EventBus,
		GenericL10n,
		PDFFindController,
		PDFLinkService,
		PDFViewer
	} from 'pdfjs-dist/web/pdf_viewer';
	import { onMount, setContext } from 'svelte';
	import { formatePdfCatalog } from './catalog';
	import './viewer.css';

	const BOX = 'pdf-container';
	const VIEW = 'pdf-viewer';
	const minScale = 0.1;
	const maxScale = 4;

	export let data;
	let book: Book;
	let catalog: any[] = [];
	let pdfDoc: PDFDocumentProxy;
	let pdfView: PDFViewer;
	let activeTab = 0;

	const ctx = createTreeView({});
	setContext('tree', ctx);
	const {
		elements: { tree }
	} = ctx;

	async function getBookContent() {
		const val = await bookDB.books.get(+data.slug);
		if (val) {
			book = val;
		} else {
			addToast({
				data: {
					title: `文件已丢失`,
					description: '请重新上传',
					color: 'warning'
				}
			});
		}
	}

	async function renderPDF() {
		if (!book) return;

		const container = getEleById(BOX)! as HTMLDivElement;

		const eventBus = new EventBus();

		const linkService = new PDFLinkService({ eventBus });

		const findController = new PDFFindController({ eventBus, linkService });

		const l10n = new GenericL10n(locale.get());

		pdfView = new PDFViewer({
			container: container,
			eventBus,
			linkService,
			findController,
			l10n
		});

		pdfView.currentScale = 1 * window.devicePixelRatio;

		linkService.setViewer(pdfView);

		const loadingTask = getDocument(book.content);

		pdfDoc = await loadingTask.promise;

		const outline = await pdfDoc.getOutline();

		const metadata = await pdfDoc.getMetadata();

		console.log(metadata);

		catalog = formatePdfCatalog(outline);

		console.log(catalog);

		pdfView.setDocument(pdfDoc);

		linkService.setDocument(pdfDoc, null);

		// 监听 页面渲染完成，通知上层绘制笔记内容
		eventBus.on('textlayerrendered', (value: any) => {});

		eventBus.on('pagesloaded', () => {
			// view.currentScale = SCALE.value
		});
	}

	async function jump(val: any) {
		// 获取目标页面的页码
		const pageNumber = (await pdfDoc.getPageIndex(val.detail.dest[0])) + 1;
		pdfView.scrollPageIntoView({ pageNumber });
	}

	function zoomIn() {
		let scale = pdfView.currentScale;
		if (scale < maxScale) {
			scale = scale + 0.1;
			scale = scale > maxScale ? maxScale : scale;
			pdfView.currentScale = scale;
		}
	}

	function zoomOut() {
		let scale = pdfView.currentScale;
		if (scale > minScale) {
			scale = scale - 0.1;
			scale = scale < 0.1 ? 0.1 : scale;
			pdfView.currentScale = scale;
		}
	}

	const tabs = ['信息', '笔记'];

	const changTab = (val: number) => (activeTab = val);

	onMount(async () => {
		await getBookContent();
		await renderPDF();
	});
</script>

<svelte:head>
	<title>PDF</title>
	<meta name="description" content="PDF Reader" />
</svelte:head>

<main class="flex flex-row flex-1">
	<CatalogBox on:zoomIn={zoomIn} on:zoomOut={zoomOut}>
		<ul class="menu" {...$tree}>
			<Catalog treeItems={catalog} on:click={jump} />
		</ul>
	</CatalogBox>
	<section class="flex-1 relative">
		<div id={BOX} class="h-full w-full absolute overflow-auto scroll-smooth">
			<div id={VIEW} class="scrollWrapped pdfViewer" style="--page-border: 0;"></div>
		</div>
	</section>
	<aside class="w-72 lg:w-96 flex flex-col">
		<div role="tablist" class="tabs tabs-boxed">
			{#each tabs as item, i}
				<a
					role="tab"
					tabindex={i}
					class="tab {i === activeTab ? 'tab-active' : ''}"
					on:click={() => changTab(i)}>{item}</a
				>
			{/each}
		</div>
		<div class="flex-1 overflow-y-auto no-scrollbar">
			<BookInfo {book} />
		</div>
	</aside>
</main>
