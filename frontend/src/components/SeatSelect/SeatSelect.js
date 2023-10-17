import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Plane from "./Plane";
import Form from "./Form";

import makeFetchRequest from "../../utils/make-fetch-request";
import { createReservation } from "../../service/api";

const SeatSelect = ({ selectedFlight, setReservationId }) => {
  const [selectedSeat, setSelectedSeat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    // DONE: POST info to server
    // DONE: Save reservationId
    // DONE: Redirect to confirmation page
    const { firstName, lastName, email } = formData;

    const body = {
      flight: selectedFlight,
      seat: selectedSeat,
      givenName: firstName,
      surname: lastName,
      email: email,
    };

    const res = await makeFetchRequest(() => createReservation(body));
    await window.localStorage.setItem("reservationId", res.data);
    setReservationId(res.data);
    navigate("/confirmation");
  };

  return (
    <Wrapper>
      <h2>Select your seat and Provide your information!</h2>
      <>
        <FormWrapper>
          <Plane
            setSelectedSeat={setSelectedSeat}
            selectedFlight={selectedFlight}
          />
          <Form handleSubmit={handleSubmit} selectedSeat={selectedSeat} />
        </FormWrapper>
      </>
    </Wrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  margin: 50px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export default SeatSelect;
