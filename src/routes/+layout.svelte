<script lang="ts">
	import '@wevisdemo/ui/styles/components.css';
	import '@wevisdemo/ui/styles/typography.css';
	import 'styles/master.scss';

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { weAreAlwaysHiring } from 'utils/we-are-hiring';

	import WvNavButton from '@wevisdemo/ui/components/nav-button.svelte';
	import WvNavbar from '@wevisdemo/ui/components/navbar.svelte';

	onMount(() => {
		weAreAlwaysHiring();
	});
</script>

<body class="wv-font-anuphan" class:bg-white={$page.routeId === 'about'}>
	<WvNavbar
		homeHref="https://wevis.info/"
		logoAddonSrc="/law-watch/101pub.png"
		title="LAW WATCH"
		dark={true}
		alwayShowSlot={false}
		children={null}
	>
		<WvNavButton
			active={$page.routeId === ''}
			dark={true}
			onClick={() => goto(`${base}/`)}
			children={null}>Home</WvNavButton
		>
		<WvNavButton
			active={$page.routeId === 'about'}
			dark={true}
			onClick={() => goto(`${base}/about`)}
			children={null}>About</WvNavButton
		>
	</WvNavbar>
	<slot />
</body>
