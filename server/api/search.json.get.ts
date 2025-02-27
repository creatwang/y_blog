

export default eventHandler(async (event) => {
  // @ts-ignore
  return queryCollection(event).where({ _type: 'markdown', navigation: { $ne: false } }).find()
})
