function idGenarator(key) {
  const date = new Date();
  const year = date.getFullYear();
  const monthe = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const sec = date.getSeconds();
  const uniqueID = key + year + monthe + day + hour + sec;
  return uniqueID;
}

export default idGenarator;
