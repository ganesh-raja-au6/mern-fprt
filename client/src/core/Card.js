import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  Medicine,
  showViewMedicineButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveMedicineButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(Medicine.count);

  const showViewButton = showViewMedicineButton => {
    return (
      showViewMedicineButton && (
        <Link to={`/Medicine/${Medicine._id}`} className="mr-2">
          <button className="btn btn-outline-danger mt-2 mb-2 card-btn-1">View Medicine</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(Medicine, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-danger badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
    );
  };

  const handleChange = MedicineId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(MedicineId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(Medicine._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveMedicineButton => {
    return (
      showRemoveMedicineButton && (
        <button
          onClick={() => {
            removeItem(Medicine._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Medicine
        </button>
      )
    );
  };
  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{Medicine.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={Medicine} url="Medicine" />
        <p className="card-p  mt-2">{Medicine.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {Medicine.price}</p>
        <p className="black-9">Category: {Medicine.category && Medicine.category.name}</p>
        <p className="black-8">Added on {moment(Medicine.createdAt).fromNow()}</p>
        {showStock(Medicine.quantity)}
        <br />

        {showViewButton(showViewMedicineButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveMedicineButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
