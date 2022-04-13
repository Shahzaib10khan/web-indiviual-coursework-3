<template>
<!-- eslint-disable   -->
  <div class="row" v-if="!checkout">
			<div class="col-1">
				<div class="form text-white" style="margin-left: -50px; margin-top: 25px;">
					<h3>Sort By:</h3>
					<div class="form-group mt-5">
						<select v-model="filter" class="form-control" v-on:change="sortCourse">
							<option value="">Choose Any..</option>
							<option value="subject">Subject</option>
							<option value="city">City</option>
							<option value="price">Price</option>
							<option value="availability">Availability</option>
						</select>
					</div>
					<hr>
					<div class="form-check">
						<input type="radio" v-model="sort" value="assending" id="assending" class="form-check-input" v-on:change="sortCourse">
						<label for="assending" class="form-check-label ml-3">Ascending </label>
					</div>
					<div class="form-check">
						<input type="radio" v-model="sort" value="descending" id="descending" class="form-check-input" v-on:change="sortCourse">
						<label for="descending" class="form-check-label ml-3">Descending </label>
					</div>

				</div>
			</div>
			<div class="col-10">
				<h3 class="text-white mt-4 mb-3">Available Lessons</h3>
				<div>
					<input type="text" class="form-control" placeholder="Search by course name, city..." v-model="searchData" v-on:input="searchLessons">
				</div>
				<div class="row">
					<div
						class="col-12 d-flex justify-content-center mt-2"
						v-if="allCourses.length <= 0"
					>
						<div class="loader"></div>
					</div>
					
					<div class="col-4 mt-4" v-for="lesson in allCourses" :key="lesson.id">
						<div class="card" style="width: 18rem;">
							<div class="text-center">
								<img :src="lesson.thumbnail" class="card-img-top" alt="logo" style="height: 128px; object-fit: cover;">
							</div>
							<div class="card-title text-center mt-1">
								<strong>{{ lesson.course }}</strong>
							</div>
							<div class="card-body">
								<strong>City: </strong>{{lesson.city}} <hr>
								<strong>Price: </strong>{{lesson.price}} <hr>
								{{lesson.description.substr(0, 50) + '...'}}
							</div>
							
							<div class="row card-footer justify-content-center">
								<div class="col-6">
									<button class="btn btn-primary" v-on:click="addToCart(lesson)" :disabled="lesson.space <= 0">Add to cart</button>
								</div>
								<div class="col-6 mt-1">
									<strong> Space: {{lesson.space}} </strong>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-1 mt-4">
				<button class="btn btn-primary" v-on:click="checkout=true" :disabled="cart.length <= 0">Cart ({{cart.length}})</button>
			</div>
		</div>
</template>

<script>
/* eslint-disable */ 
export default {
  name: 'Lessons',
  props: {
    allCourses: Array
  },
  data(){
    return{
      	cart: [],
		errors: {
			phone: '',
			name: ''
		},
		filter: '',
		sort: '',
		searchData: '',
    }
  },
  methods: {
    searchLessons(){

			console.log('called search');

			const requestOptions = {
				method: "POST",
				headers: {"Content-Type": "application/json",'Accept': 'application/json' },
				body: JSON.stringify({keyword: this.searchData})
			};
			fetch(`http://web-individual-course-work-2.herokuapp.com/search-lessons`, requestOptions)
				.then(response => response.json())
				.then(data => {
					this.allCourses = data;
				});

		},
		addToCart(lesson){
			let exists = this.cart.includes(lesson)
			lesson.space -= 1;
			if (exists) {
				lesson.reserved += 1;
			}else{
				lesson.reserved += 1;
				this.cart.push(lesson)
			}
			// console.log(JSON.stringify(this.cart));
		},
		sortCourse() {
			if (this.sort == 'assending') {
				switch (this.filter) {
					case 'subject':
							this.allCourses.sort((a, b) => (a.course > b.course) ? 1 : -1)
						break;
					case 'city':
							this.allCourses.sort((a, b) => (a.city > b.city) ? 1 : -1)
						break;
					case 'price':
							this.allCourses.sort((a, b) => (a.price > b.price) ? 1 : -1)
						break;
					case 'availability':
							this.allCourses.sort((a, b) => (a.space > b.space) ? -1 : 1)
						break;
				
					default:
						break;
			}
			}else if (this.sort == 'descending'){
				switch (this.filter) {
					case 'subject':
						this.allCourses.reverse((a, b) => (a.course > b.course) ? 1 : -1)
						break;
					case 'city':
						this.allCourses.reverse((a, b) => (a.city > b.city) ? 1 : -1)
						break;
					case 'price':
						this.allCourses.reverse((a, b) => (a.price > b.price) ? 1 : -1)
						break;
					case 'availability':
						this.allCourses.reverse((a, b) => (a.space > b.space) ? -1 : 1)
						break;
				
					default:
						break;
			}
		}
	},
  }
}
</script>
