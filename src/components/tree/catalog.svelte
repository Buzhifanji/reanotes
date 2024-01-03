<script context="module" lang="ts">
	export type TreeItem = {
		title: string;
		id: string;
		children?: TreeItem[];
	};
</script>

<script lang="ts">
	import { type TreeView } from '@melt-ui/svelte';
	import { getContext } from 'svelte';

	export let treeItems: TreeItem[];
	export let level = 1;

	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected }
	} = getContext<TreeView>('tree');
</script>

{#each treeItems as { id, title, children }, i}
	{@const hasChildren = !!children?.length}

	<li>
		<a
			{...$item({
				id,
				hasChildren
			})}
			use:item>{title}</a
		>
		{#if hasChildren}
			<ul {...$group({ id })} use:group>
				<svelte:self treeItems={children} level={level + 1} />
			</ul>
		{/if}
	</li>
{/each}
