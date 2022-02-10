import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/facebook.png';
import logo from '../../assets/images/logo/PropertyBot-f.png';
import twitter from '../../assets/images/twitter.png';
import whatsapp from '../../assets/images/whatsapp.png';

const Footer: FC = () => {
  return (
    <>
      <footer className="mt-2">
        <div className="container-fluid">
          <div className="row px-5 ps-1 pe-3">
            <div className="col-lg-6 col-md-6 ">
              <img src={logo} style={{ width: '170px' }} alt="" />
            </div>
            <div className="col-lg-6 col-md-6  ps-1 text-end">
              <Link to="/">
                <img
                  style={{ padding: '0px 0.8rem', height: '30px' }}
                  src={facebook}
                  alt=""
                />
              </Link>
              <Link to="/">
                <img
                  style={{ padding: '0px 0.8rem', height: '30px' }}
                  src={twitter}
                  alt=""
                />
              </Link>
              <Link to="/">
                <img
                  style={{ padding: '0px 0.8rem', height: '30px' }}
                  src={whatsapp}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// const FooterLogo = styled.div`
//   @media (max-width: 768px) {
//     text-align: center;
//     padding: 0.8rem 0;
//   }
// `;

// const SocialButton = styled.div`
//   @media (max-width: 768px) {
//     text-align: center !important;
//   }
// `;

export default Footer;
