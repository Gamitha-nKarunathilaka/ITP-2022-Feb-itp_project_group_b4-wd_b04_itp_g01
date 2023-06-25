export function colorchange(status) {
  switch (status) {
    case "Complete":
      return "success";
    case "Pending":
      return "warning";
    case "Approved":
      return "info";
    case "Rejected":
      return "error";
    case "Valid":
      return "success";
    case "Expired":
      return "error";
    case "Claimed":
      return "warning";
  }
}

export function dateFormatter(value) {
  const date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return [year, month, day].join("-");
}

export function timeFormatter(value) {
  const date = new Date(value);
  let h = date.getHours();
  let min = date.getMinutes();
  console.log(h);
  return [h, min].join(":");
}

export function getMonthe() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  let thismonthe = monthNames[today.getMonth()];
  let formatPrevMonth = new Date(today.setMonth(today.getMonth() - 1));
  let lastmonthe = monthNames[formatPrevMonth.getMonth()];
  return [lastmonthe, thismonthe].join("-");
}

export function monthe() {
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let thismonthe = monthNames[today.getMonth() - 1];
  return thismonthe;
}

export function year() {
  const today = new Date();
  const year = today.getFullYear();
  return year;
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
