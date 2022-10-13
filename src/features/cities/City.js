import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCityById } from './citiesApiSlice';
import { selectUserById } from '../users/usersApiSlice';
import {Button, Card, } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCitiesQuery } from './citiesApiSlice';
import { memo } from 'react'

function City({cityId}) {

  const navigate = useNavigate()
  const { city } = useGetCitiesQuery("citiesHome", {
      selectFromResult: ({ data }) => ({
          city: data?.entities[cityId]
      }),
  })

    if(city){
        return (
            <>
                <div className='card-container' >
                <Card style={{ width: '18rem' }}>

              <Card.Img variant="top" 
                    src={city.images?.url} 
                    alt={city.images} 
                    className='mx-3 mt-2'
                    style={{width:60, height:60}}/>

             <section onClick={()=> navigate(`${cityId}`)}>
             <div className='card-body'>
              <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              </div>
             </section>
              <Card.Footer>
                {city.username}
              </Card.Footer>
                </Card>
                </div>
            </>
          )
    } else return null
}

const memoizedCity = memo(City)

export default memoizedCity;