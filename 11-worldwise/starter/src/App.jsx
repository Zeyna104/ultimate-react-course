import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import Product from "./pages/Product.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Login from "./pages/Login.jsx";

// Before code splitting
/*
dist/index.html                   0.48 kB │ gzip:   0.32 kB
dist/assets/index-8dcf80d6.css   29.89 kB │ gzip:   5.10 kB
dist/assets/index-53cd1b50.js   521.92 kB │ gzip: 154.26 kB

 */
// After
/*
dist/index.html                           0.48 kB │ gzip:   0.32 kB
dist/assets/Logo-81b2c976.css             0.03 kB │ gzip:   0.05 kB
dist/assets/Login-b7d792c3.css            0.35 kB │ gzip:   0.22 kB
dist/assets/Product-9f395e2d.css          0.47 kB │ gzip:   0.27 kB
dist/assets/Homepage-74185d03.css         0.51 kB │ gzip:   0.30 kB
dist/assets/PageNav-4503fc2e.css          0.51 kB │ gzip:   0.28 kB
dist/assets/AppLayout-53a21b23.css        1.91 kB │ gzip:   0.70 kB
dist/assets/index-7f0ed62b.css           26.22 kB │ gzip:   4.38 kB
dist/assets/Product.module-8d683417.js    0.06 kB │ gzip:   0.07 kB
dist/assets/PageNotFound-a39909ad.js      0.15 kB │ gzip:   0.15 kB
dist/assets/Logo-1ccde99f.js              0.21 kB │ gzip:   0.19 kB
dist/assets/PageNav-e1537cb0.js           0.48 kB │ gzip:   0.26 kB
dist/assets/Pricing-82112f5f.js           0.65 kB │ gzip:   0.41 kB
dist/assets/Homepage-a9aeb365.js          0.66 kB │ gzip:   0.41 kB
dist/assets/Product-cdde29c1.js           0.85 kB │ gzip:   0.48 kB
dist/assets/Login-4ca863fb.js             1.01 kB │ gzip:   0.54 kB
dist/assets/AppLayout-62b12d43.js       163.11 kB │ gzip:  51.57 kB
dist/assets/index-a11515ca.js           357.32 kB │ gzip: 101.95 kB

 */

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
