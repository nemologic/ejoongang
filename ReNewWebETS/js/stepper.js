

var Stepper = {
  template: `<Ul class="stepper-header">
                <li> 
                    <a href="#">
                    <span class="circle">1</span>
                    <span class="label">간소화 등록</span>
                    </a>
                </li>
                <li> 
                    <a href="#">
                        <span class="circle">2</span>
                        <span class="label">매매체결</span>
                    </a>
                </li>
                <li> 
                    <a href="#">
                        <span class="circle">3</span>
                        <span class="label">매매체결</span>
                    </a>
                </li>
                <li> 
                    <a href="#">
                        <span class="circle">4</span>
                        <span class="label">매매체결</span>
                    </a>
                </li>                      
            </Ul>`
}


new Vue({
  el: '#vue-app',
  data: function () {
    return {
    	images: [
            '<div class="example-slide"><img src="https://www.agromarket.kr/images/nfris/main/bg_visual01.jpg" alt=""></div>',
            '<div class="example-slide"><img src="https://www.agromarket.kr/images/nfris/main/bg_visual02.jpg" alt=""></div>',
          ],
        customClass: {
      	size: 'big-font-size',
        color: 'font-color-red'
      }
    }
  },
  components: {
    // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
    'my-stepper': Stepper 
  }
})