<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { weAreAlwaysHiring } from 'utils/we-are-hiring';

	import '@wevisdemo/ui/styles/typography.css';
	import '@wevisdemo/ui/styles/components.css';

	import WvNavbar from '@wevisdemo/ui/components/navbar.svelte';
	import WvNavButton from '@wevisdemo/ui/components/nav-button.svelte';

	import 'styles/master.scss';
	import { onMount } from 'svelte';

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
