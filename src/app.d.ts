import type { ElementOrSelector, MotionKeyframesDefinition, AnimationListOptions } from 'motion';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare global {
	type TimelineSegment =
		| [ElementOrSelector, MotionKeyframesDefinition, AnimationListOptions]
		| [ElementOrSelector, MotionKeyframesDefinition];
	type TimelineDefinition = TimelineSegment[];
}
