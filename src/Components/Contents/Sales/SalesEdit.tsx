import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type Sales = {
  id: string;
  ppcSales: string;
  segment: string;
  industry: string;
  region: string;
  ats: string;
  salesChannel: string;
  primarySales: string;
  accountId: string;
};

type Props = {
  token: string | null;
  toggleEditOn: () => void;
  salesToUpdate: Sales;
  fetchSales: Function;
};

const SalesEdit = (props: Props) => {
  const [editPpcSales, setEditPpcSales] = useState(
    props.salesToUpdate.ppcSales
  );
  const [editSegment, setEditSegment] = useState(props.salesToUpdate.segment);
  const [editIndustry, setEditIndustry] = useState(
    props.salesToUpdate.industry
  );
  const [editRegion, setEditRegion] = useState(props.salesToUpdate.region);
  const [editAts, setEditAts] = useState(props.salesToUpdate.ats);
  const [editSalesChannel, setEditSalesChannel] = useState(
    props.salesToUpdate.salesChannel
  );
  const [editPrimarySales, setEditPrimarySales] = useState(
    props.salesToUpdate.primarySales
  );

  const SalesUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/sales/update/${props.salesToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        ppcSales: editPpcSales,
        segment: editSegment,
        industry: editIndustry,
        region: editRegion,
        ats: editAts,
        salesChannel: editSalesChannel,
        primarySales: editPrimarySales,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchSales();
        props.toggleEditOn();
      });
  };

  const PPCSalesArray = [
    'Adam Palazzo',
    'Brandon Poynter',
    'Jeff Barchetto',
    'Jason Flash',
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
    'Amy Amaro-Martin',
    "Tiffany O'Connor",
    'Scott Lacy',
    'Allison Goldman',
    'Bob Braman',
    'Jim Vandy',
    'Andy Rutlidge',
    'Ann Jackman',
    'Dustin Thayer',
    'Michelle Williams',
    'Robert Klapman',
  ];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleEditOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={SalesUpdate}>
        <h1>Update Sales Info</h1>
        <div>
          <div>
            <label htmlFor='editPpcSales'>PPC Sales Rep:</label>
            <select onChange={(e) => setEditPpcSales(e.target.value)}>
              <option value='default'></option>
              {PPCSalesArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='editSegment'>Sales Segment:</label>
            <select onChange={(e) => setEditSegment(e.target.value)}>
              <option value='default'></option>
              {SalesSegmentArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='editIndustry'>Industry:</label>
            <select onChange={(e) => setEditIndustry(e.target.value)}>
              <option value='default'></option>
              {IndustryArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='editRegion'>Region:</label>
            <select onChange={(e) => setEditRegion(e.target.value)}>
              <option value='default'></option>
              {RegionArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='editAts'>ats:</label>
            <select onChange={(e) => setEditAts(e.target.value)}>
              <option value='default'></option>
              {ATSArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='editSalesChannel'>Sales Channel:</label>
            <select onChange={(e) => setEditSalesChannel(e.target.value)}>
              <option value='default'></option>
              {SalesChannelArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='editPrimarySales'>Primary Sales Rep:</label>
            <select onChange={(e) => setEditPrimarySales(e.target.value)}>
              <option value='default'></option>
              {PrimarySalesArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type='submit'>Update Sales Info</button>
      </form>
    </StyledModal>
  );
};

export default SalesEdit;
