<script lang="ts">
	import '@wevisdemo/ui/styles/index.css';
	import 'styles/master.scss';

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { weAreAlwaysHiring } from 'utils/we-are-hiring';

	import WvFooter from '@wevisdemo/ui/svelte/footer.svelte';
	import WvNavButton from '@wevisdemo/ui/svelte/nav-button.svelte';
	import WvNavbar from 'components/wv/navbar.svelte';

	onMount(() => {
		weAreAlwaysHiring();
	});
</script>

<body class="wv-font-anuphan" class:bg-white={$page.route.id === 'about'}>
	<WvNavbar>
		<WvNavButton active={$page.route.id === ''} dark onClick={() => goto(`${base}/`)}
			>Home</WvNavButton
		>
		<WvNavButton active={$page.route.id === 'about'} dark onClick={() => goto(`${base}/about`)}
			>About</WvNavButton
		>
	</WvNavbar>
	<slot />
	<WvFooter dark={false} />
</body>
