const pptExt = [
  'ppt',
  'pptx'
]

export default (filename) => {
  const arr = filename.split('.')
  return pptExt.includes(arr[arr.length - 1])
}
