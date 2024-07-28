export default {
  toCamelCase: (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
  },

  toKebabCase: (str) =>
    str
      .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
      .toLowerCase()
      .replace(/^-/, '')
      .replace(/-$/, ''),

  toSnakeCase: (str) =>
    str
      .replace(/([a-z])([A-Z0-9])/g, '$1_$2')
      .toLowerCase()
      .replace(/^-/, '')
      .replace(/-$/, ''),

  toPascalCase: (str) => {
    return str
      .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
      .toLowerCase()
      .replace(/^-/, '')
      .replace(/-$/, '')
  },
}
