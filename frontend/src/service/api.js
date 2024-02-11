
export const getFlightNumbers = async () => {
  const res = await fetch("/api/get-flights/");
  return  await res.json();
};

export const getSeating = async (flightNumber) => {
  const res = await fetch(`/api/get-flight/${flightNumber}`);
  return await res.json();
};

export const createReservation = async (reservation) => {
  const res = await fetch("/api/add-reservation", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reservation)
  })
  return await res.json();
};

export const getReservation = async (reservationId) => {
  const res = await fetch(`/api/get-reservation/${reservationId}`);
  return await res.json();
};