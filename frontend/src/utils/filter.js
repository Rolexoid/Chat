import filter from 'leo-profanity';

export default (word) => {
  filter.reset();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  return filter.clean(word);
};
