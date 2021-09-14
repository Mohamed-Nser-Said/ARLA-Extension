function sliderButton() {
    let i=1;

    let left_btn = document.getElementById("left-btn");
    let right_btn = document.getElementById("right-btn");

    left_btn.addEventListener('click', function (e){
        if (i>1){
            document.getElementById(`card-${i}`).setAttribute("class", "hide");
            i-=1;
            document.getElementById(`card-${i}`).setAttribute("class", "card-container");

        }
    }, false);

    right_btn.addEventListener('click', function (e ){

        if (i<5){
            document.getElementById(`card-${i}`).setAttribute("class", "hide");
            i+=1;
            document.getElementById(`card-${i}`).setAttribute("class", "card-container");

        }
    }, false);


}

sliderButton()
