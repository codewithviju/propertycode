import React, { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import IpImg1 from '../../assets/images/ip-img1.jpg';
import IpImg2 from '../../assets/images/ip-img2.jpg';
import IpImg3 from '../../assets/images/ip-img3.jpg';
import Footer from '../../components/Footer/Footer';
import { getConfiguration } from '../../helpers';

const Home: FC = (props: any) => {
  const [selectedValue, setSelectedValue] = useState('Cleveland');
  const [possibleAreas, setPossibleAreas] = useState([]);
  const { apiUrl } = getConfiguration();

  const handleRedirect = () => {
    props.history.push(`/Listing/${selectedValue}`);
  };

  useEffect(() => {
    fetch(`${apiUrl}/counties`)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        setPossibleAreas(data.payload);
      });
  }, []);

  return (
    <>
      <section className="bg-heroBgImg bg-no-repeat h-auto bg-cover bg-bottom">
        <div className="container text-center py-25 pb-auto md:py-15 md:px-0 relative text-white md:w-1/2 w-4/5 ">
          <div className="hero-heading">
            <h1 className="mb-4 capitalize md:text-4xl text-2xl">
              Find investment Properties
            </h1>
          </div>

          <div className="inline-flex">
            <span className="text:lg md:text-2xl ">
              We crunch the numbers so you don't have to.
            </span>
          </div>
          <Form>
            <Form.Group className="input-group my-3">
              <Form.Select
                aria-label="Default select example"
                // name="city"
                onChange={(e: any) => setSelectedValue(e.target.value)}
              >
                {possibleAreas.map((possibleArea: string) => {
                  return <option value={possibleArea}>{possibleArea}</option>;
                })}
              </Form.Select>

              <Form.Group>
                <button
                  type="submit"
                  onClick={() => handleRedirect()}
                  className="input-group-text bg-theme-blogTitle text-white py-2 px-3 border-none rounded-tr-lg rounded-br-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </Form.Group>
            </Form.Group>
          </Form>
        </div>
      </section>

      {/* Blog Section */}
      <div className="xl:container w-full ">
        <div className=" overflow-hidden flex justify-center relative flex-col xl:flex-row m-16 h-max xl:h-80 ">
          <div className="xl:w-1/2 h-3/5 md:h-full">
            <img src={IpImg1} alt="" />
          </div>
          <div className="xl:w-1/2 flex flex-col static">
            <div className="h-full flex flex-col justify-center xl:ml-24">
              <span className="mb-0 text-theme-blogTitle text-2xl font-semibold">
                Save time and money by having PropertyBot scout your next
                project.
              </span>
              <p className="mt-2">
                Instantly become an expert contractor in any supported market,
                knowing exactly what needs to be repaired and at what cost.
                Eliminate the risk of the unknown to gain an edge on other
                investors or homebuyers.
              </p>
              <div>
                <Link
                  to="/aboutus"
                  type="button"
                  className="custom__btn custom__btn--primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" overflow-hidden flex justify-center relative flex-col xl:flex-row-reverse m-16 h-max xl:h-80  ">
          <div className="xl:w-1/2 h-3/5 md:h-full">
            <img src={IpImg2} alt="" />
          </div>
          <div className="xl:w-1/2 flex flex-col static">
            <div className="h-full flex flex-col justify-center xl:mr-24">
              <span className="mb-0 text-theme-blogTitle text-2xl font-semibold">
                Leverage the power of computer vision and artificial
                intelligence.
              </span>
              <p className="mt-2">
                Our patented machine learning algorithms weigh over 200
                different criteria for every home currently on sale, using
                proprietary computer vision and machine learning models to
                identify which properties have the lowest risk while maximizing
                the highest return.
              </p>
              <div>
                <Link
                  to="/aboutus"
                  type="button"
                  className="custom__btn custom__btn--primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" overflow-hidden flex justify-center relative flex-col xl:flex-row m-16 h-max xl:h-80 ">
          <div className="xl:w-1/2 h-3/5 md:h-full">
            <img src={IpImg3} alt="" />
          </div>
          <div className="xl:w-1/2 flex flex-col static">
            <div className="h-full flex flex-col justify-center xl:ml-24">
              <span className="mb-0 text-theme-blogTitle text-2xl font-semibold">
                Be the first to know.
              </span>
              <p className="mt-2">
                Always be the first mover in any market with specially tailored
                alerts, giving you a detailed itemized breakdown for new
                listings at your fingertips.
              </p>
              <div>
                <Link
                  to="/aboutus"
                  type="button"
                  className="custom__btn custom__btn--primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// const SearchButton = styled.button`
//   background-color: #c82020;
//   color: white;
//   padding: 0.8em;
//   border-radius: 0 10px 10px 0;
//   border: none;
// `;

// const ImageSection = styled(Col)`
//   height: 100%;
//   @media (max-width: 991px) {
//     height: 60%;
//   }
// `;

// const BlogImage = styled(Image)`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const BlogTitle = styled(Card.Text)`
//   color: #c82020;
//   font-size: 1.8rem;
//   font-weight: 600;

//   @media (max-width: 991px) {
//     font-size: 1.5rem;
//   }
// `;

// const LeftSection = styled(Col)`
//   margin-left: 90px;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   @media (max-width: 991px) {
//     margin-left: 0;
//   }
// `;

// const RightSection = styled(Col)`
//   margin-right: 90px;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   @media (max-width: 991px) {
//     margin-right: 0;
//   }
// `;

export default Home;
