import Icon from 'react-native-vector-icons/FontAwesome';

export const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  for (let i = 1; i <= 5; i++) {
    const iconName = i <= fullStars ? 'star' : i === fullStars + 1 && hasHalfStar ? 'star-half-o' : 'star-o';
    stars.push(<Icon key={i} name={iconName} size={14} color="#f7ffae" />);
  }
  return stars;
};
