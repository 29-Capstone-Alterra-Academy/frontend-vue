<template>
  <v-app dark>
    <v-app-bar clipped fixed app>
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn v-model="current" class="px-10" color="primary" dark v-on="on" >{{ current }}</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            :current="item.title"
            class="navigation-item"
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
      </v-menu>
      <v-spacer />
      <v-text-field
        v-model="search"
        clearable
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
      ></v-text-field>
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn v-model="current" class="px-10" color="primary" dark v-on="on" >User</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            :current="item.title"
            class="navigation-item"
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
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtChild :search-post="search" />
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
      current: '',
      search: "",
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/dashboard',
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
    }
  },
  watch: {
    'current'(value) {
      this.current = value
    },
  },
  methods: {
    currentPage(value) {
      this.current = value
    },
  },
}
</script>

<style scoped>
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
