export default function ({ store, redirect }) {
    // If the user is authenticated
    if (store.state.auth.accessToken) {
      return redirect('/')
    }
  }
  