function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand h1" href="#">
          App-Crud
        </a>

        <div>
          <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
