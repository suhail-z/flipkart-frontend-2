"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import {
  Container,
  Typography,
  Card,
  Button,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };

  const calculateTotals = () => {
    const mrp = cartItems.reduce((total, item) => {
      const originalPrice =
        item.price / (1 - (item.discountPercentage || 0) / 100);
      return total + originalPrice * item.quantity;
    }, 0);

    const finalTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const discount = mrp - finalTotal;
    return { mrp, finalTotal, discount, savings: discount };
  };

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    toast.success(" Your order has been placed!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const { mrp, finalTotal, discount, savings } = calculateTotals();

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" className="cart-empty">
        <ToastContainer />
        <div className="cart-empty-center">
          <Typography variant="h5" className="cart-empty-title">
            Your cart is empty
          </Typography>
          <Typography variant="body1" className="cart-empty-subtext">
            Add some products to get started!
          </Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="cart-container">
      <ToastContainer />
      <Typography variant="h4" className="cart-heading">
        Shopping Cart
      </Typography>

      <div className="cart-grid">
        {/* Cart Items */}
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <Card key={item._id} className="cart-card">
              <div className="cart-item">
                <div className="cart-thumbnail">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-thumbnail-img"
                    />
                  ) : (
                    <div className="cart-no-image">
                      <Typography
                        variant="caption"
                        className="cart-no-image-text"
                      >
                        No Image
                      </Typography>
                    </div>
                  )}
                </div>

                <div className="cart-details">
                  <Typography variant="h6" className="cart-title">
                    {item.title}
                  </Typography>

                  <Typography variant="body2" className="cart-subinfo">
                    {item.brand} • {item.category}
                  </Typography>

                  <div className="cart-price-row">
                    <Typography variant="h6" className="cart-price">
                      ₹{item.price}
                    </Typography>
                    {item.discountPercentage && (
                      <Typography variant="body2" className="cart-discount">
                        {item.discountPercentage}% off
                      </Typography>
                    )}
                  </div>

                  <div className="cart-actions-row">
                    <div className="cart-quantity-controls">
                      <IconButton
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        size="small"
                      >
                        <Remove />
                      </IconButton>

                      <TextField
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item._id,
                            Number.parseInt(e.target.value) || 1
                          )
                        }
                        size="small"
                        className="cart-quantity-input"
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                      />

                      <IconButton
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        size="small"
                      >
                        <Add />
                      </IconButton>
                    </div>

                    <IconButton
                      onClick={() => dispatch(removeFromCart(item._id))}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <Card className="cart-summary-card">
            <Typography variant="h6" className="cart-summary-heading">
              Order Summary
            </Typography>

            <div className="cart-summary-breakdown">
              <div className="cart-summary-line">
                <Typography variant="body1">
                  MRP ({cartItems.length} items)
                </Typography>
                <Typography variant="body1">₹{mrp.toFixed(2)}</Typography>
              </div>

              <div className="cart-summary-line discount">
                <Typography variant="body1">Discount</Typography>
                <Typography variant="body1">-₹{discount.toFixed(2)}</Typography>
              </div>

              <Divider />

              <div className="cart-summary-line total">
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6">₹{finalTotal.toFixed(2)}</Typography>
              </div>

              <div className="cart-savings-note">
                <Typography variant="body2">
                  You will save ₹{savings.toFixed(2)} on this order
                </Typography>
              </div>
            </div>

            <Button
              fullWidth
              variant="contained"
              size="large"
              className="cart-checkout-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}
