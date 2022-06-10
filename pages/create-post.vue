<template>
  <v-row justify="center" style="position: relative;">
    <v-col cols="7">
      <h3 class="headline mb-3">Create Post</h3>
      <v-row>
        <v-col cols="auto" class="pb-1">
          <v-autocomplete placeholder="Create Topic" class="rounded-lg" outlined dense hide-details></v-autocomplete>
        </v-col>
        <v-col cols="12" class="py-1 my-1">
          <v-card class="rounded-lg mx-auto py-3 px-3" outlined>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <div class="">
                    <v-text-field class="rounded-lg" label="Title" placeholder="Input Your Title" outlined dense hide-details></v-text-field>
                  </div>
                  <div class="py-2">
                    <v-textarea class="rounded-lg" name="input-desc" label="Text" placeholder="Text (Optional)" outlined dense hide-details></v-textarea>
                  </div>
                  <div class="py-2">
                    <p class="text-h6">Image or Video</p>
                    <v-file-input counter multiple truncate-length="5" class="pt-0"></v-file-input>
                  </div>
                  <div class="py-2">
                    <v-btn elevation="2" color="teal" outlined>Post</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" style="width: 373.75px">
      <v-row style="position: fixed; width: inherit">
        <v-col cols="12">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize pb-2">Basic Rules</h4>

                <!-- <v-divider></v-divider> -->

                <div class="subtitle text--disabled py-1">
                  The Topic where the true asshole-ish nature of all cats is displayed for the world to see.
                </div>
                <div class="subtitle text--disabled py-1">
                  The Topic where the true asshole-ish nature of all cats is displayed for the world to see.
                </div>
                <div class="subtitle text--disabled py-1">
                  The Topic where the true asshole-ish nature of all cats is displayed for the world to see.
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreatePost',
}
</script>

<style scoped>
</style>
