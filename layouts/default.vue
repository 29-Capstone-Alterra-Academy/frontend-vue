<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title text-center"
              >Alterra</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
      <v-card class="mt-4 mx-auto" shaped style="background-color: white;" max-width="90%">
        <v-card-text>
          <v-row no-gutters>
            <v-col class="justify-content-center" cols="4">
              <v-icon style="color: black;">mdi-account-circle mdi-2</v-icon>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-col cols="7" style="padding-right: 0px;">
                  <p style="margin: 0; color: #4C4C4C;">John Doe</p>
                </v-col>
                <v-col cols="2" style="padding-left: 0px;">
                  <p style="margin: 0; color: #4C4C4C;">></p>
                </v-col>
              </v-row>
              <p style="margin: 0; color: #B3B3B3;">Admin</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-spacer />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="navigation-item"
          router
          exact
          outlined
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="navigation-item" to="/">
          <v-list-item-action>
            <v-icon class="logout">mdi-power</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="logout" v-text="'Log Out'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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
          title: 'Categories',
          to: '/search',
        },
        {
          icon: 'mdi-account',
          title: 'Users',
          to: '/search',
        },
        {
          icon: 'mdi-alert',
          title: 'Banned',
          to: '/search',
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/search',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style scoped>
.v-sheet.v-card.v-sheet--shaped {
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
