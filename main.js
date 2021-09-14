

class Device {

    static get isMobile(){
        document.write(navigator.userAgent)
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

}

console.log(Device.isMobile)

class EasyBlocker{ // this class block some of the browser features
    constructor() {
        this.setup()
        this.tab_change_num = 0
        this.pointer_conter = null
    }

    setup(){
        this.googleTranslateBlocker()
        this.EventCapture()
        this.tabChangedDetector()
        this.pointerDetector()
        this.pagePrintBlocker()
        this.windowSizeTracker()
    }


    windowSizeTracker(){



        window.addEventListener('resize', (e) => {

            let widthRation = window.outerWidth/window.screen.width
            let heightRation = window.outerHeight/window.screen.height


            document.getElementById("window-size-par").innerText=
                `
                Screen Width = ${window.screen.width}Px
                Window Width = ${window.outerWidth}Px
                Width Percentage = ${widthRation}%
                
                
                Screen height = ${window.screen.height}Px
                Window height = ${window.outerHeight}Px         
                height Percentage = ${heightRation}%
                
                orientation = ${screen.orientation.angle}
                
               
            
                `


        })}


    pointerDetector(){
        let self = this;
        const para = document.querySelector('html');
        const card_warning = document.getElementById("card-3");

        para.addEventListener('pointerleave', (e) => {
           self.pointer_conter++;
            // new Notification("You MUST NOT LEAVE THE EXAM, IF YOU DO NOT BACK IN 10 SECOND THE EXAM WILL " +
            //     "BE CANCELED");
            // alert("hi")
            card_warning.classList.add("warning");
           showInfo();

        });

        para.addEventListener('pointerover', (event) => {
            card_warning.classList.remove("warning")



    })}

    pagePrintBlocker(){
        window.addEventListener('beforeprint', (event) => {
            let bodyElem = document.getElementsByTagName("body")[0];
            bodyElem.setAttribute("class", "hide");
        });


        window.addEventListener('afterprint', (event) => {
            let bodyElem = document.getElementsByTagName("body")[0];
            bodyElem.removeAttribute("class")
        });

    }

    googleTranslateBlocker() {
        // blocking Google translator
        let htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.setAttribute("translate", "no");
    }

    EventCapture(){

        // temp function to handle and receive the events and show an alert
        function notificationAlert(e, operation) {
            alert(`Sorry ${operation} is not Allowed`);
            e.preventDefault();

            if (operation=="Copy" || operation=="Drag"){
                document.getElementById("no_copy").classList.add("copy-warning")
                setTimeout(()=>{document.getElementById("no_copy").classList.remove("copy-warning")}, 300)


            }

            else if(operation=="Right Click"){
                document.getElementById("img--").classList.add("copy-warning")
                setTimeout(()=>{document.getElementById("img--").classList.remove("copy-warning")}, 300)

            }
        }

        // blocking right click for any images that has the class name *right-click-img-block*
        let images = document.getElementsByClassName("right-click-block");
        for (const img of images) {
            img.addEventListener('contextmenu', function (e){notificationAlert(e, "Right Click")}, false);
        }

        // blocking copy and drag features for any elements that has the class name *no_copy*
        let copy_elm = document.getElementsByClassName("no_copy");
        for (const ele of copy_elm) {
            ele.addEventListener('copy', function (e){notificationAlert(e,"Copy")}, false);
            ele.addEventListener('dragstart', function (e ){notificationAlert(e, "Drag")}, false);
        }}

    tabChangedDetector() {
        //  this event fires when ever the user changes the tab*
        let self = this;
        function EventHandler(e) {
            self.tab_change_num++
            showInfo()
            alert(`Tab has changed${e}`);
        }

        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState == "visible") {
                EventHandler(event)

            }
            // else if (document.visibilityState == "hidden"){alert('thanks')}

        })



}}



function showInfo() {
    const output = document.getElementById('output');
    output.innerText = `
        Pointer Out:    ${block.pointer_conter}
        Tab Changed:    ${block.tab_change_num}
        `}





let block = new EasyBlocker()



