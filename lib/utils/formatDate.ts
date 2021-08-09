const formatDate = (date) => {
  const now = new Date(date).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  })
  return now
}

export default formatDate
