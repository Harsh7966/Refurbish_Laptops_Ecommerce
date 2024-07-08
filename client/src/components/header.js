import { NavLink, useLocation } from "react-router-dom";
import { UseContext } from "../storage/auth";
import { Category } from "./category";

export const Header = () => {
  const { isUserLogin } = UseContext();
  const location = useLocation();


  return (
    <>
      {location.pathname === "/" && (
        <div className="welcome-text">
          <h6 className="text-center">Welcome to our store</h6>
        </div>
      )}

      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-xl flex justify-between items-center">
          <div className="flex items-center">

            {/* Cart icon */}
            <div className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/cart">
                <img src="/cart.png" alt="cart_img" width="30px" />
              </NavLink>
            </div>

            {/* Profile or Cart icon based on user login */}
            {isUserLogin ? (
              <div className="nav-item">
                <NavLink className="nav-link active profile" aria-current="page" to="/profile">
                  <img src="/user.png" alt="profile_img" width="33px" />
                </NavLink>
              </div>
            ) : (
              <div className="nav-item">
                <NavLink className="nav-link active cart" to="/login">
                  <img src="/user.png" alt="cart_img" width="33px" />
                </NavLink>
              </div>
            )}

            {/* Search bar logo */}
            {/* <div class="search-box">
              <button class="btn-search"><i class="fas fa-search"></i></button>
              <input type="text" class="input-search" placeholder="Type to Search..."/>
            </div> */}
            
          </div>

          {/* Web logo */}
          <div className="nav-item webLogo">
            <NavLink className="navbar-brand " to="/">
              <img src="/webLogo.avif" className="webLogo" alt="webLogo" />
            </NavLink>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* My Orders button */}
          <div className="nav-item">
            <NavLink className="nav-link active navbar navbar-expand-md bg-body-tertiary" aria-current="page" to="/myorders">
              <button className="trackOrder collapse navbar-collapse" id="navbarSupportedContent"> MY ORDERS</button>
            </NavLink>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-md bg-body-tertiary ">
        <div className="collapse navbar-collapse categoryInNav" id="navbarSupportedContent">
          <Category />
        </div>
      </nav>
    </>
  );
};

