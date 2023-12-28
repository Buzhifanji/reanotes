<script>
	import './styles.css';

	// goto('/list/book-list');
	// export const load = () => redirect(302, '/list/book-list');
</script>

<div class="app">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
