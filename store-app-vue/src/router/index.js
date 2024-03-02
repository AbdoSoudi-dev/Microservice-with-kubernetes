import {createRouter, createWebHistory} from "vue-router";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next()
})

export default router
