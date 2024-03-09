<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, type Ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const limit = ref(10)
const offset = ref(0)
const posts: Ref<post[]> = ref([])
interface post {
  id: number
  title: string
  description: string
  content: string
  date: string
  first_name: string
  last_name: string
}

const onSubmit = async () => {
  const res = await axios.get(
    `http://localhost:3000/posts?limit=${limit.value}&offset=${offset.value}`
  )
  posts.value = res.data
}

onMounted(async () => {
  const res = await axios.get(
    `http://localhost:3000/posts?limit=${limit.value}&offset=${offset.value}`
  )
  posts.value = res.data
})
</script>

<template>
  <div class="posts">
    <h1 class="text-xl">This is the posts page</h1>
    <div class="flex space-x-3 my-2 items-center">
      <div class="space-x-2">
        <label for="limit">Limit</label>
        <input
          type="number"
          name="limit"
          id="limit"
          v-model="limit"
          class="border border-black rounded p-0.5"
        />
      </div>
      <div class="space-x-2">
        <label for="offset">Offset</label>
        <input
          type="number"
          name="offset"
          id="offset"
          v-model="offset"
          class="border border-black rounded p-0.5"
        />
      </div>

      <Button label="Submit" raised outlined @click="onSubmit" />
    </div>
  </div>
  <div v-if="posts.length !== 0">
    <div class="flex flex-wrap gap-2 justify-between">
      <Card
        style="width: 25rem; overflow: hidden"
        v-for="(post, idx) in posts"
        :key="`author-${idx}`"
      >
        <template #header>
          <img alt="user header" :src="`https://picsum.photos/id/${post.id+100}/400/300`" />
        </template>
        <template #title>{{ post.title }}</template>
        <template #subtitle>{{ post.description }}</template>
        <template #content>
          <p class="m-0">
            {{ post.content }}
          </p>
        </template>
        <template #footer>
          <div class="flex justify-between mt-1">
            <p>Author - {{ post.first_name }} {{ post.last_name.toUpperCase() }}</p>
            <p>Posted at - {{ post.date }}</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.p-card {
  margin: 1em;
}
</style>
