import data from '../data.json';

// QUERY-SELECTORS

// const btnArray = [...document.querySelectorAll('.person-information-time__btn')];
const firstParagraphArray = [...document.querySelectorAll('.activity-information__hours-text')];
const secondParagraphArray = [...document.querySelectorAll('.activity-information__last-week-text')];
const buttonContainer = document.querySelector('.person-information-time');

// FUNCTIONS

function capitalizeAndRemoveDash(el: string) {
	return el
		.replaceAll('-', ' ')
		.split(' ')
		.map(el => {
			return el[0].toUpperCase() + el.slice(1);
		})
		.join(' ');
}

interface Object {
	current: HTMLButtonElement[];
	previous: HTMLButtonElement[];
}

function setTextContent(obj: Object, currElement: HTMLButtonElement) {
	for (const [key, value] of Object.entries(obj)) {
		const currentParagraphArray: HTMLParagraphElement[] = value;
		currentParagraphArray.forEach((paragraph, index) => {
			const firstParagraphAttribute = paragraph.getAttribute(`data-${key}-week`);
			const capitalizedFirstParagraphAttribute = capitalizeAndRemoveDash(firstParagraphAttribute!);
			if (capitalizedFirstParagraphAttribute === data[index].title) {
				const btnAttrValue = currElement.getAttribute('data-btn');
				const currentObject = data[index];

				if (key === 'current') {
					//jak poprawić timeframes.monthly, aby typ klucza był dynamiczny na: monthly | daily | weekly??
					paragraph.textContent = `${data[index].timeframes[btnAttrValue as keyof typeof currentObject.timeframes][
						key as keyof typeof currentObject.timeframes.monthly
					].toString()}hrs`;
					return;
				}
				//jak poprawić timeframes.monthly, aby typ klucza był dynamiczny na: monthly | daily | weekly??
				paragraph.textContent = `Last week - ${data[index].timeframes[
					btnAttrValue as keyof typeof currentObject.timeframes
				][key as keyof typeof currentObject.timeframes.monthly].toString()}hrs`;
			}
		});
	}
}

const objectParagraphsArray = {
	current: firstParagraphArray as HTMLButtonElement[],
	previous: secondParagraphArray as HTMLButtonElement[],
};

buttonContainer?.addEventListener('click', e => {
	if ((e.target as HTMLButtonElement).classList.contains('person-information-time__btn')) {
		const currBtn = e.target as HTMLButtonElement;
		setTextContent(objectParagraphsArray, currBtn);
	}
});
