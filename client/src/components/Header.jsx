import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { FaCogs, FaPlus } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TbLayoutDashboard } from 'react-icons/tb';
import { MdOutlineInventory2 } from 'react-icons/md';
import { BsBoxes } from 'react-icons/bs';
import { UserNavbar } from './UserNavbar';
import { CloseButton } from './CloseButton';
import { useEffect, useState } from 'react';

export function Header({ setView, view, setLogin, username, setAddUser }) {
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [orders, setOrders] = useState([]);
  const updateOrders = async () => {
    const res = await fetch('http://localhost:5000/orders').then((res) =>
      res.json()
    );
    setOrders(res?.data);
  };
  useEffect(() => {
    updateOrders();
  }, []);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 992) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, [window.innerWidth]);

  return (
    <Navbar
      collapseOnSelect
      expand={`lg`}
      bg='dark'
      variant='dark'
      style={{ borderBottom: '1px solid gray' }}
      className='py-0'
      sticky='top'
    >
      <Container className={`${isMobile ? 'px-3' : 'p-0'}`} fluid>
        <Navbar.Toggle
          onClick={() => setOffcanvasShow(true)}
          aria-controls={`offcanvasNavbar-expand-lg`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement='start'
          className='bg-dark text-light '
          show={offcanvasShow}
        >
          <Offcanvas.Header className='bg-dark text-light'>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Menu
            </Offcanvas.Title>
            <CloseButton close={setOffcanvasShow} />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-start flex-grow-1'>
              <Link className='navbar-brand' to={'/'}>
                RIMS
              </Link>
              <Link
                className={`nav-link ${
                  isMobile ? 'nav-link-custom-mobile' : 'nav-link-custom'
                }`}
                id={view === 'dashboard' ? 'active' : 'inactive'}
                onClick={() => {
                  setOffcanvasShow(false);
                  setView('dashboard');
                }}
                to={'/?view=dashboard'}
              >
                <TbLayoutDashboard /> Dashboard
              </Link>
              <Link
                className={`nav-link ${
                  isMobile ? 'nav-link-custom-mobile' : 'nav-link-custom'
                }`}
                id={view === 'orders' ? 'active' : 'inactive'}
                onClick={() => {
                  setOffcanvasShow(false);
                  setView('orders');
                }}
                to={'/?view=orders'}
              >
                <BsBoxes /> Orders{' '}
                <span className='count'>
                  {orders.filter((i) => i.status === 'new').length}
                </span>
              </Link>
              <Link
                className={`nav-link ${
                  isMobile ? 'nav-link-custom-mobile' : 'nav-link-custom'
                }`}
                id={view === 'inventory' ? 'active' : 'inactive'}
                onClick={() => {
                  setOffcanvasShow(false);
                  setView('inventory');
                }}
                to={'/?view=inventory'}
              >
                <MdOutlineInventory2 /> Inventory
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Nav>
          <NavDropdown title={<UserNavbar username={username}/>} id='collasible-nav-dropdown'>
            <NavDropdown.Header className='text-dark'>
              Actions
            </NavDropdown.Header>
            <NavDropdown.Divider />
            <Link className='dropdown-item mb-1' to='/' onClick={() => setAddUser(true)}>
              <FaPlus />
              <span className='dropdown-text'>Add User</span>
            </Link>
            {/* <Link className='dropdown-item mb-1' to='/settings'>
              <FaCogs />
              <span className='dropdown-text'>Settings</span>
            </Link> */}
            <NavDropdown.Divider />
            <Link
              className='dropdown-item'
              to='/'
              onClick={() => {
                setLogin(null);
                localStorage.removeItem('@token');
              }}
            >
              <RiLogoutCircleLine />
              <span className='dropdown-text'>Logout</span>
            </Link>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
