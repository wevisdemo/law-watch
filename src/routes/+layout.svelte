<script lang="ts">
	import '@wevisdemo/ui/styles/index.css';
	import 'styles/master.scss';

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { weAreAlwaysHiring } from 'utils/we-are-hiring';

	import WvCookieConsent from '@wevisdemo/ui/svelte/cookie-consent.svelte';
	import WvFooter from '@wevisdemo/ui/svelte/footer.svelte';
	import WvNavButton from '@wevisdemo/ui/svelte/nav-button.svelte';
	import WvNavbar from 'components/wv/navbar.svelte';

	const onCookieAccept = (option: Record<string, boolean>) => {
		if ('Performance' in option && option['Performance']) {
			// TODO: Add analytics
		}
	};

	onMount(() => {
		weAreAlwaysHiring();
	});
</script>

<body class="wv-font-anuphan" class:bg-white={$page.route.id === '/about'}>
	<WvCookieConsent
		policyUrl="https://wevis.info/cookies_1-3/"
		hasStrictlyNecessaryCookies
		cookieOptions={['Performance']}
		onAccept={onCookieAccept}
	/>
	<WvNavbar>
		<WvNavButton active={$page.route.id === '/'} dark onClick={() => goto(`${base}/`)}
			>Home</WvNavButton
		>
		<WvNavButton active={$page.route.id === '/about'} dark onClick={() => goto(`${base}/about`)}
			>About</WvNavButton
		>
	</WvNavbar>
	<slot />
	<WvFooter />
</body>
