//User profile can be updated from here, can see all details including order history
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import { listMyOrders } from '../actions/orderActions'

const Profile = ({  }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    // const orderListMy = useSelector((state) => state.orderListMy)
    // const { loading:loadingOrders, error:errorOrders, orders } = orderListMy

    let navigate = useNavigate()
    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } 
        else {
            if(!user.name){
                dispatch(getUserDetails('profile'))
                // dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, useNavigate, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({id:user._id, name, email, password}))
        }
    }
    return <Row>
    <Col md={3}>
    <h2>User Profile</h2>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder = "Enter name" value={name} onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder = "Enter email" value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='secondary'>
                Update
            </Button>
        </Form>
    </Col>
    {/* <Col md={9}>
        <h2>My Orders</h2>
{loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
<Table striped bordered hover responsive classname='table-sm'>
    <thead>
        <tr>
            <th>ID</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {orders.map(order => (
            <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.totalPrice}</td>
                <td>
                    <Link to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>Details</Button>
                    </Link>
                </td>
            </tr>
        ))}
    </tbody>
</Table>
)}
    </Col> */}
</Row>
}

export default Profile
