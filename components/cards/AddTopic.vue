<template>
  <v-dialog :value="value" max-width="500" @input="$emit('input', $event)">
    <v-card>
      <v-card-title class="text-h5">
        <v-col cols="11" class="pa-0"> Buat Topik Baru </v-col>
        <v-col cols="auto" class="pa-0">
          <v-btn icon @click.native="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-card-title class="pt-0">
        <v-divider />
      </v-card-title>

      <v-card-text>
        <div class="">
          <v-textarea
            :value="title"
            rows="1"
            class="rounded-lg"
            label="Nama Topik"
            placeholder="Nama Topik"
            counter
            auto-grow
            outlined
            dense
            hide-details
          ></v-textarea>
        </div>
        <div class="py-2">
          <v-textarea
            :value="content"
            rows="6"
            class="rounded-lg"
            label="Deskripsi (Optional)"
            placeholder="Deskripsi (Optional)"
            counter
            auto-grow
            outlined
            dense
            hide-details
          ></v-textarea>
        </div>
        <div class="">
          <v-textarea
            :value="rules"
            rows="1"
            class="rounded-lg"
            label="Tambah Rules (Opsional)"
            placeholder="Tambah Rules (Opsional)"
            counter
            auto-grow
            outlined
            dense
            hide-details
          ></v-textarea>
        </div>
        <div class="py-2">
          <p class="text-h6">Image or Video</p>
          <v-card
            outlined
            dense
            class="rounded-lg"
            :class="{ 'grey lighten-2': dragover }"
            @drop.prevent="onDrop($event)"
            @dragover.prevent="dragover = true"
            @dragenter.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
          >
            <v-card-text>
              <v-row
                class="d-flex flex-column"
                dense
                align="center"
                justify="center"
              >
                <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">
                  mdi-cloud-upload
                </v-icon>
                <p>Drop your file(s) here, or click to select them.</p>
              </v-row>
              <v-virtual-scroll
                v-if="images.length > 0"
                :items="images"
                height="150"
                item-height="50"
              >
                <template #default="{ item }">
                  <v-list-item :key="item.name">
                    <v-list-item-content>
                      <v-list-item-title outlined>
                        {{ item.name }}
                        <span class="ml-3 text--secondary">
                          {{ item.size }} bytes</span
                        >
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click.stop="removeFile(item.name)">
                        <v-icon> mdi-close-circle </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="addTopic"> Buat Baru </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: '',
      content: '',
      rules: '',
      dragover: false,
      images: [],
      multiple: true,
    }
  },
  methods: {
    removeFile(fileName) {
      // Find the index of the
      const index = this.images.findIndex((file) => file.name === fileName)
      // If file is in uploaded files remove it
      if (index > -1) this.images.splice(index, 1)
    },
    onDrop(e) {
      this.dragover = false
      // If user has uploaded multiple files but the component is not multiple throw error
      if (!this.multiple && e.dataTransfer.files.length > 1) {
        this.$store.dispatch('addNotification', {
          message: 'Only one file can be uploaded at a time..',
          colour: 'error',
        })
      }
      // Add each file to the array of uploaded files
      else
        for (const image of e.dataTransfer.files) {
          this.images.push(image)
        }
    },
    addTopic() {},
  },
}
</script>
