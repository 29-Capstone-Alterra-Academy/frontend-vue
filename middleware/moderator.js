export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.getters.lists.isModerating) {
      return redirect('/')
    }
  }
  