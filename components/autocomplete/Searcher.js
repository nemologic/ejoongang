Vue.component('searcher', {
     template : `  <div class="searcher">  
                    <input text="text" readonly 
                    @click = "onOpen" v-model="params.name"   :required="required"/>
                 <div class="searcher-mask" v-if="isOpen">                
                  <div class="searcher-wrapper" >
                    <div class="searcher-container">
                    <div class="searcher-titlebar">
                       <label>{{title}}</label>
                       <button  @click="onClose"  type="button">
                       x
                     </button>
                       </div>
                      <div class="searcher-header" style="padding: 20px 30px;">
                        <slot name="header">                                                 
                           <p>
                              <label for='inputName'>생산자명</label>
                              <input name="inputName" id="inputName" ref="input" type="text" v-model="params.name" @keydown.enter="search" />
                              <label for='inputCode'>신고번호</label>
                              <input name="inputCode" id="inputCode" type="text"  v-model="params.code"  @keydown.enter="search"/>
                            </p>                                                                    
                              <button  @click="search" :class="{disabled : true}" type="button">검색</button>                          
                        </slot>
                      </div>

                      <div class="searcher-body">
                        <slot name="body">
                          <div class="loader" v-if="isLoading"></div>
                          <p>
                          <table>
                            <thead>
                            <tr>
                              <th>출하신고코드</th>
                              <th>생산자명</th>
                              <th>생년월일</th>
                              <th>선택</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for=" (index) in items">
                                <td>{{index.code.substring(0,6).concat('-',index['code'].substring(6,12))}}</td>
                                <td>{{index.name}}</td>
                                <td>{{index.birth}}</td>
                                <td> <button  v-if="index.code !== null && index.code.length === 12" @click="onSelect(index)" type="button">선택</button> </td>
                              </tr>
                            </tbody>
                          </table>
                          </p>
                        </slot>
                      </div>

                      <div class="searcher-footer">
                        <slot name="footer">                                                                   
                        </slot>
                      </div>                      
                    </div>
                  </div>
                </div>
                </div>`,
    props: {
      value : {
        type: String,
        required: false,
        default: "",
      },
      title: {
        type: String,
        required: false,
        default: "제목없음",
        
      },
      src: {
        type: String,
        required: false,
        default: "",
        
      },
        
      width : {
        type: String,
        required: false,
        default: "",
      }, 
      required : {
        type: Boolean,
        required: false,
        default: false,
      }    
    },

    data() {
      return {
        items: [],
        isOpen: false,
        isLoading : false,
        params : {kind:'R',code:'',name:this.value},
      };
    },

    methods: {
      getSource() {                        
         let params = null;
         this.isLoading = true;
         if(this.params !== null){
            params  =  new URLSearchParams();
            Object.keys(this.params).forEach((key)=>{
                params.append(key,this.params[key]);
            }); 
          }
        axios.post(this.src,params)
        .then(response => {
          this.items= response.data;
          this.isLoading = false;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });  
      },    
      onOpen (){
         this.params.codde = "";
         this.isOpen = true;
      },
      onClose() {
        this.isOpen = false;
        this.$emit('close');
      },  
      onSelect(person){
        this.isOpen = false;
        person.require = this.require;
        this.params.name = person.name;
        this.$emit('return-value',person);
      },      
      onEnter() {     
        
      },
      search(e) {
       e.preventDefault();
        if(this.params.name.length >= 2 || this.params.code.length >= 11 ) {
           this.getSource();
        }
      },    
    },
    watch: {
      params: {
        deep: true,  
        handler(){
          this.params.code= this.params.code.replace('-','');
        }
      }
      
    },
    
    
    mounted() {     
    },
    destroyed() {
     

    }
      
})