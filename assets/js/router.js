const routes = {
    "": {
        template: "./pages/login.html",
        title: "Login | Digital Atelier"
    },
    "home": {
        template: "./pages/home.html",
        title: "Home | Digital Atelier"
    },
    "products": {
        template: "./pages/products.html",
        title: "Products | Digital Atelier"
    },
    "cart": {
        template: "./pages/cart.html",
        title: "Shopping Cart | Digital Atelier"
    },
    "login": {
        template: "./pages/login.html",
        title: "Login | Digital Atelier"
    },
    "register": {
        template: "./pages/register.html",
        title: "Register | Digital Atelier"
    },
    "dashboard": {
        template: "./pages/dashboard.html",
        title: "Account Overview | Digital Atelier"
    },
    "checkout": {
        template: "./pages/checkout.html",
        title: "Checkout | Digital Atelier"
    },
    "payment-methods": {
        template: "./pages/payment-methods.html",
        title: "Payment Methods | Digital Atelier"
    },
    "product-detail": {
        template: "./pages/product-detail.html",
        title: "Product Detail | Digital Atelier"
    },
    "search-results": {
        template: "./pages/search-results.html",
        title: "Search Results | Digital Atelier"
    },
    "reviews": {
        template: "./pages/reviews.html",
        title: "Reviews | Digital Atelier"
    },
    "admin": {
        template: "./pages/admin.html",
        title: "Admin Dashboard | Digital Atelier"
    },
    "admin-products": {
        template: "./pages/admin-products.html",
        title: "Admin Products | Digital Atelier"
    },
    "admin-orders": {
        template: "./pages/admin-orders.html",
        title: "Admin Orders | Digital Atelier"
    },
    "admin-customers": {
        template: "./pages/admin-customers.html",
        title: "Customer Management | Digital Atelier"
    },
    "my-orders": {
        template: "./pages/my-orders.html",
        title: "Order History | Digital Atelier"
    },
    "account-security": {
        template: "./pages/account-security.html",
        title: "Security Settings | Digital Atelier"
    }
};

const handleLocation = async () => {
    // Lấy tên hash từ URL
    let path = window.location.hash.replace("#", "");
    
    // Kiểm tra xem đây có phải là id của một thành phần trên trang hiện tại không
    // (như id="collections" trong home.html)
    const targetElement = document.getElementById(path);
    if (!routes[path] && targetElement) {
        // Nếu không có trong danh sách route VÀ tìm thấy thẻ HTML mang ID này -> Cuộn mềm mại đến nó
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return; // Dừng lại, không tải lại trang!
    }

    // Nếu không, tìm route hoặc fallback về home
    let routeInfo = routes[path];
    let isAnchorRoute = false;
    
    if (!routeInfo) {
        routeInfo = { template: "./pages/login.html", title: "Login | Digital Atelier" };
        isAnchorRoute = true;
    }

    try {
        const response = await fetch(routeInfo.template);
        if (!response.ok) {
            throw new Error(`Failed to load ${routeInfo.template}`);
        }
        const html = await response.text();
        document.getElementById("app-root").innerHTML = html;
        document.title = routeInfo.title;

        // Toggle layout for Admin/Auth screens
        const header = document.querySelector('.site-header');
        const footer = document.querySelector('.site-footer');
        if (path.startsWith('admin') || path === 'login' || path === 'register' || path === '') {
            if (header) header.style.display = 'none';
            if (footer) footer.style.display = 'none';
        } else {
            if (header) header.style.display = '';
            if (footer) footer.style.display = '';
        }
        
        // Cố gắng cuộn đến anchor (nội dung vừa click) nếu có, nếu không thì cuộn lên đầu trang
        if (isAnchorRoute && path !== "") {
            const newTarget = document.getElementById(path);
            if (newTarget) {
                newTarget.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
        
    } catch(e) {
        console.error("Routing error:", e);
        document.getElementById("app-root").innerHTML = `
            <div style="padding: 100px; text-align: center;">
                <h2>Trang chưa được cấu hình hoặc lỗi máy chủ.</h2>
                <p>Chi tiết: ${e.message}</p>
                <p>Hãy đảm bảo bạn đang chạy thông qua Live Server (http://) chứ không phải mở trực tiếp file (file://).</p>
            </div>
        `;
    }
};

// Listen to hash changes
window.addEventListener("hashchange", handleLocation);

// Call on initial load
handleLocation();
