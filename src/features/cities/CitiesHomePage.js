import { useGetCitiesQuery } from "./citiesApiSlice"
import { CardGroup } from "react-bootstrap"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import IndividualCity from './IndividualCity'

const CitiesHomePage = () => {
  const {data: cities, isLoading, isSuccess, isError, error
} = useGetCitiesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if(isSuccess){
      const {ids} = cities

      const cardContent = ids?.length 
        ? ids.map(cityId => <IndividualCity key={cityId} cityId={cityId} /> )
        : null

      content = (
          <>
              <div className="body">
                <NavBar/>
            <CardGroup className="card__group-body">
              {cardContent}
            </CardGroup>
            <Footer/>
              </div>
          </>
      )
    }

  return content
}

export default CitiesHomePage
