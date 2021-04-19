//https://www.youtube.com/watch?v=F8xQ5joLlD0&list=PL-Jc9J83PIiFj7YSPl2ulcpwy-mwj1SSk
//https://www.youtube.com/playlist?list=PL-Jc9J83PIiFj7YSPl2ulcpwy-mwj1SSk

const puppeteer = require("puppeteer");
let page;

let url = process.argv[2];
(async function () {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  let pages = await browser.pages();

  page = pages[0];
  await page.goto(url);
  
  let reqTime = await page.evaluate(async function(){
    function hmsToSecondsOnly(str){
      var p=str.split(":"),
      s=0,
      m=1;
      while(p.length>0){
        s+=m*parseInt(p.pop(), 10);
        m*=60;
      }
      return s;
    }
    
    
    let tVids = document.querySelector(
      "#stats .style-scope.yt-formatted-string"
     );

     
     let totalNoOfVids=Number(tVids.innerText);
     //console.log(totalNoOfVids);
     let scrolls=Math.ceil(totalNoOfVids/100);

     let tVal= await new Promise(
      function(resolve,reject){
         
      let interval=setInterval(function(){


        let vids = document.querySelectorAll(
          ".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer"
          );

    //console.log(1);
    vids[vids.length-1].scrollIntoView();

    if(Math.ceil(vids.length/100)==scrolls) {clearInterval(interval);
    let timeArr=document.querySelectorAll("span.style-scope.ytd-thumbnail-overlay-time-status-renderer");
    let totalTime=0;
    for(let i=0;i<timeArr.length;i++){
      totalTime+=hmsToSecondsOnly(timeArr[i].innerText);
    }
    console.log(totalTime/(60*60));
    resolve(totalTime/(60*60));
  }
},5000);
//   return tVids.innerText;
   }
     );
  return tVal;
});
// let remainingScrolls=Math.ceil(nOfVids/100)-1;
// console.log(remainingScrolls);
console.log(reqTime);
})();