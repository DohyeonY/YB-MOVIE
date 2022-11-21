<template>
  <div class="mx-auto" id="profile">
    
    <v-container>
      <h2>{{ username }}'s</h2>
      <v-row
        justify="center"
      >
        <v-col cols="3">
          <h3>Movie List</h3>
          <Timeline :my_movies="my_movies"/>
        </v-col>
        <v-col cols="8">
          <h3>Review List</h3>
          <ReviewList :my_reviews="my_reviews"/>
          <br>
          <RecommandList :movies="reccomands"/>
        </v-col>
      </v-row>
    </v-container>
    
    
  </div>
</template>

<script>
import Timeline from '../components/Timeline'
import ReviewList from '../components/ReviewList'
import RecommandList from '../components/RecommandList'
import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex';
import router from '../router';
import axios from 'axios'

export default {
  name: "profile",
  
  data () {
    return {
      username: null,
      my_reviews: [],
      my_movies: [],
      reviews_info: [],
      reccomands: [],
    }
  },

  components: {
    Timeline,
    ReviewList,
    RecommandList,
  },

  methods: {
    getInfo() {
      this.username = sessionStorage.getItem('username')
      const token = sessionStorage.getItem('jwt')
      console.log(token)
      const user_id = jwtDecode(token).user_id
      const options = {
        headers: {
          Authorization: `jwt ${token}`
        }
      }
      axios.get(`http://127.0.0.1:8000/api/v1/review/user/${user_id}`)
      .then(res => {
        res.data.forEach(V => {
          axios.get(`http://127.0.0.1:8000/api/v1/movie/${V.movie}/`)
          .then(res => {
            const reviewData = {
              movie: res.data.title,
              score: V.score,
              content: V.content
            }
            this.my_reviews.push(reviewData)
          })          
        });
      })

      axios.get(`http://localhost:8000/api/v1/preference/${user_id}/`, options)
      .then(res => {
        this.reccomands = res.data
      })
    }
  }, 

  computed: {
    ...mapGetters(['isLoggedIn']),
  },

  created () {
    if (this.isLoggedIn) {
      this.getInfo()
    } else{
      router.push('/login')
    }
  }
};
</script>

<style>
</style>