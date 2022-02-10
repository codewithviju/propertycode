import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';

const Career: FC = () => {
  return (
    <>
      <section className="container pt-28 px-8">
        <div className="career__info font-normal text-lg space-y-8 leading-6">
          <span>
            The Real Estate Market is exploding, and speed is more important
            that ever. For investors everywhere, the market is getting more and
            more competitive, and everyone is looking for their edge.
          </span>

          <p>
            PropertyBot empowers investors to hyper leverage their sourcing
            efforts and identify market before the broader market. We use the
            entire MLS, We have an automated process do all the hard work, and
            leave you with all the data needed to make a purchase. We use
            computer vision and artificial intelligence to go through all data
            and photos for a listing, and our pattened algorithms automatically
            determines what the cost of remodel is within certain thresholds. We
            apply sophisticated real estate models and comparable rental and
            listing data to determine rate of return in an easily digestible
            format on our website or via CSV.
          </p>

          <p>
            PropertyBot is growing quick and disrupting a massive market with
            patented technology!
          </p>
          <p>
            Name Your Role: if you do not see a role below that fits you and
            still believe you can add value, feel free to email{' '}
            <span className="text-theme-linkTitle text-xl ">
              <Link to="">propertybothelp@gmail.com.</Link>
            </span>
          </p>
        </div>
        <div className="career__job space-y-4 py-8">
          <h2 className="text-2xl font-medium capitalize">
            Current job Openings
          </h2>
          Please email your resume to{' '}
          <span>
            <Link to="/Career">propertybothelp@gmail.com</Link>.
          </span>
          <div className="d-flex flex-column space-y-6">
            <div className="d-flex flex-column">
              <h3 className="text-xl font-medium py-2">Engineering</h3>
              <span className="text-theme-linkTitle text-xl ">
                <Link to="/Career">Data Scientist</Link>
              </span>
              <small className="text-theme-smallText text-base font-normal">
                Los Angeles / Remote
              </small>
              <span className="text-theme-linkTitle text-xl ">
                <Link to="/Career">Software Quality Engineer</Link>
              </span>
              <small className="text-theme-smallText text-base font-normal">
                Los Angeles / Remote
              </small>
            </div>

            <div className="d-flex flex-column">
              <h3 className="text-xl font-medium py-2">Product</h3>
              <span className="text-theme-linkTitle text-xl ">
                <Link to="/Career">Growth Marketing Manager</Link>
              </span>
              <small className="text-theme-smallText text-base font-normal">
                Los Angeles / Remote
              </small>
              <span className="text-theme-linkTitle text-xl ">
                <Link to="/Career">Product Manager</Link>
              </span>
              <small className="text-theme-smallText text-base font-normal">
                Los Angeles / Remote
              </small>
            </div>

            <div className="d-flex flex-column">
              <h3 className="text-xl font-medium py-2">Business Development</h3>
              <span className="text-theme-linkTitle text-xl ">
                <Link to="/Career">Analyst</Link>
              </span>
              <small className="text-theme-smallText text-base font-normal">
                Los Angeles / Remote
              </small>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Career;
