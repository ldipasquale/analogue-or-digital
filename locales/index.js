import esTraslation from './es.json'

const languages = {
  es: esTraslation,
}

export default Object.entries(languages).reduce((accumulator, [key, translation]) => ({
  ...accumulator,
  [key]: { translation },
}), {})

export const DEFAULT_LANGUAGE = 'es'
