import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/WelcomePage.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashBoard.vue"),
    children: [
      {
        path: "products",
        name: "products",
        component: () => import("../views/ProductsPage.vue"),
      },

      {
        path: "orders",
        component: () => import("../views/OrdersPage.vue"),
      },
      {
        path: "coupons",
        component: () => import("../views/CouponsPage.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("../views/UserBoard.vue"),
    children: [
      { path: "cart", component: () => import("../views/UserCart.vue") },
      {
        path: "productslist",
        component: () => import("../views/ProductsList.vue"),
      },
      {
        path: "product/:productId",
        component: () => import("../views/UserProduct.vue"),
      },
      {
        path: "checkout/:orderId",
        component: () => import("../views/UserCheckout.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
