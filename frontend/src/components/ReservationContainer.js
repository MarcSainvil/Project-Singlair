import styled from "styled-components";

const ReservationContainer = ({
  title,
  reservationId,
  flight,
  seat,
  givenName,
  surname,
  email
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Info>Reservation #: {reservationId}</Info>
      <Info>Flight #: {flight}</Info>
      <Info>Seat: {seat}</Info>
      <Info>Name: {givenName} {surname}</Info>
      <Info>Email: {email}</Info>
    </Container>
  )
}

export default ReservationContainer;

const Container = styled.div`
    border: 5px solid var(--color-alabama-crimson);
    width: 500px;
    padding: 30px;
    margin: auto;
    margin-top: 50px;
`;

const Title = styled.p`
    font-size: 20px;
    color: var(--color-alabama-crimson);
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: 2px solid var(--color-alabama-crimson);
`;

const Info = styled.p`
    margin: 15px 0px;
`;