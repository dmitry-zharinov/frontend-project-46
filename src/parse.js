const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

export default parse;