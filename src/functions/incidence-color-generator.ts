export const getColorFromIncidence = (incidence: number): string => {
  if (incidence <= 15) return "incidence-fifteen";
  if (incidence <= 25) return "incidence-twentyfive";
  if (incidence <= 35) return "incidence-thirtyfive";
  if (incidence <= 50) return "incidence-fifty";
  if (incidence <= 100) return "incidence-hundred";
  if (incidence <= 200) return "incidence-twohundred";
  if (incidence <= 350) return "incidence-threehundredfifty";
  if (incidence <= 500) return "incidence-fivehundred";
  if (incidence <= 1000) return "incidence-thousand";
  return "";
};
