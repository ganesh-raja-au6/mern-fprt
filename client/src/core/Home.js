import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getMedicines } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [MedicinesBySell, setMedicinesBySell] = useState([]);
    const [MedicinesByArrival, setMedicinesByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadMedicinesBySell = () => {
        getMedicines('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setMedicinesBySell(data);
            }
        });
    };

    const loadMedicinesByArrival = () => {
        getMedicines('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setMedicinesByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadMedicinesByArrival();
        loadMedicinesBySell();
    }, []);

    return (
        <Layout
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Medicines</h2>
            <div className="row">
                {MedicinesByArrival.map((Medicine, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card Medicine={Medicine} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {MedicinesBySell.map((Medicine, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card Medicine={Medicine} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
