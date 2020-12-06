import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Medicine = props => {
    const [Medicine, setMedicine] = useState({});
    const [relatedMedicine, setRelatedMedicine] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleMedicine = MedicineId => {
        read(MedicineId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setMedicine(data);
                // fetch related Medicines
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedMedicine(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const MedicineId = props.match.params.MedicineId;
        loadSingleMedicine(MedicineId);
    }, [props]);

    return (
        <Layout
            title={Medicine && Medicine.name}
            description={Medicine && Medicine.description && Medicine.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {Medicine && Medicine.description && <Card Medicine={Medicine} showViewMedicineButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related Medicines</h4>
                    {relatedMedicine.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card Medicine={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Medicine;
