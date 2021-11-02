import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type Implementation = {
  id: string;
  mobileOptimized: string;
  jobsURL: string;
  pixelStatus: string;
  sourceTag: string;
  bidOptimizer: string;
  awm: string;
  military: string;
  ejb: string;
  guid: string;
  eligibleForFree: string;
};

type Props = {
  token: string | null;
  toggleEditOn: () => void;
  implementToUpdate: Implementation;
  fetchImplementation: Function;
};

const ImplementEdit = (props: Props) => {
  const [editMobileOptimized, setEditMobileOptimized] = useState(
    props.implementToUpdate.mobileOptimized
  );
  const [editJobsURL, setEditJobsURL] = useState(
    props.implementToUpdate.jobsURL
  );
  const [editPixelStatus, setEditPixelStatus] = useState(
    props.implementToUpdate.pixelStatus
  );
  const [editSourceTag, setEditSourceTag] = useState(
    props.implementToUpdate.sourceTag
  );
  const [editBidOptimizer, setEditBidOptimizer] = useState(
    props.implementToUpdate.bidOptimizer
  );
  const [editAwm, setEditAwm] = useState(props.implementToUpdate.awm);
  const [editMilitary, setEditMilitary] = useState(
    props.implementToUpdate.military
  );
  const [editEjb, setEditEjb] = useState(props.implementToUpdate.ejb);
  const [editGuid, setEditGuid] = useState(props.implementToUpdate.guid);
  const [editEligibleForFree, setEditEligibleForFree] = useState(
    props.implementToUpdate.eligibleForFree
  );

  const ImplementUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/implementation/update/${props.implementToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        mobileOptimized: editMobileOptimized,
        jobsURL: editJobsURL,
        pixelStatus: editPixelStatus,
        sourceTag: editSourceTag,
        bidOptimizer: editBidOptimizer,
        awm: editAwm,
        military: editMilitary,
        ejb: editEjb,
        guid: editGuid,
        editEligibleForFree: editEligibleForFree,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchImplementation();
        props.toggleEditOn();
      });
  };

  const AnswerArray = ['Yes', 'No'];

  const OnOffArray = ['On', 'Off'];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleEditOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={ImplementUpdate}>
        <h1>Add Implementation</h1>
        <div>
          <label htmlFor='mobileOptimized'>Mobile Optimized?:</label>
          <select onChange={(e) => setEditMobileOptimized(e.target.value)}>
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
            value={editJobsURL}
            onChange={(e) => setEditJobsURL(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='pixelStatus'>Pixel?:</label>
          <select onChange={(e) => setEditPixelStatus(e.target.value)}>
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
            value={editSourceTag}
            onChange={(e) => setEditSourceTag(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='bidOptimizer'>Bid Optimizer?:</label>
          <select onChange={(e) => setEditBidOptimizer(e.target.value)}>
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
          <select onChange={(e) => setEditAwm(e.target.value)}>
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
          <select onChange={(e) => setEditMilitary(e.target.value)}>
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
            value={editEjb}
            onChange={(e) => setEditEjb(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='guid'>GUID:</label>
          <input
            name='guid'
            value={editGuid}
            onChange={(e) => setEditGuid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='eligibleForFree'>EligibleForFree?:</label>
          <select onChange={(e) => setEditEligibleForFree(e.target.value)}>
            <option value='default'></option>
            {AnswerArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Update Implementation</button>
      </form>
    </StyledModal>
  );
};

export default ImplementEdit;
