import ProgressBar from "react-bootstrap/ProgressBar";
export function ReviewStats({ reviews, className }) {
  let stats = [];
  for (let i = 1; i <= 5; i++) {
    let reviewStats = reviews.filter(
      (review) => review.rating == JSON.stringify(i)
    );
    let percentage = (reviewStats.length / reviews.length) * 100;
    stats.push(percentage);
  }

  return (
    <div className={className}>
      <div className="stats mt-2">
        <small className="font-weight-bold link">5 Star</small>
        <div className="w-65-c">
          <ProgressBar variant="warning" now={stats[4]} />
        </div>
        <small className="font-weight-bold link">{Math.round(stats[4])}%</small>
      </div>
      <div className="stats mt-2">
        <small className="font-weight-bold link">4 Star</small>
        <div className="w-65-c">
          <ProgressBar variant="warning" now={stats[3]} />
        </div>
        <small className="font-weight-bold link">{Math.round(stats[3])}%</small>
      </div>
      <div className="stats mt-2">
        <small className="font-weight-bold link">3 Star</small>
        <div className="w-65-c">
          <ProgressBar variant="warning" now={stats[2]} />
        </div>
        <small className="font-weight-bold link">{Math.round(stats[2])}%</small>
      </div>
      <div className="stats mt-2">
        <small className="font-weight-bold link">2 Star</small>
        <div className="w-65-c">
          <ProgressBar variant="warning" now={stats[1]} />
        </div>
        <small className="font-weight-bold link">{Math.round(stats[1])}%</small>
      </div>
      <div className="stats mt-2 mb-2">
        <small className="font-weight-bold link">1 Star</small>
        <div className="w-65-c">
          <ProgressBar variant="warning" now={stats[0]} />
        </div>
        <small className="font-weight-bold link">{Math.round(stats[0])}%</small>
      </div>
    </div>
  );
}
