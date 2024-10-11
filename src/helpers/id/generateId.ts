export const generateId = () => {
  let id = ''

  for (let i = 0; i < 24; i++) {
    id += Math.round(Math.random() * 10).toString()
  }

  return id
}
