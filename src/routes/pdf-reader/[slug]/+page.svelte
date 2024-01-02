<script lang="ts" context="module">
	import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
	GlobalWorkerOptions.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.js';
</script>

<script lang="ts">
	import CatalogBox from '@components/layout/catalog-box.svelte';
	import { addToast } from '@components/toast/toaster.svelte';
	import { bookDB, type Book } from '@database';
	import { getEleById } from '@shared';
	import { locale } from '@translations';
	import {
		EventBus,
		GenericL10n,
		PDFFindController,
		PDFLinkService,
		PDFViewer
	} from 'pdfjs-dist/web/pdf_viewer';
	import { onMount } from 'svelte';
	import './viewer.css';

	const BOX = 'pdf-container';
	const VIEW = 'pdf-viewer';

	export let data;
	let book: Book;

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

		const view = new PDFViewer({
			container: container,
			eventBus,
			linkService,
			findController,
			l10n
		});

		view.currentScale = 1 * window.devicePixelRatio;

		linkService.setViewer(view);

		const loadingTask = getDocument(book.content);

		const pdfDocument = await loadingTask.promise;

		const outline = await pdfDocument.getOutline();

		const metadata = await pdfDocument.getMetadata();

		view.setDocument(pdfDocument);

		linkService.setDocument(pdfDocument, null);

		// 监听 页面渲染完成，通知上层绘制笔记内容
		eventBus.on('textlayerrendered', (value: any) => {
			console.log('kkkkkkkkk');
		});

		eventBus.on('pagesloaded', () => {
			// view.currentScale = SCALE.value
		});
	}

	onMount(async () => {
		await getBookContent();
		await renderPDF();
		console.log(book);
		// console.log('pdfjs', pdfjs);
	});
</script>

<svelte:head>
	<title>PDF</title>
	<meta name="description" content="PDF Reader" />
</svelte:head>

<main class="flex flex-row flex-1">
	<CatalogBox>
		<nav>目录</nav>
	</CatalogBox>
	<section class="flex-1 relative">
		<div id={BOX} class="h-full w-full absolute overflow-auto">
			<div id={VIEW} class="scrollWrapped pdfViewer" style="--page-border: 0;"></div>
		</div>
	</section>
	<aside class="w-72">侧边栏</aside>
</main>
