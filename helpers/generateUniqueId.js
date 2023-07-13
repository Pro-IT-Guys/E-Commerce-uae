const generateUniqueId = char => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = ''

  for (let i = 0; i < char; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters.charAt(randomIndex)
  }

  return id
}

export default generateUniqueId
