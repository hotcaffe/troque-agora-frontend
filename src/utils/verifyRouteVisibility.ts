const APP_ROUTES = {
    public: ['/', '/login', '/home', '/produtos/*', '/ajuda', '/cadastro']
}

export function verifiyRouteVisibility(pathname: string): boolean {
    const isPublic = APP_ROUTES.public.some(route => {
        if (route === pathname) return true

        const split = route.slice(1).split('/');
        const pathSplit = pathname.slice(1).split('/')

        if (split.includes(pathSplit[0]) && split.slice(-1)[0] === "*") return true

        return false
    });

    return isPublic;
}