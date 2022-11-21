import { computePosition, offset, shift, arrow } from '@floating-ui/dom';

export const showTooltip =
	(options: { middleware: (el: Element) => Element } = { middleware: (e) => e }) =>
	(event: MouseEvent) => {
		if (!event.target) return;

		window.el_tooltip.children[0].textContent =
			(event.target as HTMLImageElement).dataset.title ?? '';
		window.el_tooltip.classList.add('show');

		computePosition(options.middleware(event.target as Element), window.el_tooltip, {
			placement: 'top',
			middleware: [
				offset(16),
				shift({ padding: 8 }),
				arrow({
					element: window.el_tooltip_arrow
				})
			]
		})
			.then(({ x, y, middlewareData }) => {
				Object.assign(window.el_tooltip.style, {
					left: `${x}px`,
					top: `${y}px`
				});

				if (middlewareData.arrow) {
					const { x, y } = middlewareData.arrow;

					Object.assign(window.el_tooltip_arrow.style, {
						left: x != null ? `${x}px` : '',
						top: y != null ? `${y}px` : ''
					});
				}
			})
			.catch(() => undefined);
	};

export const hideTooltip = () => {
	window.el_tooltip.classList.remove('show');
	Object.assign(window.el_tooltip.style, {
		left: null,
		top: null
	});
	Object.assign(window.el_tooltip_arrow.style, {
		left: null,
		top: null
	});
};
