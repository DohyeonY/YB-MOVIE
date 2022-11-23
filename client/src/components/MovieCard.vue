<template>
  
  <v-hover style="margin: 20px;" v-slot:default="{ hover }">
    <v-card class="movie-card">

      <v-img
        :src="movie.img_url"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="550px"
      >
      </v-img>


      <v-expand-transition>
        <v-fade-transition>
            <v-overlay
            v-if="hover"
            absolute
            color="#000000"
            >
            
            <br>
              <div 
                v-if="hover || rating !== 0"
                class="d-flex transition-fast-in-fast-out black darken-2 text-center display-1 "
                @click.stop="review_dialog_show=true"
              >
                <v-rating
                  v-model="rating"
                  color="orange"
                  background-color="orange lighten-3"
                  size="30.6"
                ></v-rating>
              </div>
              <br>

            <div>
              <span v-for="(i, idx) in rating" :key="idx">
                <i style="color:yellow;" class="fas fa-star"></i>
              </span>
            </div>
            <v-btn small @click.stop="detail_dialog_show=true">
              상세보기
            </v-btn>
            <v-btn 
            v-if="liking"
            @click="like"
            icon>
          <v-icon style="color:red">mdi-heart</v-icon>
        </v-btn>

        <v-btn 
        v-if="!liking"
        @click="like"
        icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
          </v-overlay>
        </v-fade-transition>
        <!-- <div 
          v-if="hover || rating !== 0"
          class="transition-fast-in-fast-out black darken-2 text-center display-1 v-card--reveal"
          @click.stop="review_dialog_show=true"
        >
          <v-rating
            v-model="rating"
            color="orange"
            background-color="orange lighten-3"
            size="30.6"
          ></v-rating>
        </div> -->
      </v-expand-transition>
      
      <v-dialog
        v-model="review_dialog_show"
        max-width="900"
        >
        <MovieReviewModal :rating="rating" :movie="movie" @reviewUpdateEvent="ratingCheck" @closeDialogEvent="closeReviewDialog"/>
      </v-dialog>

      <v-dialog 
        v-model="detail_dialog_show"
        width="1600"
      >
        <MovieDetailModal :movie="movie" :reviews="reviews" @reviewUpdateEvent="ratingCheck" @closeDialogEvent="closeDetailDialog"/>
      </v-dialog>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn> -->
      
      <!-- detail modal -->
      
    </v-card>
  </v-hover>
  
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import MovieDetailModal from '@/components/MovieDetailModal.vue'
import MovieReviewModal from '@/components/MovieReviewModal.vue'

  export default {
    data: () => ({
      reviews: [],
      rating: 0,
      detail_dialog_show: false,
      review_dialog_show: false,
      liking: false,
      me: null,
    }),

    components: {
      MovieDetailModal,
      MovieReviewModal,
    },

    props: {
      movie: {
        type: Object,
        required: false,
      }
    },

    methods: {
      like: function () {
      const token = sessionStorage.getItem('jwt')
      const user_id = jwtDecode(token).user_id
      const options = {
          headers: {
            Authorization: 'JWT ' + token
          }
        }
      const item = {
        myId: user_id,
        movieId: this.movie.id,
      }
      axios.post(`http://localhost:8000/api/v1/${user_id}/${this.movie.title}/like/`, item, options)
      .then((res) => {
        // console.log(res)
        this.liking = res.data
        // console.log(this.movie.like_users)   
      })
    },
      closeDetailDialog() {
        this.detail_dialog_show = false
      },

      closeReviewDialog() {
        this.review_dialog_show = false
      },
      
      // rating한 적이 있는 영화는 별점 표시 (mount되는 시점에서 실행되는 함수)
      ratingCheck() {
        // 현재 영화의 리뷰 목록에서 현재 로그인한 사람의 id를 찾아본다.
        const token = sessionStorage.getItem('jwt')
        const user_id = jwtDecode(token).user_id
        const options = {
          headers: {
            Authorization: 'JWT ' + token
          }
        }

        axios.get(`http://localhost:8000/api/v1/review/movie/${this.movie.id}/`, options)
        .then(res => {
          this.reviews = res.data
          this.reviews.forEach(review => {
            if (review.user === user_id) {
              this.rating = review.score
            }
            axios.get(`http://localhost:8000/api/v1/user/${review.user}/`, options)
            .then(res => {
              review.username = res.data.username
            })
          })
        })
      }, // end of ratingCheck()
      check_like() {
        const token = sessionStorage.getItem('jwt')
        const user_id = jwtDecode(token).user_id
        this.me = user_id
        // console.log(this.movie.like_users)
        // console.log(this.me)
          if (this.movie.like_users.includes(this.me)) {
          this.liking = true        
        } else {
          this.liking = false
        }
      }      
    },

    watch: {

    }, // watch end
    
    mounted() {
      this.ratingCheck()
    },
    created() {
      this.check_like()
    }

  }
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 18%;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
}

</style>