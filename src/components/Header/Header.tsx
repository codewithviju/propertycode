import React, { FC, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/logo/PropertyBot-f.png';
import SignInForm from '../Auth/SignInForm';
import SignUpForm from '../Auth/SignUpForm';

const Header: FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [manageButton, setManageButton] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseRegistarModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);

  const history = useHistory();
  const redirectHome = useHistory();
  const location = useLocation();

  const handleRedirect = () => {
    history.push(`/Listing`);
  };

  const handleRedirect2 = () => {
    history.push(`/Listing2`);
  };

  const redirectHomePage = () => {
    redirectHome.push(`/`);
  };

  let isHomePage = location.pathname === '/';
  const isSignedIn = localStorage?.getItem('token');

  return (
    <>
      <nav
        className={
          'w-full z-10 flex flex-wrap items-center justify-between px-2 py-2 ' +
          (isHomePage ? ' lg:bg-transparent bg-red-300 ' : ' bg-white ') +
          (isHomePage ? ' absolute ' : ' fixed ')
        }
      >
        <div
          className={
            'container-fluid border-none px-4 mx-auto flex flex-wrap items-center justify-between ' +
            (isHomePage ? '' : ' shadow-xs ')
          }
        >
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link className="inline-block mr-4 py-2 whitespace-nowrap " to="/">
              <img src={logo} alt="Logo" className="w-44" />
            </Link>
            <button
              className={
                'cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent' +
                'rounded bg-transparent block lg:hidden outline-none focus:outline-none' +
                (isHomePage ? ' text-white ' : ' text-black ')
              }
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              <li className="nav-link">
                <Link
                  className={
                    ' px-3 flex items-center ' +
                    (isHomePage ? ' text-white ' : ' text-black ')
                  }
                  to="/Listing/Cleveland"
                  onClick={() => handleRedirect()}
                >
                  Listings
                </Link>
              </li>

              <li className="nav-link">
                <Link
                  className={
                    ' px-3 flex items-center ' +
                    (isHomePage ? ' text-white ' : ' text-black ')
                  }
                  to="/Aboutus"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-link">
                <Link
                  className={
                    ' px-3 flex items-center ' +
                    (isHomePage ? ' text-white ' : ' text-black ')
                  }
                  to="/Investment"
                >
                  Contact
                </Link>
              </li>
              {isSignedIn ? (
                <span
                  className={
                    ' rounded-md mx-4 px-3 py-2 cursor-pointer transition-all border ' +
                    'hover:bg-red-600 hover:text-white hover:border-none' +
                    (isHomePage ? ' border-white ' : ' border-gray-500 ') +
                    (isHomePage ? ' text-white ' : '  ')
                  }
                  onClick={() => {
                    redirectHomePage();
                    setManageButton(!manageButton);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                  }}
                >
                  Signout
                </span>
              ) : (
                <div className="flex flex-col lg:flex-row">
                  <span
                    className={
                      ' rounded-md mx-4 px-3 py-2 cursor-pointer transition-all border ' +
                      'hover:bg-red-600 hover:text-white hover:border-none' +
                      (isHomePage ? ' border-white ' : ' border-gray-500 ') +
                      (isHomePage ? ' text-white ' : '  ')
                    }
                    onClick={handleShowLoginModal}
                  >
                    Login
                  </span>
                  <span
                    className={
                      ' rounded-md mx-4 px-3 py-2 cursor-pointer transition-all border ' +
                      'hover:bg-red-600 hover:text-white hover:border-none' +
                      (isHomePage ? ' border-white ' : ' border-gray-500 ') +
                      (isHomePage ? ' text-white ' : '  ')
                    }
                    onClick={handleShowRegisterModal}
                  >
                    Registration
                  </span>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <section className="LoginModal">
        <Modal
          show={showLoginModal}
          onHide={handleCloseLoginModal}
          id="LoginModal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <h2 className="m-3 text-theme-blogTitle text-2xl">Sign in</h2>
          <p className="m-3">
            Not a member yet? <br />
            <span
              className="text-theme-blogTitle cursor-pointer"
              onClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
            >
              Register Now.
            </span>
          </p>
          <Modal.Body>
            <SignInForm onSuccess={() => setShowLoginModal(false)} />
          </Modal.Body>
        </Modal>
      </section>

      {/* Register Modal */}
      <section className="register__modal">
        <Modal
          id="RegistrationModal"
          show={showRegisterModal}
          onHide={handleCloseRegistarModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <h2 className="m-3 text-theme-blogTitle text-2xl">Sign up</h2>
          <p className="m-3">
            Have an account? <br />
            <span
              className="text-theme-blogTitle cursor-pointer"
              onClick={() => {
                setShowLoginModal(true);
                setShowRegisterModal(false);
              }}
            >
              Login in
            </span>
          </p>
          <Modal.Body>
            <SignUpForm onSuccess={() => setShowRegisterModal(false)} />
          </Modal.Body>
        </Modal>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

// const AuthButtons = styled.div`
//   display: flex;
//   @media (max-width: 991px) {
//     flex-direction: column;
//   }
// `;

// const AuthButton = styled(Nav.Link)`
//   border: ${(props) =>
//     props.isHomePage ? "1px solid #ffffff" : "1px solid #ddd"};
//   color: ${(props) => (props.isHomePage ? "#ffffff" : "#000000")} !important;
//   background-color: transparent;
//   padding: 0.5em;
//   margin: 0 1rem;
//   border-radius: 0.2rem;

//   :hover {
//     background-color: #c82020;
//     border: 1px solid #c82020;
//     color: #ffffff !important;
//     transition: all 0.3s;
//   }

//   @media (max-width: 991px) {
//     color: #000 !important;
//     border: none;
//     font-weight: 500;
//     padding: 0.5em 0;

//     :hover {
//       background-color: transparent !important;
//       border: none !important;
//       color: #000 !important;
//     }
//   }
// `;

// const Title = styled.h2`
//   color: #c82020;
// `;

// const ForwardLink = styled.a`
//   color: #c82020;
//   text-decoration: none;
//   cursor: pointer;
// `;

export default Header;
