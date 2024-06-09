// class Router {
export class Router {
    /**
     * Metodo inicial.
     *
     * @param {Object} paths - Object with paths and templates
     * @return {void}.
     */
    constructor(paths,cll) {
        this.paths = paths;
        this.allowRoutes = [
            '/',
            '/home',
            '/game',
        ];
        this.initRouter(()=>{cll()});
        this.handlePopState(cll);
    }

    /**
     * Permite inicializar el router
     *
     * @return {void}.
     */
    initRouter(cll) {
        const { pathname } = window.location;
        if (this.allowRoutes.indexOf(pathname)) {
            window.location.pathname = '/';
        }
        const URI = pathname === "/" ? "home" : pathname.replace("/", "");
        // const URI = pathname === "/" ? "home" : "home";
        this.load(URI, false,()=>{cll()}); // No modificar el historial al cargar inicialmente
    }

    /**
     * Permite iniciar la carga de paginas.
     *
     * @param {string} page - Page to load
     * @param {boolean} pushState - Whether to push state to history
     * @return {void}.
     */
    load(page = "home", pushState = true, cll) {
        const { paths } = this;
        const { path, template } = paths[page] || paths['home'];
        const $CONTAINER = document.querySelector("#content");
        $CONTAINER.innerHTML = template;
        if (pushState) {
            window.history.pushState({}, "", path);
        }
        cll();
    }

    /**
     * Maneja el evento popstate
     *
     * @return {void}.
     */
    handlePopState(cll) {
        window.addEventListener('popstate', () => {
            const pathname = window.location.pathname.replace("/", "") || "home";
            this.load(pathname, false,()=>{cll()}); // No modificar el historial al cargar desde popstate
        });
    }
}