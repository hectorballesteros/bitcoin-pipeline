import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Price.css';
import { floor, divide } from 'mathjs';
import MySwitch from './utils/MySwitch';


const Price = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  let showPrice = true;
  if (currentPrice === null) {
    showPrice = false;
  }
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (checked) => {
    setIsChecked(checked);
    usdToClp(checked);
  };
  const usdToClp = (isChecked) => {
    const newPrice = isChecked ? divide(floor((currentPrice.price*796)*100), 100) : currentPrice.price;
    setCurrentPrice({ price: currentPrice.price, priceShow: newPrice });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/bitcoin/');
        const lastPrice = response.data[response.data.length -1].price;
        setCurrentPrice({ price: lastPrice, priceShow: lastPrice })
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

    return (
        <div>Precio actualizado
            <div>
            <h1>$ {showPrice && currentPrice.priceShow} </h1>
            <div>
              <div><img src="/usa.png" className="BanderasLogo" alt="Mi imagen" />
              <MySwitch
                checked={isChecked}
                onChange={handleChange}
              />
              <img src="/chile.png" className="BanderasLogo" alt="Mi imagen" /></div>
            </div>
            </div>
        </div>
  )
}
export default Price;
