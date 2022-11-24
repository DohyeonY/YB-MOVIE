# Final Project - YB MOVIE

## 1. Intro

YB MOVIE는 데이터 기반 영화 추천 서비스 입니다.
사용자는 영화에 대한 코멘트를 남길 수 있으며, 영화 이상형월드컵을 이용해 사용자가 선호하는 장르를 파악하여 영화를 추천해주는 서비스입니다.

## 2. Requirement

1. Python Web Framework

   1. Django 3.2.13

2. Javascript Web Framework

   1. Vue 2.7.14
      - vuex 3.6.2
      - vuetify 2.6.0

## 2. Data

#### -  Seed data

- [네이버 영화](https://movie.naver.com) 영화에 대한 데이터를 수집하였습니다. 

- `db.sqplite3` 에서 테이블간의 관계는 아래와 같습니다.

  - `movies/genre`

    | 필드명 | 자료형  | 설명        |
    | ------ | ------- | ----------- |
    | id     | Integer | Primary Key |
    | name   | String  | 장르 이름   |

  

  - `movies/directors`

    | 필드명      | 자료형  | 설명            |
    | ----------- | ------- | --------------- |
    | id          | Integer | Primary Key     |
    | name        | String  | 감독 이름       |
    | role        | String  | 역할            |
    | img_url     | Text    | 감독 이미지 URL |
    | description | Text    | 감독 설명       |

  
  
  
  - `movies/actors`
  
    | 필드명      | 자료형  | 설명            |
    | ----------- | ------- | --------------- |
    | id          | Integer | Primary Key     |
    | name        | String  | 배우 이름       |
    | role        | String  | 역할            |
    | img_url     | Text    | 배우 이미지 URL |
    | description | Text    | 배우 설명       |
  
  
  
  - `movies/movies`
  
    | 필드명      | 자료형  | 설명                   |
    | ----------- | ------- | ---------------------- |
    | id          | Integer | Primary Key            |
    | title       | String  | 영화 제목              |
    | title_en    | String  | 영화 영문 제목         |
    | rate        | String  | 평점                   |
    | directors   | Array   | 영화 감독들의 pk       |
    | actors      | Array   | 출연 배우들의 pk       |
    | img_url     | Text    | 영화 포스터 이미지 URL |
    | description | Text    | 영화 줄거리            |
    | open_date   | String  | 개봉일                 |
    | genres      | Array   | 영화 장르 pk 리스트    |
    | like_users  | Integer | 영화에 좋아요한 유저   |
    | follow_users| Interger| 영화를 북마크한 유저   |

  - `movies/wordcupMovies`
  
    | 필드명      | 자료형  | 설명                   |
    | ----------- | ------- | ---------------------- |
    | id          | Integer | Primary Key            |
    | title       | String  | 영화 제목              |
    | title_en    | String  | 영화 영문 제목         |
    | rate        | String  | 평점                   |
    | directors   | Array   | 영화 감독들의 pk       |
    | actors      | Array   | 출연 배우들의 pk       |
    | img_url     | Text    | 영화 포스터 이미지 URL |
    | description | Text    | 영화 줄거리            |
    | open_date   | String  | 개봉일                 |
    | genres      | Array   | 영화 장르 pk 리스트    |
    | tmdb        | Integer | 해당 영화의 tmdb pk   |
    | users       | Interger| 해당 영화를 선택한 유저|
  



## 3. Getting Started

### 각각의 폴더로 들어간 뒤 터미널에 명령을 입력하세요.

- backend 폴더에서
  - `python -m venv venv`
  - `source venv/Scripts/activate`
  - 최초 실행할 경우 꼭 수행
    - 데이터베이스 생성
      - `python manage.py migrate`
    - json 데이터를 DB에 dump
      - `python manage.py loaddata movies/worldcupmovies.json movies/newmovie.json movies/movies.json 
         movies/genre.json movies/directors.json movies/actors.json`
  - `python manage.py runserver`
- frontend 폴더에서
  - `npm i`
  - `npm run serve`


## 5. Reuslt

- Server URL

  [Back-end server](https://movie-cave.herokuapp.com)

  [Front-end server](https://movie-cave-vue.firebaseapp.com)

- Source Code (Github Flow)

  [Github Page](https://github.com/DohyeonY/final_pjt/)
  
  


## 6. 실행 화면

1. `Login`

![login](./img/login.PNG)



2. `Signup`

![signup](./img/signup.PNG)



3. `Home`

![homepage](./img/homepage.PNG)



4. `Movie Detail`

![movie_detail_description](./img/movie_detail_description.PNG)



5. `Review`

![review](./img/review.PNG)



6. `Worlcup`

![worldcup_choice](./img/worldcup_choice.PNG)



7. `Profile`

![profile(2)](./img/profile(2).PNG)

