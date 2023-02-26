function capitalizeFirstLetter(list) {
  return list.map((item) => {
    if (typeof item === "string") {
      return item.charAt(0).toUpperCase() + item.slice(1);
    } else {
      return item;
    }
  });
}