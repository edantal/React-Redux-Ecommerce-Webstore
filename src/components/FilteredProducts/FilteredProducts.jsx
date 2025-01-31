import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react'

import {
  filterProducts,
  filterByGender,
  sortByPrice,
  filterByColor,
  filterBySize,
} from '../../features/slices/productsSlice'
import ProductCard from './ProductCard'
import Error from '../Error/Error'

const FilteredProducts = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.products.error)
  const products = useSelector((state) => state.products.filteredProducts)
  const { type } = useParams()

  const genderBtns = ['male', 'female']
  const colorBtns = [
    'black',
    'blue',
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
  ]
  const sizeBtns = ['S', 'M', 'L', 'XL']

  return (
    <>
      <div className='pt-16'>
        <div className='pl-14'>
          <h1 className='text-4xl font-inter text-gray-600 font-bold tracking-normal leading-none mb-4'>
            {type}
          </h1>

          <div className='flex items-center justify-between py-8'>
            <div className='flex items-center'>
              {genderBtns.map((gender, index) => (
                <Button
                  key={index}
                  color='gray'
                  size='lg'
                  variant='outlined'
                  ripple={true}
                  className='text-black hover:bg-gray-300 duration-300 ease-out mr-4'
                  onClick={() => dispatch(filterByGender(gender))}
                >
                  {gender}
                </Button>
              ))}
              <Button
                color='gray'
                size='lg'
                variant='outlined'
                ripple={true}
                className='text-black hover:bg-gray-300 duration-300 ease-out mr-4'
                onClick={() => dispatch(sortByPrice())}
              >
                High Price
              </Button>
              <Menu>
                <MenuHandler>
                  <Button
                    color='gray'
                    size='lg'
                    variant='outlined'
                    ripple={true}
                    className='text-black hover:bg-gray-300 duration-300 ease-out mr-4'
                  >
                    Select Color
                  </Button>
                </MenuHandler>
                <MenuList>
                  {colorBtns.map((color, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => dispatch(filterByColor(color))}
                    >
                      <div
                        className='p-1 rounded-full mr-2 inline-block'
                        style={{ backgroundColor: color }}
                      ></div>
                      {color.charAt('0').toUpperCase() + color.slice(1)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuHandler>
                  <Button
                    disabled={type === 'Bags'}
                    color='gray'
                    size='lg'
                    variant='outlined'
                    ripple={true}
                    className='text-black hover:bg-gray-300 duration-300 ease-out mr-4'
                  >
                    Select Size
                  </Button>
                </MenuHandler>
                <MenuList>
                  {sizeBtns.map((size, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => dispatch(filterBySize(size))}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
            <div className='pr-14'>
              <Button
                color='gray'
                size='lg'
                variant='outlined'
                ripple={true}
                className='text-black hover:bg-gray-300 duration-300 ease-out mr-4'
                onClick={() => dispatch(filterProducts(type))}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        </div>

        {error ? (
          <Error />
        ) : (
          <div className='grid grid-cols-4 justify-items-center py-8 gap-12'>
            {products
              .filter((product) => product.type === type)
              .map((product, index) => (
                <div key={index}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    text={product.text}
                    img={product.img}
                    price={product.price}
                    colors={product.color}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}

export default FilteredProducts
