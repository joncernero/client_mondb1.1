import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchSales: Function;
  toggleCreateOn: () => void;
};

const SalesCreate = (props: Props) => {
  const [ppcSales, setPpcSales] = useState('');
  const [segment, setSegment] = useState('');
  const [industry, setIndustry] = useState('');
  const [region, setRegion] = useState('');
  const [ats, setAts] = useState('');
  const [salesChannel, setSalesChannel] = useState('');
  const [primarySales, setPrimarySales] = useState('');
  const [accountId, setAccountId] = useState('');
  const { id } = useParams<{ id?: string }>();

  const fetchSalesData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/sales/create`, {
      method: 'Post',
      body: JSON.stringify({
        ppcSales: ppcSales,
        segment: segment,
        industry: industry,
        region: region,
        ats: ats,
        salesChannel: salesChannel,
        primarySales: primarySales,
        accountId: id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setPpcSales('');
        setSegment('');
        setIndustry('');
        setRegion('');
        setAts('');
        setSalesChannel('');
        setPrimarySales('');
        setAccountId('');
      })
      .then(() => {
        props.fetchSales();
        props.toggleCreateOn();
      });
  };

  const PPCSalesArray = [
    'PPCSalesFour',
    'PPCSalesThree',
    'PPCSalesTwo',
    'PPCSalesOne',
  ];

  const SalesSegmentArray = [
    'Commercial',
    'Corporate',
    'ECOMM',
    'Enterprise',
    'Government',
    'Healthcare',
    'MC Corporate',
    'MMS',
    'New Market',
    'Partner',
    'Staffing',
  ];

  const IndustryArray = [
    '*Programmatic',
    '*Staffing',
    '*Wholesale Partners',
    'Acc, Aud, & Booking',
    'Adv and Marketing Services',
    'Agriculture Production',
    'Agriculture Services',
    'Amusement and Rec Services',
    'Auto Services',
    'Construction',
    'Defense & Military',
    'Eating and Drinking Places',
    'Educational Services',
    'Eng, Arct, & Surveying',
    'Equipment Rental and Leasing',
    'Financial Institutions',
    'Fishing, hunting & trapping',
    'Forestry',
    "GOV'T - Except Military",
    'Health Services',
    'Insurance',
    'IT',
    'Legal Services',
    'Lodging Places',
    ' Maintenance Services',
    'Membership Services',
    'Mfg - Machinery',
    'Mfg - Chemicals',
    'Mfg - Electronics',
    'Mfg - Food',
    'Mfg - Misc',
    'Mfg - Transportation',
    'MGMT and Public Relations',
    'Mining (Except Oil & Gas)',
    'Motion Picture',
    'Museums, Art Galleries, Zoos',
    'News Syndicates',
    'Oil & Gas Extraction',
    'Personal Services',
    'Real Estate',
    'Research & Testing',
    'Retail',
    'Sanitation Services',
    'Security Services',
    'Security Systems Services',
    'Social Services',
    'Telecomm',
    'Transportation - Flight',
    'Transportation Services',
    'Utilities- Water, Electric, & Gas',
    'Wholesale Trade',
  ];

  const RegionArray = [
    'Central',
    'East',
    'Midwest',
    'North',
    'Northeast',
    'South',
    'West',
    'N/A',
  ];

  const ATSArray = [
    'Unknown',
    "Customer Doesn't Have ATS",
    'Not Listed',
    'ADP',
    'Adverto',
    'ApplicantPro',
    'Applicant Stack',
    'Apploi',
    'Appone',
    'Avature',
    'Balance TRAK',
    'Breezy',
    'Big Biller',
    'Brass Ring',
    'Bullhorn',
    'cBizSoft',
    'Ceridian',
    'Clear Company',
    'Clickcast',
    'Cornerstone',
    'Cyber Recruiter',
    'Deltek',
    'EBE-Inc',
    'Equest',
    'Estratex',
    'Google Analytics',
    'Gr8 People',
    'Greenhouse',
    'HealthSource',
    'HireBridge',
    'Home Grown',
    'HRLogix',
    'HR Smart',
    'Icims',
    'Intelliapp',
    'iRecruit',
    'JIBE',
    'Jobvite',
    'Kronos',
    'Lever',
    'Logic Melon',
    'Merlin',
    'Microsoft Dynamics',
    'Njoyn',
    'Paycom',
    'PC Recruiter',
    'Peereless',
    'People Answers',
    'PeopleFluent',
    'PeopleMatter',
    'PeopleSoft',
    'Phenom People',
    'Pixsys Technologies',
    'Prism HR',
    'Recruitics',
    'Selectminds',
    'Silkroad',
    'SmartRecruiters',
    'SmartSearch',
    'Smashfly',
    'Source One',
    'StaffingSoft',
    'Success Factors',
    'Talemtry',
    ' Talent Flux',
    'Talent Reef',
    'Taleo',
    'Taleo Business',
    'Technomedia',
    'Ten Street',
    'The Foundry',
    'TLK',
    'TMS',
    'Ultipro',
    'USAJobs',
    'VirtualEdge',
    'Workable',
    'Workday',
    'Zoho',
    'N/A',
  ];

  const SalesChannelArray = [
    'FieldSales',
    'Majors',
    'PPC',
    'Telesales',
    'Partner',
    'PSE',
    'Gov',
  ];

  const PrimarySalesArray = [
    'PrimarySalesOne',
    'PrimarySalesTwo',
    'PrimarySalesThree',
    'PrimarySalesFour',
    'PrimarySalesFive',
    'PrimarySalesSix',
  ];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchSalesData}>
        <h1>Add Sales Info</h1>
        <div>
          <div>
            <label htmlFor='ppcSales'>PPC Sales Rep:</label>
            <select onChange={(e) => setPpcSales(e.target.value)}>
              <option value='default'></option>
              {PPCSalesArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='segment'>Sales Segment:</label>
            <select onChange={(e) => setSegment(e.target.value)}>
              <option value='default'></option>
              {SalesSegmentArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='industry'>Industry:</label>
            <select onChange={(e) => setIndustry(e.target.value)}>
              <option value='default'></option>
              {IndustryArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='region'>Region:</label>
            <select onChange={(e) => setRegion(e.target.value)}>
              <option value='default'></option>
              {RegionArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='ats'>ats:</label>
            <select onChange={(e) => setAts(e.target.value)}>
              <option value='default'></option>
              {ATSArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='salesChannel'>Sales Channel:</label>
            <select onChange={(e) => setSalesChannel(e.target.value)}>
              <option value='default'></option>
              {SalesChannelArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='primarySales'>Primary Sales Rep:</label>
            <select onChange={(e) => setPrimarySales(e.target.value)}>
              <option value='default'></option>
              {PrimarySalesArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type='submit'>Add Sales Info</button>
      </form>
    </StyledModal>
  );
};

export default SalesCreate;
