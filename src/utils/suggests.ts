import { computePosition, offset, shift } from '@floating-ui/dom';

export const showSuggest = () => {
	const el_ref = window.el_searchbox.parentElement ?? window.el_searchbox;

	Object.assign(window.el_suggest.style, {
		width: `${el_ref.getBoundingClientRect().width}px`
	});

	window.el_suggest.classList.add('show');
	computePosition(el_ref, window.el_suggest, {
		placement: 'bottom',
		middleware: [offset(16), shift({ padding: 8 })]
	}).then(({ x, y }) => {
		Object.assign(window.el_suggest.style, {
			left: `${x}px`,
			top: `${y}px`
		});
	});
};

export const hideSuggest = () => {
	setTimeout(() => {
		window.el_suggest.classList.remove('show');
		Object.assign(window.el_suggest.style, {
			left: null,
			top: null
		});
	}, 100);
};
