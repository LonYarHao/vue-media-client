import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            userData: {
                email: "",
                password : "",
            },
            tokenStatus: false,
             userStatus: false,
        }
    },
    computed :{
        ...mapGetters(["getToken","getUserData"])
    },
    methods: {
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
        accountLogin() {
            //console.log(this.userData);
             axios.post('http://127.0.0.1:8000/api/user/login',this.userData).then((response)=>{
                 //   
                 if (response.data.token == null) {
                     // console.log("there is no user")
                     this.userStatus = true;
                 } else {
                     // console.log("Log In success");
                     this.userStatus = false;
    
                     this.$store.dispatch("setToken", response.data.token);
                     this.$store.dispatch("setUserToken", response.data.user);
                     this.home();
                 }
                
                });
        },
       
    }
};