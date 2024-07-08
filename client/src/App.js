import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignUp } from "./pages/signUp";
import { UserHome } from "./pages/user_pages/user_home";
import { Header } from "./components/header";
import { Login } from "./pages/login";
import { AdminLayout } from "./components/admin_layout";
import { AllUsers } from "./pages/admin_pages/allUsers";
import { AllProducts } from "./pages/admin_pages/allProducts";
import { EditUsers } from "./pages/admin_pages/editUser";
import { AddProduct } from "./pages/admin_pages/addProduct";
import { AddCategories } from "./pages/admin_pages/addCategories";
import { Categories } from "./pages/admin_pages/allCategories";
import { EditCategory } from "./pages/admin_pages/editCategory";
import { EditProduct } from "./pages/admin_pages/editProduct";
import { Logout } from "./pages/logout";
import { Profile } from "./pages/profile";
import { ForgotPassword } from "./pages/forgot_password";
import { CorporateEnquiries } from "./pages/user_pages/corporateEnquiries";
import { Category } from "./components/category";
import { Footer } from "./components/footer";
import { Cart } from "./pages/user_pages/cart";
import { ProductDetails } from "./pages/user_pages/product_details";
import { AddDropdown } from "./pages/admin_pages/addDropdown";
import { Dropdown } from "./pages/admin_pages/allDropdownDetails";
import { FilterProducts } from "./pages/user_pages/filter_Products";
import { Fresharrival } from "./pages/user_pages/fresharrival";
import { EditDropdown } from "./pages/admin_pages/editDropdown";
import { CustomerQuery } from "./pages/admin_pages/allContacts";
import { PageNotFound } from "./components/404-page";
import { MyOrders } from "./pages/user_pages/myorders";
import { AllOrders } from "./pages/admin_pages/orders";
import { BottomMenuBar } from "./components/bottomMenuBar";
import { Success } from "./components/success_page";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />  
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/corporate-enquiries" element={<CorporateEnquiries />} />
          <Route path="/user/product-details/:pToken" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/category/filterData/:id" element={<FilterProducts />} />
          <Route path="/category/filterData/fresharrival" element={<Fresharrival />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<PageNotFound />} />
          
          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AllUsers />} />
            <Route path="users/:id/edit" element={<EditUsers />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="products/addProduct" element={<AddProduct />} />
            <Route path="product/:id/editProduct" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/addCategories" element={<AddCategories />} />
            <Route path="category/:id/editCategory" element={<EditCategory />} />
            <Route path="dropdown" element={<Dropdown />} />
            <Route path="dropdown/addDropdown" element={<AddDropdown />} />
            <Route path="dropdown/:id/editDropdown" element={<EditDropdown />} />
            <Route path="customer-query" element={<CustomerQuery />} />
          </Route> */}

          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/users/:id/edit" element={<EditUsers />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/products/addProduct" element={<AddProduct />} />
          <Route path="/admin/products/:id/editProduct" element={<EditProduct />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/categories/addCategories" element={<AddCategories />} />
          <Route path="/admin/category/:id/editCategory" element={<EditCategory />} />
          <Route path="/admin/dropdown" element={<Dropdown />} />
          <Route path="/admin/dropdown/addDropdown" element={<AddDropdown />} />
          <Route path="/admin/dropdown/:id/editDropdown" element={<EditDropdown />} />
          <Route path="/admin/customer-query" element={<CustomerQuery />} />
          <Route path="/admin/allOrders" element={<AllOrders />} />

        </Routes>
        <br/>
        <br/>
        <Footer />
        <BottomMenuBar/>
      </BrowserRouter>
    </>
  )
}

export default App;
