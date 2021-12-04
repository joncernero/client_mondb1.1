import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { Provider } from '../../../Types/provider';

type Props = {
  token: string | null;
  toggleEditOn: Function;
  providerToUpdate: Provider;
  fetchProvider: Function;
};

const ProviderEdit = (props: Props) => {
  const [editProviderName, setEditProviderName] = useState(
    props.providerToUpdate.providerName
  );
  const [editProviderCode, setEditProviderCode] = useState(
    props.providerToUpdate.providerCode
  );
  const [editProviderId, setEditProviderId] = useState(
    props.providerToUpdate.providerId
  );
  const [editProviderType, setEditProviderType] = useState(
    props.providerToUpdate.providerType
  );
  const [editJobSource, setEditJobSource] = useState(
    props.providerToUpdate.jobSource
  );
  const [editVendorSource, setEditVendorSource] = useState(
    props.providerToUpdate.vendorSource
  );

  const ProviderUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/provider/update/${props.providerToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        providerName: editProviderName,
        providerCode: editProviderCode,
        providerId: editProviderId,
        providerType: editProviderType,
        jobSource: editJobSource,
        vendorSource: editVendorSource,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchProvider();
        props.toggleEditOn();
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
          props.toggleEditOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={ProviderUpdate}>
        <h1>Update Provider</h1>
        <div>
          <label htmlFor='providerName'>Provider Name:</label>
          <input
            name='providerName'
            value={editProviderName}
            onChange={(e) => setEditProviderName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='providerCode'>Provider Code:</label>
          <input
            name='providerCode'
            value={editProviderCode}
            onChange={(e) => setEditProviderCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='providerId'>Provider ID:</label>
          <input
            name='providerId'
            value={editProviderId}
            onChange={(e) => setEditProviderId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='providerType'>Provider Type:</label>
          <select onChange={(e) => setEditProviderType(e.target.value)}>
            <option value='default'></option>
            {ProviderTypeArray.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='jobSource'>Job Source:</label>
          <select onChange={(e) => setEditJobSource(e.target.value)}>
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
          <select onChange={(e) => setEditVendorSource(e.target.value)}>
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

export default ProviderEdit;
