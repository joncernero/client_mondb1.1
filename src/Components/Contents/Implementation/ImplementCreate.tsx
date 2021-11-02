import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchImplementation: Function;
  toggleCreateOn: () => void;
};

const ImplementCreate = (props: Props) => {
  const [mobileOptimized, setMobileOptimized] = useState('');
  const [jobsURL, setJobsURL] = useState('');
  const [pixelStatus, setPixelStatus] = useState('');
  const [sourceTag, setSourceTag] = useState('');
  const [bidOptimizer, setBidOptimizer] = useState('');
  const [awm, setAwm] = useState('');
  const [military, setMilitary] = useState('');
  const [ejb, setEjb] = useState('');
  const [guid, setGuid] = useState('');
  const [eligibleForFree, setEligibleForFree] = useState('');
  const [accountId, setAccountId] = useState('');
  const { id } = useParams<{ id?: string }>();

  const fetchImplementData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/implementation/create`, {
      method: 'Post',
      body: JSON.stringify({
        mobileOptimized: mobileOptimized,
        jobsURL: jobsURL,
        pixelStatus: pixelStatus,
        sourceTag: sourceTag,
        bidOptimizer: bidOptimizer,
        awm: awm,
        military: military,
        ejb: ejb,
        guid: guid,
        eligibleForFree: eligibleForFree,
        accountId: id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setMobileOptimized('');
        setJobsURL('');
        setPixelStatus('');
        setSourceTag('');
        setBidOptimizer('');
        setAwm('');
        setMilitary('');
        setEjb('');
        setGuid('');
        setEligibleForFree('');
        setAccountId('');
      })
      .then(() => {
        props.fetchImplementation();
        props.toggleCreateOn();
      });
  };

  const AnswerArray = ['Yes', 'No'];

  const OnOffArray = ['On', 'Off'];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchImplementData}>
        <h1>Add Implementation Info</h1>
        <div>
          <label htmlFor='mobileOptimized'>Mobile Optimized?:</label>
          <select onChange={(e) => setMobileOptimized(e.target.value)}>
            <option value='default'></option>
            {AnswerArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='jobsURL'>Jobs URL:</label>
          <input
            name='jobsURL'
            value={jobsURL}
            onChange={(e) => setJobsURL(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='pixelStatus'>Pixel?:</label>
          <select onChange={(e) => setPixelStatus(e.target.value)}>
            <option value='default'></option>
            {OnOffArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='sourceTag'>SourceTag:</label>
          <input
            name='sourceTag'
            value={sourceTag}
            onChange={(e) => setSourceTag(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='bidOptimizer'>Bid Optimizer?:</label>
          <select onChange={(e) => setBidOptimizer(e.target.value)}>
            <option value='default'></option>
            {AnswerArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='awm'>AwM?:</label>
          <select onChange={(e) => setAwm(e.target.value)}>
            <option value='default'></option>
            {AnswerArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='military'>Military?:</label>
          <select onChange={(e) => setMilitary(e.target.value)}>
            <option value='default'></option>
            {AnswerArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='ejb'>EJB:</label>
          <input
            name='ejb'
            value={ejb}
            onChange={(e) => setEjb(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='guid'>GUID:</label>
          <input
            name='guid'
            value={guid}
            onChange={(e) => setGuid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='eligibleForFree'>EligibleForFree?:</label>
          <select onChange={(e) => setEligibleForFree(e.target.value)}>
            <option value='default'></option>
            {AnswerArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Add Implementation Info</button>
      </form>
    </StyledModal>
  );
};

export default ImplementCreate;
