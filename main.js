

class EasyBlocker{ // this class block some of the browser features
    constructor() {
        this.googleTranslateBlocker()
        this.copyEventCapture()
        this.tabChangedDetector()
        this.pointerDetector()
        this.tab_change_num = 0
        this.pointer_conter = null
        this.pointer_in = null
    }

    pointerDetector(){
        let self = this;
        const para = document.querySelector('body');

        para.addEventListener('pointerleave', (event) => {
           self.pointer_conter++;
           showInfo();
           self.pointer_in=false;
           self.timer();

        });

        para.addEventListener('pointerover', (event) => {
            self.pointer_in=true;
            self.timer();


    })}

    googleTranslateBlocker() {
        // blocking Google translator
        let htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.setAttribute("translate", "no");
    }

    copyEventCapture() {
        //  copy or cut blocked for any HTML elements that has a class called *(no_copy)*
        let copy_elm = document.getElementsByClassName("no_copy");

        function copyEventHandler(e, operation) {
            alert(`Sorry ${operation} is not Allowed`);
            e.preventDefault();}

        for (const ele of copy_elm) {
            ele.addEventListener('copy', function (e){copyEventHandler(e, "Copy")}, false);
            ele.addEventListener('contextmenu', function (e){copyEventHandler(e, "Right Click")}, false);
            ele.addEventListener('dragstart', function (e ){copyEventHandler(e, "Drag")}, false);
        }}

    tabChangedDetector() {
        //  this event fires when ever the user changes the tab*
        let self = this;

        function EventHandler(e) {
            self.tab_change_num++
            showInfo()
            // alert(`do not change the tab ${e}`);
        }

        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState == "visible") {
                EventHandler(event)

            }
            // else if (document.visibilityState == "hidden"){alert('thanks')}

        })

        }

    timer(){
        let t=0;
        // while(!this.pointer_in){
        //     t++;
        //     setTimeout(()=>{
        //         document.getElementById("timer").textContent=t.toString();
        //
        //     },1000)
        }
        // const countDownDate = new Date().getTime() + 10000;
        // let self =this
        // if(self.pointer_in){
        //     let x = setInterval(function() {
        //         let now = new Date().getTime();
        //         let distance = countDownDate - now;
        //
        //
        //         if (distance < 0) {
        //             clearInterval(x);
        //             document.getElementById("timer").textContent = "EXPIRED";
        //         } else if(self.pointer_in){
        //             clearInterval(x)
        //             document.getElementById("timer").textContent = "Pointer Back";
        //         }
        //
        //     }, 1000);
    // }

}


class ApplicantInfo {
    constructor(name = 'no given name') {
        this.name = name;
        this.language = navigator.language;
        this.location = null;
        this.findLocation()
    }

    findLocation(){
        let self = this

        navigator.geolocation.getCurrentPosition(setLocation)

        function setLocation(pos) {
            self.location = `longitude: ${pos.coords.longitude}, latitude: ${pos.coords.latitude}`
        }
    }
}


function showInfo() {
        const output = document.getElementById('output');
        output.innerText = `
        
        location: ${applicant.location}
        language: ${applicant.language} 
        tab changed: ${block.tab_change_num}
        pointer out: ${block.pointer_conter}
        
        `
    }






let block = new EasyBlocker()
let applicant = new ApplicantInfo()

showInfo()





