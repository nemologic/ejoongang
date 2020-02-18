
Vue.component('auto-complete', {
     template : `<div class="autocomplete" >
                    <input type="hidden" :required="required" v-model="value" />
                    <input  style="width:100%;"
                    @click=" isOpen = true"
                    type="text"
                    :required="required"
                    @input="onChange"
                    v-model="search"
                    @keydown.down="onArrowDown"
                    @keydown.up="onArrowUp"
                    @keydown.enter="onEnter"
                    @keydown.esc=" onClear "
                    />
                    <ul 
                    id="autocomplete-results"
                    v-show="isOpen"
                    class="autocomplete-results"
                    v-bind:style="{ width: resultWidth }"
                    >
                    <li
                        class="loading"
                        v-if="isLoading"
                    >
                        Loading results...
                    </li>
                    <li
                        v-else 
                        v-for="(result, i) in results"
                        :key="i"
                         @click="setResult(result)"
                         class="autocomplete-result"
                        :class="{ 'is-active': i === arrowCounter }"
                    >
                       <span>{{result[codeValue].trim()}}</span> {{ result[nameValue].trim()}}
                    </li>
                    </ul>
                </div>`,
    props: {
      itemCode : {
        type: String,
        required: false,
        default: "",
      },
      src: {
        type: String,
        required: false,
        default: "",        
      },
      params: {
        type: Object,
        required: false,
        default: null,
      },
      datas: {
        type: Array,
        required: false,
        default: () => [],
      },
      isAsync: {
        type: Boolean,
        required: false,
        default: false,
      },
      codeValue : {
        type: String,
        required: false,
        default: "code",
      },
      nameValue : {
        type: String,
        required: false,
        default: "name",
      },
      width : {
        type: String,
        required: false,
        default: "",
      },
      resultWidth : {
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
        results: [],
        result : {},
        search: '',        
        isLoading: false,
        arrowCounter: 0,
        value : '',
      };
    },

    methods: {
      getSource() {                        
         let params = null;
         if(this.params !== null){
            params  =  new URLSearchParams();
            Object.keys(this.params).forEach((key)=>{
                params.append(key,this.params[key]);
            }); 
          }
        axios.post(this.src,params)
        .then(response => {
          this.items= response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });  


      },
      onChange() {
        if (this.isAsync) {
          this.isLoading = true;
        } else {
          // Let's  our flat array
          this.filterResults();
          this.isOpen = true;
        }
      },

      filterResults() {
        // first uncapitalize all the things
        this.results = this.items.filter((item) => {
          let words = item[this.codeValue].concat(item[this.nameValue])
          return words.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        });
      },
      setResult(result) {
        console.log('result',result)
        this.search = result[this.nameValue];
        this.value = result[this.codeValue];
        this.result = result;
        this.result.require = this.require;
        this.isOpen = false; 
        this.$emit('return-value',result);
      },
      onArrowDown(evt) {     
        if (this.arrowCounter < this.results.length) {
            this.arrowCounter = this.arrowCounter + 1;
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
            this.arrowCounter = this.arrowCounter -1;
        }
      },
      onEnter() {     
        if (this.results[this.arrowCounter] === undefined ) return;
        this.search = this.results[this.arrowCounter][this.nameValue];
        this.result = this.results[this.arrowCounter];
        this.isOpen = false;
        this.arrowCounter = -1;
      },
      onClear() {
        this.search = '';
        this.result = {};
        this.arrowCounter = 0;
      },
      handleClickOutside(evt) {
        if (!this.$el.contains(evt.target)) {
          this.isOpen = false;
          this.arrowCounter = -1;
        }
      },    
      init() {
          if(this.itemCode !=='' ) {
             this.items.some((item)=>{                
                if( item[this.codeValue] ===  this.itemCode) {
                  this.setResult(item) ;
                  return true;
                }
             });
          }
      }      
    },
    watch: {
      items: function (val, oldValue) {
        if (val.length !== oldValue.length) {
            this.results = val;
            this.isLoading = false;
            this.init();
        }
      },
    
    },
    
    
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
      this.src.trim() !== "" &&  this.getSource();
    },
    destroyed() {
      document.removeEventListener('click', this.handleClickOutside)
    }
      
})