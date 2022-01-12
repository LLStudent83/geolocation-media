export default function validationCoord(data) {
  const re = /\[-?\d{1,2}\.\d{5},\s-?\d{1,2}\.\d{5}\]/ig;
  const corresponds = re.test(data);
  return corresponds;
}
