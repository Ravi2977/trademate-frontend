import './App.css';
import AddCustomer from './Components/AddCustomer';
import AddEmployee from './Components/AddEmployee';
import AddExpence from './Components/AddExpence';
import AddProduct from './Components/AddProduct';
import AddPurchase from './Components/AddPurchase';
import AddSale from './Components/AddSale';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import SaleDetails from './Components/SaleDetails';
import UpdateSale from './Components/UpdateSale';
// import Test from './Components/Test';
import Profits from './Components/Profits';
import ProductLists from './Components/ProductLists';
import Invoice from './Components/Invoice';
import Remaining from './Components/Remaining';
import UsersDashboard from './Components/UsersDashboard';
import CreateCOmpany from './Components/CreateCOmpany';
import PurchaseList from './Components/PurchaseList';
import GST from './Components/GST';
import VerificationAlert from './Components/VerificationAlert';
import Contact from './Components/Contact';
import About from './Components/About';
import AddSeller from './Components/AddSeller';
import SellerList from './Components/SellerList';
import CustomerList from './Components/CustomerList';
import ExpenseList from './Components/ExpenseList';
import ForgotPassword from './Components/ForgotPassword';
import LandingPage from './Components/LandingPage';
import Signin from './Components/Signin';
import MonthlyReport from './Components/MonthlyReport';
import Feedback from './Components/Feedback';
import Licence from './Components/Licence';
import Payment from './Components/Payment';

import { AuthProvider } from './Components/AuthContext'; // Import AuthProvider

function App() {
  let stores = JSON.parse(localStorage.getItem('login'))
  // console.log(stores)
  // const url ="http://localhost:8080"
  // const url="https://trade-mate-pearl.vercel.app/"
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={stores ? <Dashboard/> : <LandingPage />}></Route>
          <Route exact path="/dashboard/:id" element={<Dashboard  />}></Route>
          <Route exact path="/addsale/:companyName" element={<AddSale />} />
          <Route exact path="/addemployee/:companyName" element={<Signup />} />
          <Route exact path="/signin" element={<Home/>}/>
          <Route exact path="/addcustomer/:companyName" element={<AddCustomer />} />
          <Route exact path="/addpurchase/:companyName" element={<AddPurchase />} />
          <Route exact path="/addexpense" element={<AddExpence />} />
          <Route exact path="/addproduct/:companyName" element={<AddProduct />} />
          <Route exact path="/purchase/:companyName" element={<PurchaseList />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/saledetails/:companyName" element={<SaleDetails />} />
          <Route exact path="/updatesale/:id" element={<UpdateSale />} />
          <Route exact path="/profits/:companyName" element={<Profits />} />
          <Route exact path="/stocks/:companyName" element={<ProductLists />} />
          <Route exact path="/invoice/:id" element={<Invoice />} />
          {/* <Route exact path="/test" element={<Test />} /> */}
          <Route exact path="/usersDashboard" element={<UsersDashboard />}/>
          <Route exact path="/remaining/:companyName" element={<Remaining />}/>
          <Route exact path="/createCompany" element={<CreateCOmpany />}/>
          <Route exact path ="/purchase/:companyName" element={<AddPurchase />}/>
          <Route exact path ="/gst/:companyName" element={<GST />}/>
          <Route exact path='/verification' element={<VerificationAlert/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/addcustomer' element={<AddCustomer/>} />
          <Route exact path='/addseller' element={<AddSeller/>} />
          <Route exact path='/customers/:companyName' element={<CustomerList/>} />
          <Route exact path='/sellers/:companyName' element={<SellerList/>} />
          <Route exact path='/expenselist' element={<ExpenseList/>} />
          <Route exact path='/forgotpassword' element={<ForgotPassword/>} />
          <Route exact path='/landing' element={<LandingPage/>} />
          <Route exact path='/report' element={<MonthlyReport/>}/>
          <Route exact path='/feedback' element={<Feedback/>}/>
          <Route exact path='/licence' element={<Licence/>}/>
          <Route exact path='/payment' element={<Payment/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider> 
  );
}

export default App;
