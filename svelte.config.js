import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: '/law-watch'
		},
		alias: {
			'components/*': 'src/components/*',
			'data/*': 'src/data/*',
			'layouts/*': 'src/layouts/*',
			'sections/*': 'src/sections/*',
			'stores/*': 'src/stores/*',
			'styles/*': 'src/styles/*',
			'utils/*': 'src/utils/*'
		}
	}
};

export default config;
