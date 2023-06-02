import React , { useState, useEffect, createContext } from 'react';
import {housesData} from '../data';
import axios from 'axios';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);


  useEffect( () => {
    var array = [];
    setLoading(true);
     axios.get('http://localhost:5008/property/all').then((data) => {
      setHouses(data.data);
      const allCities = data.data.map((house) => {
        array.push(house.category.key);
        setProperties(array);
        return house.address.city;
      })
      const uniqueCities = ['Location (any)', ...new Set(allCities)];
      setLoading(false);
      return setCountries(uniqueCities);
    })

  }, [])


  useEffect( () => {
    setLoading(true);
    axios.get('http://localhost:5008/property/all').then((data) => {
    const allProperties = data.data.map((house) => {
      return house.category.key;
    })
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];
    setLoading(false);
    return setProperties(uniqueProperties);
  })
}, [])


  const handleClick = () => {
    setLoading(true);
    
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
      
    }

    const minPrice = (parseFloat(price.split(' ')[0]));
    const maxPrice = (parseFloat(price.split(' ')[2]));

    const newHouses = houses.filter((house) => {
      const housePrice = parseFloat(house.price);

      if(house.address.city === country && house.category.key === property && housePrice >= minPrice && house.price <= maxPrice) {
        return house;
      }
      
      if(isDefault(country) && isDefault(property) && isDefault(price)) {
        return house; 
      }

      if(!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.address.city === country;
      }

      if(!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.category.key === property;
      }

      if(!isDefault(price) && isDefault(country) && isDefault(property)) {
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house;
        }
      }
      
      if(!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.address.city === country && house.category.key === property;
      }

      if(!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.address.city === country;
        }
      }

      if(isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.category.key === property;
        }
      }

    });
    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
      setLoading(false)
    }, 1000)

  }

  return <HouseContext.Provider value={{
    country,setCountry,countries,property,setProperty,properties,price,setPrice,houses,loading,handleClick
  }}> {children} </HouseContext.Provider>;
};

export default HouseContextProvider;
