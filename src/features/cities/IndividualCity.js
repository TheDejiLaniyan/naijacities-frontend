import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCityById } from './citiesApiSlice';
import { selectUserById } from '../users/usersApiSlice';
import {Button, Card, } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCitiesQuery } from './citiesApiSlice';
import { memo } from 'react'

function IndividualCity({cityId}) {

  const navigate = useNavigate()
  const { city } = useGetCitiesQuery("citiesHome", {
      selectFromResult: ({ data }) => ({
          city: data?.entities[cityId]
      }),
  })
  
  
  if(city){
      const created = new Date(city.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

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
                <Button style={{backgroundColor: 'black', borderColor: 'black'}}>A brief History</Button>
              </Card.Body>
              </div>
             </section>
              <Card.Footer>
                <p>Created on {created} by {city.author} </p>
                
              </Card.Footer>
                </Card>
                </div>
            </>
          )
    } else return null
}

const memoizedCity = memo(IndividualCity)

export default memoizedCity;