function generateId(length, prefix) {
    let result = prefix + '';
    const numbers = "0123456789";
    let counter = prefix.length;
    while (counter < length) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
      counter += 1;
    }
    return result;
}

export default generateId