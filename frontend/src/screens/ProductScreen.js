import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {Row , Col , ListGroup , Button, Card, Image} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

function ProductScreen({ match }) {

    const { id } = useParams();  
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error,loading, product } = productDetails


    useEffect(() => {
        dispatch(listProductDetails(id))
     }, [dispatch])

  return (
    <div>
      <Link to='/' className='btn btn-light my-3 '> Go Back </Link>
      {loading ?
            <Loader/>
            : error
                ?<Message varient='danger'> {error}</Message>
            :(
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} ratings`} color={'#f8e825'}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Button
                                        className='btn-block'
                                        disabled={product.countInStock == 0}
                                        type='button'>
                                        Add to Cart
                                    </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
              </Row>

            )

      }

    </div>
  )
}

export default ProductScreen
