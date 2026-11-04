var currentDate = new Date();
var futureDate = new Date();
futureDate.setDate(currentDate.getDate() + 1);
const date = futureDate.toLocaleDateString('en-CA');

export default date