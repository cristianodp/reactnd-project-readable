export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function getOrderSortFunction(order) {
  switch (order) {
    case "Votes Decrescent":
      return (a, b) => b.voteScore - a.voteScore;
    case "Votes Increasing":
      return (a, b) => a.voteScore - b.voteScore;
    case "Date Decrescent":
      return (a, b) => b.timestamp - a.timestamp;
    case "Date Increasing":
      return (a, b) => a.timestamp - b.timestamp;
    default:
      return (a, b) => a.timestamp - b.timestamp;
  }
}

export function getFilterPost(filter) {
  let { search = "", categorySelected = "" } = filter;
  if (categorySelected === "all") categorySelected = "";
  
  return it =>
    (( it.title && it.title.toUpperCase().includes(search.toUpperCase())) ||
     ( it.author && it.author.toUpperCase().includes(search.toUpperCase()) )||
     ( it.body  && it.body.toUpperCase().includes(search.toUpperCase()))) &&
    (it.category && it.category.toUpperCase().includes(categorySelected.toUpperCase()));
}
