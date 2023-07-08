//library components
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
//styles
import theme from "./styles/theme";
import "./styles/App.css";
import "./styles/customerreport.css";
import "./styles/favoredroutes.css";
//pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PaymentList from "./pages/PaymentList";
import CustomerReportDamages from "./pages/CustomerReportDamages";
import ViewPastReports from "./pages/ViewPastReports";
import StaffManageReports from "./pages/StaffManageReports";
import FavoredRoutes from "./pages/FavoredRoutes";
//local components
import Navbar from "./components/Navbar";
import Invoice from "./pages/invoice";
import Wallet from "./pages/Wallet";
import credit_card_form from "./pages/credit_card_form";
import changepass from "./pages/changepass";
import accounts from "./pages/accounts";
import WalletTable from "./pages/WalletTable";
import InvoiceTable from "./pages/invoiceTable";
import WalletForm from "./pages/Wallet_form";
//route: component
const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
  "/changepass": changepass,
  "/accounts": accounts,
  "/payment": PaymentList,
  "/submitreport": CustomerReportDamages,
  "/viewpastreports": ViewPastReports,
  "/managereports": StaffManageReports,
  "/favoredroutes": FavoredRoutes,
  "/wallet": Wallet,
  "/invoice": Invoice,
  "/credit_card_form": credit_card_form,
  "/walletTable": WalletTable,
  "/invoiceTable": InvoiceTable,
  "/walletForm":WalletForm,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        {Object.entries(routes).map(([path, Component]) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
