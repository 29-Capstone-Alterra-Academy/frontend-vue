<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary app flat color="primary">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Nomizo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <AuthButtonSide :items="items" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat clipped fixed class="">
      <v-toolbar-title>
        <v-img src="/Logo.svg" class="" width="110"></v-img>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        v-if="isXs"
        class="mr-4"
        @click.stop="drawer = !drawer"
      />
      <AuthButton v-else :items="items" />
      <v-spacer />
      <v-icon class="pa-2" @click="$router.push(`/notification`)">
        mdi-bell-outline
      </v-icon>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-card class="rounded-lg px-2" outlined v-bind="attrs" v-on="on">
            <v-list-item>
              <v-row justify="center" align="center">
                <v-col cols="auto" style="width: 200px">
                  <v-row align="center" class="pa-0">
                    <v-col cols="1" class="pa-0 pr-2" style="max-width: none">
                      <v-img
                        v-if="profile.profile_image != null"
                        :src="profile.profile_image"
                        class="rounded-circle"
                        width="30"
                        height="30"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://randomuser.me/api/portraits/women/84.jpg"
                        class="rounded-circle"
                        width="30"
                        height="30"
                      ></v-img>
                    </v-col>
                    <v-col cols="auto">
                      <v-row>
                        <v-col cols="12" class="pa-0">
                          <div class="text-capitalize caption">
                            {{ profile.username }}
                          </div>
                        </v-col>
                        <v-col cols="12" class="pa-0">
                          <div
                            v-if="isAdmin"
                            class="text-capitalize text--disabled caption"
                          >
                            Admin
                          </div>
                          <div
                            v-else
                            class="text-capitalize text--disabled caption"
                          >
                            User
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="auto" class="pa-0">
                  <v-icon>mdi-menu-down</v-icon>
                </v-col>
              </v-row>
            </v-list-item>
          </v-card>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text--disabled body-2"
                v-text="`User Options`"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/my">
            <v-list-item-content>
              <v-list-item-title class="body-1" v-text="`Profile`" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-divider />
        </v-list>
        <v-list>
          <!-- <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title class="body-2" v-text="`Settings`" />
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item @click="handleLogout">
            <v-list-item-content>
              <v-list-item-title
                class="body-2"
                style="color: red"
                v-text="`Logout`"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main class="global">
      <NuxtChild :search-post="search" />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AuthButton from '~/components/navbar/AuthButton'
import AuthButtonSide from '~/components/navbar/AuthButtonSide'

export default {
  name: 'DefaultLayout',
  components: {
    AuthButton,
    AuthButtonSide,
  },
  middleware: 'authenticated',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default() {
        return 'Home'
      },
    },
  },
  data() {
    return {
      drawer: null,
      isXs: false,
      search: '',
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-magnify',
          title: 'Search',
          to: '/search',
        },
        {
          icon: 'mdi-palette',
          title: 'Ranking',
          to: '/ranking',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    route() {
      return this.$route.path
    },
    param() {
      return this.$store.state.layouts.layout
    },
    profile() {
      return this.$store.state.lists.profile
    },
  },
  created() {
    this.$store.dispatch('lists/loggedUser')
    this.$store.dispatch('lists/isAdmin')
  },
  methods: {
    ...mapMutations('auth', ['logout']),
    handleLogout() {
      this.logout()
      this.$forceUpdate()
      this.$router.push('/')
      // this.$axios
      //   .post(
      //     '/logout',
      //     {},
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     this.logout()
      //     this.$forceUpdate()
      //     this.$router.push('/')
      //   })
      //   .catch((error) => {
      //     this.message = error.message
      //     this.snackbar = true
      //   })
    },
  },
}
</script>

<style>
.global {
  background-color: #cfcfcf;
}
.user-card.v-card.v-sheet.v-sheet--shaped {
  border-radius: 24px;
}
.navigation-item.v-list-item {
  margin-left: 10px;
  margin-right: 10px;
}
.navigation-item.v-list-item--active {
  border-bottom: 1px solid red;
}
.navigation-item.theme--dark.v-list-item--active::before {
  opacity: 0;
}
.logout {
  color: red;
}
.logout.mdi-power.theme--dark {
  color: red;
}
</style>
