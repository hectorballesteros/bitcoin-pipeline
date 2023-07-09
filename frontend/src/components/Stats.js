import React, { useEffect, useState } from 'react'
import Switch from 'react-switch';
import './Stats.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export const Stats = () => {
    const [selected, setSelected] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (checked) => {
        setIsChecked(checked);
      };

    return (
        <div>
            <div style={{ marginTop: 5 }}>
                <h4>Métricas Bitcoin</h4>
            </div>
            <div className='FlexCenter'><span>Histórico &nbsp;</span>
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
                /> <span style={{ marginBottom: 10 }}>&nbsp; Establecer fecha </span>
            </div>
            <hr width="75%" className='MarginAuto' />
            <div style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                <div className="row">
                    <div className='ContainerStat col-md-5'>
                        <strong>Promedio</strong>
                        <h2>29209.2</h2>
                    </div>
                    <div className='ContainerStat col-md-5'>
                    <strong>Mediana</strong>
                        <h2>29209.2</h2>
                    </div>
                </div>
                <div className="row">
                    <div className='ContainerStat col-md-5'>
                    <strong>Máximo</strong>
                        <h2>29209.2</h2>
                    </div>
                    <div className='ContainerStat col-md-5'>
                    <strong>Mínimo</strong>
                        <h2>29209.2</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
