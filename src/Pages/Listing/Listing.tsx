import axios from 'axios';
import { saveAs } from 'file-saver';
import GoogleMapReact, { Coords } from 'google-map-react';
import { size } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo2 from '../../assets/images/logo/PropertyBot.svg';
import logo1 from '../../assets/images/logo/SimpleLogo.png';
import NotFoundImg from '../../assets/images/notfound-img.png';
import Marker from '../../components/Marker/Marker';
// import ImageGalleryModal from '../../components/Modal/ImageGalleryModal';
import { getConfiguration } from '../../helpers';
import './Listing.css';
var HRNumbers = require('human-readable-numbers');

const defaultProps: any = {
  zoom: 11,
};

toast.error({
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const Listing: FC = (props: any) => {
  const params = useParams<{ id: string }>();

  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [properties, setProperties] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [possibleAreas, setPossibleAreas] = useState([]);
  const [mapCenter, setMapCenter] = useState<Coords>({
    lat: 41.531865,
    lng: -81.581927,
  });
  const [selectedValue, setSelectedValue] = useState('');
  const [count, setCount] = useState(0);
  const [showId, setShowId] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isSignedIn = localStorage?.getItem('token');

  const isPaginate = count > 20;

  const { apiUrl } = getConfiguration();

  useEffect(() => {
    if (!isSignedIn) {
      toast.error('Must be signed in!');
      props.history.push('/');
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (!selectedValue) {
      return;
    }
    fetch(
      `${apiUrl}/properties/${selectedValue}${
        isPaginate ? `?page=${currentPage}` : ''
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        let averageLat = 0,
          averageLong = 0;
        data.payload.map((prop: any) => {
          averageLat += Number(prop.lat) / size(data.payload);
          averageLong += Number(prop.long) / size(data.payload);
        });
        setMapCenter({
          lat: averageLat,
          lng: averageLong,
        });
        setProperties(data.payload);
        setCount(data.total);
        setTotalPages(Math.floor(data.total / 20));
      });
  }, [currentPage, selectedValue]);

  useEffect(() => {
    fetch(`${apiUrl}/counties`)
      .then((response) => response.json())
      .then((data) => {
        // console.log({ data });
        setPossibleAreas(data.payload);
      });
  }, []);

  useEffect(() => {
    setSelectedValue(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: any) => {
    props.history.push(`/Listing/${selectedValue}`);
    setSelectedValue(e.target.value);
  };

  const handleDownloadSpreadsheet = async (e: any) => {
    try {
      const response: any = await axios.get(
        `${apiUrl}/properties/${e.id}/csv`,
        { responseType: 'arraybuffer' }
      );
      var blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const fileName = `${e.address
        .replaceAll(' ', '_')
        .replaceAll(',', '')}-remodel-breakdown.xlsx`;
      saveAs(blob, `${fileName}.xlsx`);
      toast.success('Downloading Spreadsheet');
    } catch (error) {
      console.log(error);
      toast.error('Error fetching Spreadsheet!');
    }
  };

  let marker = properties.map((property: any, index: number) => {
    return (
      <Marker
        key={index}
        lat={property.lat}
        lng={property.long}
        text={HRNumbers.toHumanString(property.price)}
        isActive={property.id === selectedPropertyId}
      />
    );
  });

  return (
    <>
      <div className="container-fluid">
        <div className="pt-12 w-full flex flex-col lg:flex-row justify-between">
          <div className="p-0 flex-1 w-full lg:w-1/2 relative ">
            <div className="p-8">
              <Form>
                <Form.Select
                  className="form-select"
                  aria-label="Floating label select example"
                  name="city"
                  onChange={(e: any) => handleChange(e)}
                >
                  {possibleAreas.map((possibleArea: string) => {
                    return <option value={possibleArea}>{possibleArea}</option>;
                  })}
                </Form.Select>
              </Form>
            </div>
            <div className="p-0 mx-3">
              <div className="w-full h-[80vh]">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyClDgl4m8WrgcJqZfPI1sb6eyRjJv_QhiQ',
                  }}
                  center={mapCenter}
                  defaultZoom={defaultProps.zoom}
                >
                  {marker}
                </GoogleMapReact>
              </div>
            </div>
          </div>

          <div className="px-2 flex-none w-full lg:w-1/2 relative">
            <div className="flex justify-between items-baseline  flex-wrap py-8">
              <span className="text-[22px] font-bold">Homes for Sale</span>
              <span className="mr-8 text-xl">
                {properties.length} Results out of {count}
              </span>
            </div>

            <div className="overflow-y-auto h-[75vh]">
              {properties.map((property: any, index: number) => {
                const profit = (
                  Math.round(property.remodelCost * 150) / 100
                ).toFixed(2);
                return (
                  <div
                    key={index}
                    onMouseEnter={(e) => setSelectedPropertyId(property.id)}
                    onMouseLeave={(e) => setSelectedPropertyId('')}
                    className="py-2"
                  >
                    <div className="p-0">
                      <div
                        className="border border-gray-100  overflow-hidden flex flex-col lg:flex-row 
                                   shadow-sm hover:shadow-md "
                        onClick={() => setShowId(property.id)}
                      >
                        <div className="p-0 w-full lg:w-4/12 h-full relative cursor-pointer">
                          <img
                            src={
                              property.images
                                ? `${property.images}`
                                : `${NotFoundImg}`
                            }
                            alt=""
                            className="w-full h-64 object-fill "
                          />
                        </div>

                        <div className=" w-full md:w-8/12 bg-white relative p-4 flex flex-wrap">
                          <div className="w-full md:w-1/2 flex flex-col justify-between">
                            <div className="">
                              <span className="text-[18px] font-bold">
                                {String(property.address).split(',')[0]}
                              </span>
                              <div className="text-[18px] font-bold">
                                {String(property.address)
                                  .split(',')
                                  .slice(1)
                                  .join(',')}
                              </div>
                              <span className="text-md">
                                $
                                {Number(property.price)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              </span>
                              <div className="flex my-0 space-x-2 text-md">
                                <span>{property.beds} BR </span>{' '}
                                <span>{property.baths} BA</span>
                              </div>
                            </div>

                            <div>
                              <img src={logo2} alt="Logo" className="w-28" />
                            </div>
                          </div>

                          <div className="w-full md:w-1/2 flex-1">
                            <div className="">
                              <div className="flex justify-end items-center pb-2 space-x-4">
                                <img src={logo1} alt="Logo" />

                                <div className="space-x-2">
                                  <span className="text-theme-greadTitle">
                                    Grade
                                  </span>
                                  <span>B+</span>
                                </div>
                              </div>
                              <div className="flex flex-col justify-end items-center pb-3">
                                <div className="w-full flex py-0.5 px-1 space-x-4">
                                  <span className="w-3/5 flex justify-end text-theme-linkTitle">
                                    Total Cost{' '}
                                  </span>
                                  <span className="w-2/5 text-theme-smallText text-base ">
                                    $
                                    {Number(property.totalCost)
                                      .toFixed(2)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                  </span>
                                </div>

                                <div className="w-full flex py-0.5 px-1 space-x-4">
                                  <span className="w-3/5 flex justify-end text-theme-linkTitle">
                                    Remodel Cost{' '}
                                  </span>
                                  <span className="w-2/5 text-theme-smallText text-base ">
                                    $
                                    {Number(property.remodelCost)
                                      .toFixed(2)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                  </span>
                                </div>

                                <div className="w-full flex py-0.5 px-1 space-x-4">
                                  <span className="w-3/5 flex justify-end text-theme-linkTitle">
                                    Net Profit
                                  </span>
                                  <span className="w-2/5 text-theme-smallText text-base ">
                                    $
                                    {profit
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                  </span>
                                </div>

                                <div className="w-full flex py-0.5 px-1 space-x-4">
                                  <span className="w-3/5 flex justify-end text-theme-linkTitle">
                                    Rehab Time Frame
                                  </span>
                                  <span className="w-2/5 text-theme-smallText text-base ">
                                    4-6 months
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end ">
                                <button
                                  className="me-0 border border-gray-200 font-base py-2 px-4 
                                            hover:bg-theme-blogTitle hover:text-white hover:border-theme-blogTitle"
                                  onClick={() =>
                                    handleDownloadSpreadsheet(property)
                                  }
                                >
                                  Download Spreadsheet
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {isPaginate && (
              <div className="py-4">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={({ selected }) => setCurrentPage(selected)}
                  pageRangeDisplayed={3}
                  pageCount={totalPages}
                  previousLabel="< "
                  marginPagesDisplayed={1}
                  containerClassName={'paginationBttns'}
                  previousLinkClassName={'previousBttn'}
                  nextLinkClassName={'nextBttn'}
                  activeClassName={'paginationActive'}
                />
              </div>
            )}

            {/*  */}
            {/* {showModal ? <ModalImg /> : ''} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;

// https://www.zillow.com/costa-mesa-ca/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22791%20Shalimar%20Dr%20%23A-D%20Costa%20Mesa%2C%20CA%2092627%22%2C%22mapBounds%22%3A%7B%22west%22%3A-117.93166637420654%2C%22east%22%3A-117.90656089782715%2C%22south%22%3A33.63718554141863%2C%22north%22%3A33.652190699796606%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A38032%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A16%7D

// https://www.redfin.com/city/4306/CA/Costa-Mesa

// https://github.com/kpennell/airnyt/tree/1478a459fa5e7b7d44939ed102b02900e31a5afd
