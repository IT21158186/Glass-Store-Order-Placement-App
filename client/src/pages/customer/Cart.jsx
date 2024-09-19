import { createContext, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useAuth } from '../common/AuthContext';
const Cart = () => {

  const { cart, addItemToCart,removeItemFromCart,addQty,removeQty } = useAuth()

  const total = cart.reduce((total, item) => {
    return total + (item.price * item.qty);
  }, 0);

  // console.log(state);

  return (
    <div>
      <div className="h-screen bg-gray-100 ">
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
          <ShoppingCartIcon style={{ color: '#9ca3af', fontSize: '2rem' }} /> My Cart
        </Typography>

        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cart.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-gray-700">Cart is empty</p>
            </div>
          ) : (
            <div className="rounded-lg md:w-2/3">
              {cart.map((item, index) => {
                return (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={index}>
                    <div className="w-32 h-32">
                    <img src={item.image} className="box-content h-100 w-100 border-0" />

                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                        <p class="mt-1 text-xs text-gray-700">{item?.desc}</p>
                      </div>
                      <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => {
                              if (item.qty > 1) {
                                removeQty(item._id);
                              } else {
                                removeItemFromCart( item);
                              }
                            }}> - </span>
                          <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number"
                            value={item.qty || 1} // Use the actual item quantity here
                            min="1"
                            disabled />
                          <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => addQty( item._id)}> + </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">Rs. {item.price * item.qty}</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => dispatch({ type: "REMOVE", payload: item })}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {cart.length > 0 && (
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">Rs. {total}</p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Discount</p>
                  <p className="text-gray-700">Rs. 0.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">Free</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">Rs. {total}</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>

                <Link to={{ pathname: "/checkout", state: total }} state={total}>
                  <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                    Check out
                  </button>
                </Link>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
