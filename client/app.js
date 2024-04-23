import Dashbord from "./pages/Dashbord.js";
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";

function router() {
  const routes = [
    { path: "/", view: Dashbord },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
  ];
  const potentialRouters = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });
  let match = potentialRouters.find((route) => route.isMatch);

  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }
  document.querySelector("#app").innerHTML = match.route.view();
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

const sidbarTogler = document.querySelector(".sidebar-toggler");
const sidbar = document.querySelector(".nav");

sidbarTogler.addEventListener("click", () => {
  sidbar.classList.toggle("mini-sidebar");
});

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
