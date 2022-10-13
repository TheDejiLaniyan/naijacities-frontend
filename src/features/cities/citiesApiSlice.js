import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const citiesAdapter = createEntityAdapter({})

const initialState = citiesAdapter.getInitialState ()

export const citiesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCities: builder.query({
            query: () => '/cities',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCities = responseData.map(city => {
                    city.id = city._id
                    return city
                });
                return citiesAdapter.setAll(initialState, loadedCities)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Citie', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Citie', id }))
                    ]
                } else return [{ type: 'Citie', id: 'LIST' }]
            }
        }),
        addNewCity: builder.mutation({
            query: initialCityData => ({
                url: '/cities',
                method: 'POST',
                body: {
                    ...initialCityData,
                }
            }),
            invalidatesTags: [
                { type: 'Citie', id: "LIST" }
            ]
        }),
        updateCity: builder.mutation({
            query: initialCityData => ({
                url: '/cities',
                method: 'PATCH',
                body: {
                    ...initialCityData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Citie', id: arg.id }
            ]
        }),
        deleteCity: builder.mutation({
            query: ({ id }) => ({
                url: `/cities`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Citie', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCitiesQuery,
    useAddNewCityMutation,
    useDeleteCityMutation, 
    useUpdateCityMutation
} = citiesApiSlice

export const selectCitiesResult = citiesApiSlice.endpoints.getCities.select()

const selectCitiesData = createSelector(
    selectCitiesResult, 
    citiesResult => citiesResult.data
)

export const {
    selectAll: selectAllCities,
    selectById: selectCityById,
    selectIds: selectCityIds
} = citiesAdapter.getSelectors(state => selectCitiesData(state) ?? initialState)