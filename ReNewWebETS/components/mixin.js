const myMixin = {
  created: function () {

  },
  methods: {    
    format: function (value,pattern){  
      if (value === undefined) return '';
      let i = 0,
          v = value.toString();            
      return  pattern.replace(/#/g, function(_){
        return v[i++];
      }
        );
    },
    numberWithCommas : function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    href : function (url) {
      location.href=url;
    },
    confirm : function(msg){
        return confirm(msg) != 0;
    },
    todate : function(p){
      var d = new Date();
      var yyyy = d.getFullYear().toString();
        d.setMonth(d.getMonth() + (1 * Number(p === undefined ? 1: p )));
      var mm = d.getMonth().toString()==='0' ? '12' : d.getMonth().toString();
      var dd = d.getDate().toString();  
      return yyyy.concat('-',(mm[1] ? mm : '0'+mm[0]),'-',(dd[1] ? dd : '0'+dd[0]));  
    },
    axios :function (url,params,callback) {

      const urlParams  =  new URLSearchParams();      
      Object.keys(params).forEach(function(key){
          urlParams.append(key,params[key]);
      });
            axios.post(url,urlParams )
            .then(function(response){     
                callback(response)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            }); 
    }, 
    fetch :function(url,params,callback)  {

      const urlParams  =  new URLSearchParams();
      Object.keys(params).forEach(function(key){
          urlParams.append(key,params[key]);
      });
      
         fetch(url,  {
              method: 'POST',
              headers: {
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
              },  
              body : urlParams
              }).then( function(response) {
                console.log('1',response.text())
              }).then( function(response) {
                console.log('2',response)
              });         
    }, 
    parseQueryString : function(url) {
      var a = window.location.search.substr(1).split('&');
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i) {
          var p = a[i].split('=', 2);
          if (p.length == 1)
              b[p[0]] = "";
          else
              b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
    }        
  }
}