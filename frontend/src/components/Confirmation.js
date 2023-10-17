import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

import useReservation from "../hooks/useReservation";
import ReservationContainer from "./ReservationContainer";

const Confirmation = () => {
    const reservation = useReservation();
    const {
        _id: reservationId,
        flight, 
        seat, 
        givenName, 
        surname, 
        email 
    } = reservation;

    return (
        // DONE: Display the POSTed reservation information
        <Wrapper>
            <ReservationContainer 
                title="Your flight is confirmed"
                reservationId={reservationId}
                flight={flight}
                seat={seat}
                givenName={givenName}
                surname={surname}
                email={email}
            />
            <Img src={tombstone} alt="tombstone" />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Img = styled.img`
    width: 100px;
    margin: 50px;
`;

export default Confirmation;
