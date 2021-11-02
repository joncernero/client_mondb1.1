import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchProvider: Function;
  toggleCreateOn: () => void;
};

const ProviderCreate = (props: Props) => {
  const [providerName, setProviderName] = useState('');
  const [providerCode, setProviderCode] = useState('');
  const [providerId, setProviderId] = useState('');
  const [providerType, setProviderType] = useState('');
  const [jobSource, setJobSource] = useState('');
  const [vendorSource, setVendorSource] = useState('');
  const [accountId, setAccountId] = useState('');
  const { id } = useParams<{ id?: string }>();

  const fetchProviderData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/provider/create`, {
      method: 'Post',
      body: JSON.stringify({
        providerName: providerName,
        providerCode: providerCode,
        providerId: providerId,
        providerType: providerType,
        jobSource: jobSource,
        vendorSource: vendorSource,
        accountId: id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProviderName('');
        setProviderCode('');
        setProviderId('');
        setProviderType('');
        setJobSource('');
        setVendorSource('');
        setAccountId('');
      })
      .then(() => {
        props.fetchProvider();
        props.toggleCreateOn();
      });
  };

  const ProviderTypeArray = ['Paid', 'Inactive', 'Organic'];

  const JobSourceArray = [
    'Feed',
    'Hosted Feed',
    'Career Site',
    'Spreadsheet',
    'Spreadsheet - Nationwide',
    'Spreadsheet - Statewide',
  ];

  const VendorSourceArray = ['Clickcast', 'Joveo', 'RX', 'Uncommon', 'Other'];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchProviderData}>
        <h1>Add Account Status</h1>
        <div>
          <label htmlFor='providerName'>Provider Name:</label>
          <input
            name='providerName'
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='providerCode'>Provider Code:</label>
          <input
            name='providerCode'
            value={providerCode}
            onChange={(e) => setProviderCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='providerId'>Provider ID:</label>
          <input
            name='providerId'
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='providerType'>Provider Type:</label>
          <select onChange={(e) => setProviderType(e.target.value)}>
            {ProviderTypeArray.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='jobSource'>Job Source:</label>
          <select onChange={(e) => setJobSource(e.target.value)}>
            <option value='default'></option>
            {JobSourceArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='vendorSource'>Vendor Source:</label>
          <select onChange={(e) => setVendorSource(e.target.value)}>
            <option value='default'></option>
            {VendorSourceArray.map((vendor, index) => (
              <option key={index} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Add Status</button>
      </form>
    </StyledModal>
  );
};

export default ProviderCreate;
