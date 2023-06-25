import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className="notFound">
      <h1>Sorry</h1>
      <h3>Page Not Found</h3>
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default notFound;
