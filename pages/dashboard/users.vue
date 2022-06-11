<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-item-group mandatory>
      <v-container>
        <v-row>
          <v-col v-for="n in 2" :key="n" cols="12" md="4">
            <v-item v-slot="{ clicked, toggle }" v-model="active">
              <v-btn
                depressed
                :color="clicked ? 'primary' : 'secondary'"
                @click="toggle"
              >
                {{ n }}
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'UsersPage',
  layout: 'admin',
  data() {
    return {
      search: '',
      active: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
      drawer: true,
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
          to: '/dashboard/users',
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
      threads: [
        {
          id: 1,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 2,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 3,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 4,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 5,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 2,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 3,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [],
        },
        {
          id: 4,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 5,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 6,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 7,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 2,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 3,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 8,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
      ],
      topics: [
        {
          id: 1,
          name: 'Genshin Impact',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
        {
          id: 2,
          name: 'Cing Kucing',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
      ],
    }
  },
}
</script>
