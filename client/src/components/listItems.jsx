import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Home, Person, ShoppingCart, Payment } from '@mui/icons-material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { ShoppingBag } from '@mui/icons-material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const adminListItems = (
  <React.Fragment>
    <Link to={'/payments'}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/userMNG'}>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/orders'}>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const customerListItems = (
  <React.Fragment>
    <Link to={'/'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>

    <Link to={'/orders'}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingBag />
        </ListItemIcon>
        <ListItemText primary="My Orders" />
      </ListItemButton>
    </Link>

    <Link to={'/cart'}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Cart" />
      </ListItemButton>
    </Link>

    <Link to={'/card'}>
      <ListItemButton>
        <ListItemIcon>
          <Payment />
        </ListItemIcon>
        <ListItemText primary="Payment Details" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const guestListItems = (
  <React.Fragment>
    <Link to={''}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
