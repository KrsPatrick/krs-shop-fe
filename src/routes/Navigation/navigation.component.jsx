import { Fragment, useContext } from "react"
import {Outlet, Link} from "react-router-dom"
import { ReactComponent as Crown } from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { CartContext } from "../../context/cart.context"
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";

const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)

    


    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Crown className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                                Sign In
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )
  }

  export default Navigation