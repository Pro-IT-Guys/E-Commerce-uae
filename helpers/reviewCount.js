export const reviewCount = (totalReviews, rating) => {
  const ratingParcent = (Number(rating) / Number(totalReviews)) * 100
  const ratingParcentRounded = Math.round(ratingParcent)
  return ratingParcentRounded
}
