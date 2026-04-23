import React from "react";
import ReactDOM from "react-dom/client";


import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import FeaturedCategories from "./Components/FeaturedCategories";
import PremiumShowcase from "./Components/PremiumShowcase";
import ProcessSection from "./Components/ProcessSection";
import WhyChooseUs from "./Components/WhyChooseUs";
import CallToAction from "./Components/CallToAction";
import Footer from "./Components/Footer";

import HomePage from "./Pages/Admin/HomePage";
import CategoriesPage from "./Pages/Admin/CategoriesPage";
import SubcategoriesPage from "./Pages/Admin/SubcategoriesPage";
import ProductsPage from "./Pages/Admin/ProductsPage";
import CategorySizesPage from "./Pages/Admin/CategorySizesPage";

import CategoriesCustomerPage from "./Pages/Customer/CategoriesPage";
import ProductDetailPage from "./Pages/Customer/ProductDetailPage";
import CategoryPricingPage from "./Pages/Admin/CategoryPricingPage";
import CategoryDesignSpecsPage from "./Pages/Admin/CategoryDesignSpecsPage";
function WebsiteHome() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturedCategories />
            <PremiumShowcase />
            <ProcessSection />
            <WhyChooseUs />
            <CallToAction />
            <Footer />
        </>
    );
}

function AppRouter({ page, props }) {
    switch (page) {

        case "admin-home":
            return <HomePage {...props} />;

        case "admin-categories":
            return <CategoriesPage {...props} />;

        case "admin-subcategories":
            return <SubcategoriesPage {...props} />;

        case "admin-products":
            return <ProductsPage {...props} />;

        case "admin-sizes":
            return <CategorySizesPage {...props} />;

        case "category-page":
            return <CategoriesCustomerPage {...props} />;

        case "product-detail-page":
            return <ProductDetailPage {...props} />;

        case "admin-pricing":
            return <CategoryPricingPage {...props} />;  

        case "admin-design-specs":
             return <CategoryDesignSpecsPage {...props} />;  

        default:
            return <WebsiteHome />;
    }
}

const appElement = document.getElementById("app");

if (appElement) {
    const page = appElement.dataset.page || "website-home";
    const props = appElement.dataset.props
        ? JSON.parse(appElement.dataset.props)
        : {};

    ReactDOM.createRoot(appElement).render(
        <React.StrictMode>
            <AppRouter page={page} props={props} />
        </React.StrictMode>
    );
}