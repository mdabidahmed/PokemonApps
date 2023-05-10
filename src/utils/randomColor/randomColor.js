import {badgeColorTokens} from '../../tokens/colors';
export const generateRandomColor = () => {
  const randomColor =
    badgeColorTokens[Math.floor(Math.random() * badgeColorTokens.length)];
  return randomColor;
};
