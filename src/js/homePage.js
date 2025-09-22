import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
        name : "HomePage",

        data(){
          return {
            postLists : {},
            categoryLists: {},
            searchKey: "",
            tokenStatus: false,
          }; 
        },
        computed :{
            ...mapGetters(["getToken","getUserData"])
        },

         
        methods:{
             getAllPost(){
                   axios.get('http://127.0.0.1:8000/api/getAllPost')
            .then((response) =>{
               for( let i=0 ; i < response.data.post.length; i++){
                   if(response.data.post[i].image != 'imgDef.avif'){
                     response.data.post[i].image = "http://127.0.0.1:8000/postImage/" + response.data.post[i].image;
                   }
                   else{
                     response.data.post[i].image = "http://127.0.0.1:8000/defaultImage/imgDef.avif";
                   }
               }
               //console.log(response.data.post);
               this.postLists =response.data.post;
            });
              
             },
             loadCategory(){
                axios.get('http://127.0.0.1:8000/api/getAllCategory').then((response)=>{
                  // console.log(response.data)
                  this.categoryLists = response.data.category;
                });
          },
          search() {
            let search = {
              key: this.searchKey,
            };
            
            axios.post('http://127.0.0.1:8000/api/post/search',search).then((response)=>{
             // console.log(response.data.searchData);
                 for( let i=0 ; i < response.data.searchData.length; i++){
                   if(response.data.searchData[i].image != 'imgDef.avif'){
                     response.data.searchData[i].image = "http://127.0.0.1:8000/postImage/" + response.data.searchData[i].image;
                   }
                   else{
                     response.data.searchData[i].image = "http://127.0.0.1:8000/defaultImage/imgDef.avif";
                   }
               }
               
               this.postLists =response.data.searchData;
                });
          },
          categorySearch(searchKey) {
             let search = {
              key: searchKey,
            };
            //console.log(searchKey);
            axios.post('http://127.0.0.1:8000/api/category/search',search).then((response)=>{
              //console.log(response.data);
               for( let i=0 ; i < response.data.result.length; i++){
                   if(response.data.result[i].image != 'imgDef.avif'){
                     response.data.result[i].image = "http://127.0.0.1:8000/postImage/" + response.data.result[i].image;
                   }
                   else{
                     response.data.result[i].image = "http://127.0.0.1:8000/defaultImage/imgDef.avif";
                   }
               }
               
               this.postLists =response.data.result;
               
                });
          },
          newDetails(id) {
            console.log(id);
            this.$router.push({
              name: "newsDetails",
              query: {
                newsId : id,
              },
            });
          },
          home() {
            this.$router.push({
               name:"home",
            });
          },
          login() {
            this.$router.push({
               name:"login",
            });
          },
          logout() {
            this.$store.dispatch("setToken", null);
            console.log(this.getToken);
            this.login();
          },
          checkToken() {
            if (this.getToken != null && this.getToken != undefined && this.getToken != "") {
              this.tokenStatus = true;
            } else {
              this.tokenStatus = false;
                  }
                },
  },
  
  mounted() {
    this.checkToken();
    this.getAllPost();  
    this.loadCategory();
                  
        },
    }