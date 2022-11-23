<template>

  <div class="movie-list">

    <v-form style="margin:0px;">
      <v-container>
        <v-row>
          <v-col
            cols="8"
            sm="8"
          >
          </v-col>

          <v-col
            cols="3"
            sm="3"
            v-if="(this.viewSearchBar == true)"
            >
            <v-text-field
            v-model="search"
            label="검색어를 입력해 주세요."
            clearable
            style="margin:0px;"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            sm="3"
            v-else-if="(this.viewSearchBar == false)"
            >
          
          </v-col>

          <v-col cols="1" stlye="position:absolute;">
            <v-btn 
            icon 
            style="margin:auto; position: relative; left:-10%; "
            
            @click="changeSearchBar"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>

          
        </v-row>
      </v-container>
    </v-form>

      <!-- 검색어를 입력 안했을때 전체 영화 리스트 출력 -->
      <v-container fluid v-if="!this.search">
        <!-- <v-lazy> -->
        <v-row dense>
          <!-- <v-lazy> -->
            <v-col
              v-for="(movie, idx) in movies"
              :key="idx"
              :cols="col_flex"
              md="3"
            >
              <v-lazy
                transition="fade-transition"
              >
                <MovieCard :movie="movie"/>
              </v-lazy>
            </v-col>
          <!-- </v-lazy> -->
        </v-row>
        <!-- </v-lazy> -->
      </v-container>

      <!-- 검색어를 입력 했을때 검색창에 입력한 영화만 출력 -->
      <v-container fluid v-if="this.search">
        <!-- <v-lazy> -->
        <v-row dense>
          <!-- <v-lazy> -->
            <v-col
              v-for="(movie, idx) in this.searchMovies"
              :key="idx"
              :cols="col_flex"
              md="3"
            >
              <v-lazy
                transition="fade-transition"
              >
                <MovieCard :movie="movie"/>
              </v-lazy>
            </v-col>
          <!-- </v-lazy> -->
        </v-row>
        <!-- </v-lazy> -->
      </v-container>


    <!-- </v-card> -->

  </div>
  <!-- </v-responsive> -->
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'

export default {
  name: 'MovieList',
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Array,
    }
  },
  data() {
    return {
      col_flex: 3,
      search : null,
      viewSearchBar : false,
      searchMovies: [],
      page_num : 1,

    }
  },
  methods : {
    changeSearchBar() {
      this.viewSearchBar = !this.viewSearchBar
    }
  },
  watch: {
    search () {
      console.log(this.search)
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const search = {
        'search' : this.search
      }

      axios.get(`http://localhost:8000/api/v1/searchmovie/`, search, options)
      .then(res => {
        console.log(res)
        const mdata = []
        res.data.forEach(ele => {
          if (ele.title.includes(this.search)) {
        //     console.log(ele)
        //     console.log(this.search)
            
            mdata.push(ele)
        //   } else {
        //     this.page_num++
          }
        
        })
        this.searchMovies = mdata
      })
      
      .catch(error => {
        console.log(error.response)
      })
    }
  }
}


</script>

<style>

</style>