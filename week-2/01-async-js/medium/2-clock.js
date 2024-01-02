function updateTime() {
  const date = new Date();
  const hours24 = String(date.getHours()).padStart(2, "0"); // padStart() adds a 0 to the left of the string if the string is less than 2 characters long
  const hours12 = date.getHours() % 12;
  const amPm = date.getHours() >= 12 ? "PM" : "AM"; // ternary operator. if date.getHours() >= 12, then "PM", else "AM"
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const time24 = `${hours24}:${minutes}:${seconds}`;
  const time12 = `${hours12}:${minutes}:${seconds} ${amPm}`;
  console.log(time24);
  console.log(time12);
}

setInterval(updateTime, 1000);
