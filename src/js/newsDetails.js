import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: "newDetails",
    data () {
        return {
            postId: 0,
          posts: {},
            viewCount:0,
        }
  },
     computed :{
        ...mapGetters(["getToken","getUserData"])
    },
    methods: {
        loadPost (id) {
             let post = {
                 postId: id,
  
            };
            
            axios.post('http://127.0.0.1:8000/api/post/details',post).then((response)=>{
                console.log(response.data.post);
                if(response.data.post.image != 'imgDef.avif'){
                     response.data.post.image = "http://127.0.0.1:8000/postImage/" + response.data.post.image;
                   }
                   else{
                     response.data.post.image = "http://127.0.0.1:8000/defaultImage/imgDef.avif";
                   }
               this.posts =response.data.post;
           
            });
           // console.log(this.posts);
            
        },
        back() {
             this.$router.push({
              name: "home",             
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
      viewCountLoading() {
              let data = {
          user_id: this.getUserData.id,
          post_id:this.$route.query.newsId,
        };
     
         axios.post('http://127.0.0.1:8000/api/post/actionLog',data).then((response)=>{
           this.viewCount = response.data.post.length;
            });
        
          }
    },
  mounted() {
    // console.log(this.getUserData);
    this.viewCountLoading();
        this.postId = this.$route.query.newsId;
        this.loadPost(this.postId);
    }
};