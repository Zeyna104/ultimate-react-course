import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useBooking } from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import BookingDataBox from "../bookings/BookingDataBox.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { useCheckin } from "./useCheckin.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();

  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return false;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prevState) => !prevState)}
          disabled={isCheckingIn || confirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
