import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const Aboutus: FC = () => {
  return (
    <>
      <section className="container text-theme-title pt-24">
        <div className="flex flex-col justify-center items-center">
          <span className="text-3xl font-normal mb-4">About Us</span>
          <Link className="custom__btn custom__btn--primary" to="/Career">
            View Career Opportunities
          </Link>
        </div>

        <div className="aboutus__info space-y-10 py-4">
          <div className="welcome ">
            <span className="text-2xl">Welcome</span>
            <p className="text-md font-normal leading-5 my-2 ">
              PropetyBot was founded in late 2021 as the simplest way for real
              estate investors and prospective home buyers to gain a competitive
              edge that normally takes years of practice and expertise to
              develop. We bring prospecting properties to the 21st century by
              eliminating the need for a expert to estimate all remodeling
              costs. In real time we quickly assess the massive amounts of data
              that is posted daily to the MLS to encourage strong data driven
              investment decisions.
            </p>
          </div>

          <div className="ourteam ">
            <span className="text-2xl">Our Team</span>
            <p className="text-md font-normal leading-5 my-2 ">
              With extensive data science, artifical intelligence, machine
              learning, and real estate experience, our team has been
              syndicating and leading investment groups on fix and flip
              properties for several years. Our strategy is centered around
              using local contractor bids on listed properties to determine
              rehab costs and timeframes to minimize risk and maximize return.
              While extremely lucrative, this process requires an expert local
              contractor and is very tedious and does not scale. PropertyBot was
              founded to solve this problem for us and our clients, by
              automating the sourcing of properties, estimating costs, and
              estimating returns. We capitalized on our newly built tool for
              properties in Southern California, Cleveland, and Memphis in 2020,
              and quickly realized its potential as a serious tool for
              investors. We then patented this algorithm and launched
              PropertyBot for public usage in late 2021.
            </p>
          </div>

          <div className="howitworks ">
            <span className="text-2xl">How it works</span>
            <p className="text-md font-normal leading-5 my-2 ">
              In real estate, speed matters. We automated algorithms to go
              through and classify every home in a given market. We have an
              automated process do all the hard work, and leave you with all the
              data you need to make an informed purchase.
            </p>
            <ul className="list-disc mx-8">
              <li>
                We use computer vision and artificial intelligence to go through
                all data and photos for a listing
              </li>
              <li>
                Our patented algorithm uses hundreds of trained data points to
                automatically determines the itemized cost of a remodel
              </li>
              <li>
                We apply sophisticated real estate models and comparable rental
                and listing data to determine your rate of return post remodel
              </li>
              <li>
                All this data is returned to you in an easily digestible format
                on our website or via CSV
              </li>
            </ul>
          </div>

          <div className="record ">
            <span className="text-2xl">Proven Track Record</span>
            <p className="text-md font-normal leading-5 my-2 ">
              While only having been available to the public since 2021, the
              software has been used in 2020 to purchase a large variety of
              properties in Class A, B & C investment properties across the
              United States. PropertyBot targets Class B and C multifamily
              properties with value-add opportunities using parameters such as
              older buildings, cosmetic repairs, operational improvements, and
              improving demographic to maximize investor return or homebuyer
              satisfaction.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Aboutus;
