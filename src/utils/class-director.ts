const html_style_log = [];

const addLog = (name: string, method: string) => {
	html_style_log.push({ name, method });
};

export const addClass = (classname: string, target: HTMLElement = document.documentElement) => {
	addLog(classname, 'addClass');
	target.classList.add(classname);
};

export const removeClass = (classname: string, target: HTMLElement = document.documentElement) => {
	addLog(classname, 'removeClass');
	target.classList.remove(classname);
};
