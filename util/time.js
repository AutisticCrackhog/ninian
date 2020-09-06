module.exports = (format) => {
  if (typeof format != "string") return "";

  let dateString = new Date().toLocaleString("de-DE", {timeZone: "Europe/Berlin"}).replace(",", "");

  let split = dateString.split(" ");
  let date = split[0].split("/");
  date = date.map(x => x < 10 ? "0"+x : x );
  let [month, day, year] = date;

  let time = split[1].split(":");
  if (split[2] == "PM") {
    time[0] = (parseInt(time[0]) + 12).toString();
  }
  time = time.map(x => x < 10 ? "0"+x : x );
  let [hour, minute, second] = time;

  format = format
  .replace(/hr/g, hour)
  .replace(/min/g, minute)
  .replace(/sec/g, second)
  .replace(/y/g, year)
  .replace(/d/g, day)
  .replace(/m/g, month);

  return format;
}