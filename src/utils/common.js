const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomElements = (elements, maxLenght) => {
  const length = getRandomInteger(1, maxLenght);
  const randomElements = [];
  for (let i = 0; i < length; i++) {
    randomElements.push(elements[i]);
  }

  return randomElements;
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const getNewArray = (count, action) => new Array(count).fill(``).map(action);

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {
  getRandomInteger,
  getRandomElement,
  getRandomElements,
  getRandomBoolean,
  getNewArray,
  updateItem
};
