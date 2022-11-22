<template>
  <div class="mx-auto" id="profile">
    
    <v-container>
      <v-row
        justify="center"
      >
        <v-col cols="3">
          <h1>내 프로필</h1>
          <Timeline :my_movies="my_movies"/>
        </v-col>
        <v-col cols="8">
          <div>
            <h3>댓글 작성 목록</h3>
            <ReviewList :my_reviews="my_reviews"/>
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="5"
              >
                
              </v-pagination>
            </div>
          </div>
          <br>
          <LikeMovieList :movies="movies"/>
        </v-col>
      </v-row>
    </v-container>
    
    
  </div>
</template>

<script>
import Timeline from '../components/Timeline'
import ReviewList from '../components/ReviewList'
import LikeMovieList from '../components/LikeMovieList'
import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex';
import router from '../router';
import axios from 'axios'

export default {
  name: "profile",
  
  data () {
    return {
      username: null,
      nickname: null,
      my_reviews: [],
      my_movies: [],
      reviews_info: [],
      reccomands: [],
      movies: [],
      page_num: 1,
      page: 1,
    }
  },

  components: {
    Timeline,
    ReviewList,
    LikeMovieList,
  },

  methods: {
    getInfo() {
      this.username = sessionStorage.getItem('username')
      const token = sessionStorage.getItem('jwt')
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
      axios.get(`http://localhost:8000/api/v1/movie/list/?page=${this.page_num}`, options)
      .then(res => {
        const user_id = jwtDecode(token).user_id
        const movies = this.movies.concat(res.data.results)
        movies.forEach(V => {
          if (V.like_users.includes(user_id)) {
            this.movies.push(V)
            this.my_movies.push(V)
          }
        });
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