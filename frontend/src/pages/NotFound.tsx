import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <section>
      <div className="d-flex w-100 vh-100  flex-column align-items-center justify-content-center gy-3">
        <h1 className="text-danger">
          404
        </h1>
        <p className="h5 text-black">Page not found</p>
        <Link to="/">
          <button className="btn btn-secondary">Go Back</button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
