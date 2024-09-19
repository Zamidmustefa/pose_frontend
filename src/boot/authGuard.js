// authGuard.js
export function requireAuth(to, from, next) {
    // Example authentication check, replace with your actual logic
    const isAuthenticated = Boolean(localStorage.getItem('authToken')); // or use a Vuex getter or other method

    if (isAuthenticated) {
        next(); // Proceed to the route
    } else {
        next('/login'); // Redirect to login page
    }
}

export function redirectIfAuthenticated(to, from, next) {
    const isAuthenticated = Boolean(localStorage.getItem('authToken'));

    if (isAuthenticated) {
        next('/'); // Redirect to home or a protected page if already logged in
    } else {
        next(); // Proceed to login/register
    }
}