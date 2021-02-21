export function ReviewStars({ number }) {
  let stars = [];
  for (let i = 1; i < number; i++) {
    stars.push(<i key={i} className="fa fa-star"></i>);
  }
  const decimal = number % 1;
  if (decimal >= 0.75 || decimal == 0) {
    stars.push(<i key={decimal} className="fas fa-star"></i>);
  }
  if (decimal > 0.3 && decimal < 0.75) {
    stars.push(<i key={decimal} className="fas fa-star-half-alt"></i>);
  }
  if (decimal > 0 && decimal <= 0.3) {
    stars.push(<i key={decimal - 1} className="far fa-star "></i>);
  }
  while (stars.length < 5) {
    stars.push(<i key={decimal - 1} className="far fa-star "></i>);
  }
  return <div className="fa-cs mr-2">{stars}</div>;
}
