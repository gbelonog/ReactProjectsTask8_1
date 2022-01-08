import faker from 'faker';

export const HASHTAGS = [
  {
    label: '#special',
    value: '#special',
    checked: false
  },
  {
    label: '#Odessa',
    value: '#Odessa',
    checked: false
  },
  {
    label: '#Hillel',
    value: '#Hillel',
    checked: false
  },
  {
    label: '#the best',
    value: '#the best',
    checked: false
  },
];

export const AUTHORS = ["Jane Austen", "Charles Dickens", "Rudyard Kipling", "Franz Kafka"];

export function makeNewsItem() {
    const hashTagIndex = faker.datatype.number({ min: 0, max: HASHTAGS.length - 1 });

    return {
      id: faker.datatype.uuid(),
      title: faker.commerce.product(),
      shortDescription: faker.lorem.sentences(2),
      text: faker.lorem.sentences(10),
      photo: faker.image.imageUrl() + faker.datatype.number({ min: 0, max: 10 }),
      hashTags: [
        HASHTAGS[hashTagIndex].value,
        HASHTAGS[hashTagIndex >= HASHTAGS.length - 1 ? 0 : hashTagIndex + 1].value,
      ],
      author: AUTHORS[faker.datatype.number({ min: 0, max: AUTHORS.length - 1 })]
  }
}

export function makeNews(count = 1) {
  return Array(1).fill('').map(() => makeNewsItem());
}