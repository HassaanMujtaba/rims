import { Button, Container, Form } from 'react-bootstrap';

export const Login = ({ setLogin, setUsername }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 200) {
          setLogin(res?.data?.token);
          setUsername(res?.data?.username);
          localStorage.setItem('@token', res?.data?.token);
          localStorage.setItem('@username', res?.data?.username);
        } else {
          alert(res?.message);
        }
      });
  };
  return (
    <Container className='login'>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} style={{ width: 320 }}>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            placeholder='Enter username'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            required
          />
        </Form.Group>
        <Button type='submit' variant='secondary'>
          Login
        </Button>
      </Form>
    </Container>
  );
};
