<script lang="ts">
	import type { Book } from '@database';
	import { getFilExtname, getFilename } from '@shared';
	import Li from './li.svelte';

	export let book: Book;
</script>

{#if book}
	<ul class="menu">
		<li>
			<span class="font-extrabold text-base">{getFilename(book.title)}</span>
		</li>
		<Li label="作者" value="dd" />
		<Li
			label="摘要"
			value="从言语表达的角度看，说写者在用词造句时必须遵循语法规
    则，否则听读者会不知所云或感到别扭。例如，光有“力量、就、知识、
    是”几个零散的词，还无法表达意思；把它们加合成“力量就知识是”或“是
    就知识力量”，也还是不能表达意思，因为这些组合不符合汉语的结构规
    则。只有按照汉语语法规则，把它们组成 “主＋动＋宾”的结构，即说成“知
    识就是力量”，才能让听读者理解。又如，当听到外国学生说“一点点我不
    舒服”“尽管天塌下来，我也能顶得住”这类句子时，我们能明白其意，但
    会感到很别扭，觉得不像中国话。原因在于这类组合偏离了汉语的语法
    规则。按照汉语的语法规则，前一句中的“一点（点）”不能用来修饰全句，
    也不能用来修饰形容词，应改为“我有点儿不舒服”。后一句前后两个分句
    是让步关系，应改为“即使......也”。“尽管......也”在汉语中不能搭配"
		/>
		<Li label="类型" value={getFilExtname(book.title).toLocaleUpperCase()} />
		<Li label="发布时间" value="PDF" />
		<Li label="上传时间" value={book.createTime} />
		<Li label="上次阅读时间" value="PDF" />
		<Li label="出版社" value="PDF" />
		<Li label="字数" value="PDF" />
		<Li label="语言" value="PDF" />
		<!-- <Li label="进度" value="PDF" /> -->
	</ul>
{/if}
