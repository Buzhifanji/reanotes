<script lang="ts">
	export let label: string = '';
	export let value: string = '';
</script>

<li>
	<a class="group gap-4 items-baseline">
		<span class="font-medium text-lg opacity-40">{label}</span>
		<span class="font-medium text-lg">{value}</span>
	</a>
</li>
