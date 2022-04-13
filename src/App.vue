<template>
<!-- eslint-disable  -->
  <div class="container">
	  	<Lessons :allCourses="allCourses"/>
		  
	</div>
</template>

<script>
import Lessons from './components/Lessons.vue'

export default {
	/* eslint-disable */ 
	name: 'App',
	components: {
		Lessons
	},
  	data() {
		return{
			projectName: 'Here will be the project name.',
			allCourses: [],
			// errors: {
			// 	phone: '',
			// 	name: ''
			// },
			// filter: '',
			// sort: '',
			// searchData: '',
			// checkout: false,
			// name: '',
			// phone: '',
			// successAlert: false,
			// isValid: false,
		}
	},
	mounted() {
		this.getAllCourses();
	},
	computed: {},
	methods: {
		getAllCourses(){
			fetch(`https://web-individual-course-work-2.herokuapp.com/get-lessons`)
			.then(response => response.json())
			.then(data => {
				this.allCourses = data;
			});
		},
		

		// filterCourses(){
		//     let data = [];
		//     this.lessons.forEach(el => {
		//         let name = el.course.toLowerCase();
		//         let city = el.city.toLowerCase();
		//         if (name.includes(this.search) || city.includes(this.search)) {
		//             data.push(el)
		//         }
		//         this.allCourses = data;
		//     });
		// },
	},
}
</script>

