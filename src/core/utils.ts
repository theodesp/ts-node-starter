import { Router } from 'express';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
    middlewareWrappers: Wrapper[],
    router: Router
) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

export interface RouteInfo {
    path: string;
    router: Router;
}

export const applyRoutes = (routes: RouteInfo[], app: Router) => {
    for (const route of routes) {
        app.use(route.path, route.router);
    }
};
