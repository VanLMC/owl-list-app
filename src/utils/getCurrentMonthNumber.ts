const getCurrentMonthNumber = () => {
  const currentDate = new Date();
  const monthNumber = currentDate.getMonth(); // Returns a value from 0 to 11
  return monthNumber;
};

export default getCurrentMonthNumber;
