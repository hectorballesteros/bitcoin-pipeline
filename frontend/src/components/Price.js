import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import './Price.css';

const Price = () => {
  const [data, setData] = useState({ price: 30000, priceShow: 30000 });
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (checked) => {
    setIsChecked(checked);
    usdToClp(checked);
  };

  const usdToClp = (isChecked) => {
    const newPrice = isChecked ? data.price*750 : data.price;
    setData({ price: 30000, priceShow: newPrice });
  };

    /*useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/bitcoin');
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);*/
    return (
        <div>Precio actualizado
            <div>
            <h1>$ {data.priceShow}</h1>
            <div>
              <div><img src="/usa.png" className="BanderasLogo" alt="Mi imagen" />
              <Switch
                checked={isChecked}
                onChange={handleChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={24}
                uncheckedIcon={false}
                checkedIcon={false}
                height={18}
                width={48}
                className="react-switch"
              />
              <img src="/chile.png" className="BanderasLogo" alt="Mi imagen" /></div>
            </div>
            Última actualización: <strong>hace 3 minutos</strong>
            </div>
        </div>
  )
}
export default Price;
