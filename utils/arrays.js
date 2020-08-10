function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // eslint-disable-line no-multi-assign
      [array[i], array[j]] = [array[j], array[i]] // eslint-disable-line no-param-reassign,no-unexpected-multiline,no-sequences,no-use-before-define,max-len
  }
}

export default {
  shuffleArray,
}
