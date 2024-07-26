import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag.jsx';
import ButtonGroup from '../../ui/ButtonGroup.jsx';
import Button from '../../ui/Button.jsx';
import ButtonText from '../../ui/ButtonText.jsx';

import { useMoveBack } from '../../hooks/useMoveBack.js';
import { useBooking } from './useBooking.js';
import Spinner from '../../ui/Spinner.jsx';
import Empty from '../../ui/Empty';
import BookingDataBox from './BookingDataBox.jsx';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout.js';
import Modal from '../../ui/Modal.jsx';
import { useDeleteBooking } from './useDeleteBooking.js';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { mutate, isDeleting } = useDeleteBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() =>
                mutate(bookingId, { onSettled: () => navigate(-1) })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>{' '}
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}{' '}
        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}{' '}
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
