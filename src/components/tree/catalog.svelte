<script context="module" lang="ts">
	export type TreeItem = {
		title: string;
		id: string;
		children?: TreeItem[];
	};
</script>

<script lang="ts">
	import { type TreeView } from '@melt-ui/svelte';
	import { createEventDispatcher, getContext } from 'svelte';

	const dispatch = createEventDispatcher();

	export let treeItems: TreeItem[];
	export let level = 1;

	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected }
	} = getContext<TreeView>('tree');

	function onClick(val: TreeItem) {
		dispatch('click', val);
	}
</script>

{#each treeItems as val, i}
	{@const hasChildren = !!val.children?.length}

	<li>
		<a
			{...$item({
				id: val.id,
				hasChildren
			})}
			use:item
			on:click={() => onClick(val)}
		>
			{val.title}
		</a>
		{#if hasChildren}
			<ul {...$group({ id: val.id })} use:group>
				<svelte:self
					treeItems={val.children}
					level={level + 1}
					on:click={(val) => onClick(val.detail)}
				/>
			</ul>
		{/if}
	</li>
{/each}
