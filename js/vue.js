new Vue({
  el:'#vue-app',
   data() {
     return {
       active: 0,
       tableData: [{
       date: '2016-05-03',
       name: 'Tom',
       address: 'No. 189, Grove St, Los Angeles'
     }, {
       date: '2016-05-02',
       name: 'Tom',
       address: 'No. 189, Grove St, Los Angeles'
     }, {
       date: '2016-05-04',
       name: 'Tom',
       address: 'No. 189, Grove St, Los Angeles'
     }, {
       date: '2016-05-01',
       name: 'Tom',
       address: 'No. 189, Grove St, Los Angeles'
     }]
     };
   },

   methods: {
     next() {
       if (this.active++ > 4) this.active = 0;
     }
   }
 });