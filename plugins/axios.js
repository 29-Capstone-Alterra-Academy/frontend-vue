export default function({
    store,
    app: { $axios },
    redirect
}) {
    $axios.onRequest((config) => {
        // check if the user is authenticated
        if (store.state.auth.accessToken) {
            // set the Authorization header using the access token
            config.headers.Authorization = 'Bearer ' + store.state.auth.accessToken;
        }

        return config;
    });

    $axios.onError(async (error) => {
        const statusCode = error.response ? error.response.status : -1;

        if (statusCode === 401 || statusCode === 422) {
            const refreshToken = store.state.auth.refreshToken;
            if (error.response.data.errorCode === 'JWT_TOKEN_EXPIRED' && refreshToken) {
                if (Object.prototype.hasOwnProperty.call(error.config, 'retryAttempts')) {
                    store.commit('auth/logout');
                    return redirect('/anmelden');
                }
                const config = { retryAttempts: 1, ...error.config };
                try {
                    await store.dispatch('auth/refresh');
                    return Promise.resolve($axios(config));
                } catch (e) {
                    store.commit('auth/logout');
                    return redirect('/anmelden');
                }
            }

            store.commit('auth/logout');
            return redirect('/anmelden');
        }

        return Promise.reject(error);
    });
}