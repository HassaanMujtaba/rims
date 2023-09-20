import { Card } from 'react-bootstrap';

export const OrderCard = ({ title, details, setShow, action }) => {
  return (
    <Card
      onClick={
        setShow
          ? () => {
              setShow(true);
              action();
            }
          : () => console.log('Order Card')
      }
      className='navCard h-100 mb-3'
    >
      <Card.Footer>
        <div className='title mb-3'>{title}</div>
        <div className='details'>
          {details &&
            details.length > 0 &&
            details.map((item, index) => {
              return typeof item === 'object' ? (
                <div
                  key={`${item.heading}-${index}`}
                  className='d-flex justify-content-start align-items-start mb-3'
                  style={{ flexDirection: 'column' }}
                >
                  <span className='text-primary-heading'>{item.heading}</span>
                  <span className='text-primary-custom'>{item.paragraph}</span>
                </div>
              ) : (
                <div
                  key={`${item}-${index}`}
                  className='d-flex justify-content-start align-items-center mb-3'
                >
                  <span className='text-secondary'>{item}</span>
                </div>
              );
            })}
        </div>
      </Card.Footer>
    </Card>
  );
};
