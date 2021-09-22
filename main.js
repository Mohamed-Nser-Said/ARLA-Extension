

class Device {

    static get isMobile(){
        document.write(navigator.userAgent)
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    static permission(type){
        navigator.permissions.query({name:type}).then( result => {
            return result.state
        })

    }}


class WindowManager{

    constructor() {
        this.setup()
        this.tab_change_num = 0
        this.pointer_conter = null
    }

    setup(){
        this.visibilityChangedDetector()
        this.pointerDetector()
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

        document.addEventListener('pointerleave', (e) => {

            // if (!document.hasFocus())
            {
                this.pointer_conter++;
                pointerDetectorSlidAnimation(this.pointer_conter, this.tab_change_num, true);
            }

        });

        document.addEventListener('pointerover', (event) => {
            pointerDetectorSlidAnimation(this.pointer_conter, this.tab_change_num, false);

        })}

    visibilityChangedDetector() {
        //  this event fires when ever the user changes the tab*
        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState == "visible") {
                this.tab_change_num++
                pointerDetectorSlidAnimation(this.pointer_conter, this.tab_change_num, true)
            }
        })



    }

}


class EventBlocker{ // this class block some of the browser features
    constructor() {
        this.setup()
    }

    setup(){
        this.googleTranslateBlocker()
        this.clipboardEventCapture()
        this.pagePrintBlocker()
        this.rightClickEventCapture()
    }


    googleTranslateBlocker() {
        // blocking Google translator
        let htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.setAttribute("translate", "no");
    }

    rightClickEventCapture(target="right-click-block"){

        // blocking right click for any element that has the class name *right-click-img-block*
        let elements = document.getElementsByClassName(target);
        for (const elm of elements) {
            elm.addEventListener('contextmenu',  e =>{
                notificationAlert("Right Click")
                e.preventDefault()}, false);
        }

    }

    clipboardEventCapture(target="no_copy"){

        // blocking copy and drag features for any elements that has the class name *no_copy*
        let copy_elm = document.getElementsByClassName(target);
        for (const ele of copy_elm) {
            ele.addEventListener('copy',  e=> {
                    e.preventDefault()
                notificationAlert("Copy")
                }, false);

            ele.addEventListener('dragstart',  e =>{
                e.preventDefault()
                notificationAlert("Drag")}, false);
        }
    }

    pagePrintBlocker(){
        let bodyElem = document.getElementsByTagName("body")[0]
        window.addEventListener('beforeprint', (event) => {
            bodyElem.setAttribute("class", "hide");
        });

        window.addEventListener('afterprint', (event) => {
            bodyElem.removeAttribute("class")
        });

    }

}




function notificationAlert(operation) {
// temp function to handle and receive the events and show an alert
    if (operation=="Copy" || operation=="Drag"){
        document.getElementById("no_copy").classList.add("copy-warning")
        setTimeout(()=>{document.getElementById("no_copy").classList.remove("copy-warning")}, 300)


    }

    else if(operation=="Right Click"){
        document.getElementById("img--").classList.add("copy-warning")
        setTimeout(()=>{document.getElementById("img--").classList.remove("copy-warning")}, 300)

    }

}



function pointerDetectorSlidAnimation(pointerNum, tabNum, warning) {
// temp function for slides
    const card_warning = document.getElementById("card-3");
    const output = document.getElementById('output');
    if(warning){
        card_warning.classList.add("warning");

    }else if(!warning){
        card_warning.classList.remove("warning");
    }

    output.innerText = `
        Pointer Out:    ${pointerNum}
        Visibility count:    ${tabNum}
      
        `
    // new Notification("You MUST NOT LEAVE THE EXAM, IF YOU DO NOT BACK IN 10 SECOND THE EXAM WILL " +
    //     "BE CANCELED");
}






new EventBlocker()
new WindowManager()



