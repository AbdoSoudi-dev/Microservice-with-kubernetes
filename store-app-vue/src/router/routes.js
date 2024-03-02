
import App from '../App.vue'
import index from '../components/index.vue'

const routes = [
    {
        path: '/',
        name: 'router',
        component: App,
        children: [
            {path: '/', name: 'Product List', component: index},
        ]
    }
]

export default routes
