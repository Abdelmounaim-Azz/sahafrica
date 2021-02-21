export function ReviewStarsSimple({ number }) {
  let stars = [];
  for (let i = 1; i < number + 1; i++) {
    stars.push(<i key={i} className="fa fa-star"></i>);
  }

  while (stars.length < 5) {
    stars.push(<i key={stars.length + 1} className="far fa-star "></i>);
  }
  return <div className="fa-cs mr-2">{stars}</div>;
}
