import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getMedicines, deleteMedicine } from "./apiAdmin";

const ManageMedicines = () => {
    const [Medicines, setMedicines] = useState([]);

    const { user, token } = isAuthenticated();

    const loadMedicines = () => {
        getMedicines().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMedicines(data);
            }
        });
    };

    const destroy = MedicineId => {
        deleteMedicine(MedicineId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadMedicines();
            }
        });
    };

    useEffect(() => {
        loadMedicines();
    }, []);

    return (
        <Layout
            title="Manage Medicines"
            description="Perform CRUD on Medicines"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {Medicines.length} Medicines
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {Medicines.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/Medicine/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageMedicines;
