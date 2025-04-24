(() =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");
    
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    
    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
         document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }

    // attach an event handelar to document-----
 document.addEventListener("click", (event) =>{
     if(event.target.classList.contains('link-item')){


         if(event.target.hash !==""){

            event.preventDefault();
            const hash = event.target.hash;
            
            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");

            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");

            navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
            navMenu.querySelector(".active").classList.remove("active","inner-shadow");

            // if click the link item is contained
            if(navMenu.classList.contains("open")){
               event.target.classList.add("active","inner-shadow");
               event.target.classList.remove("outer-shadow","hover-in-shadow");

                hideNavMenu();
                
            }
            else{
                let navItems = navMenu.querySelectorAll(".link-item");
                navItems.forEach((item) =>{
                    if(hash === item.hash){
                        item.classList.add("active","inner-shadow");
                        item.classList.remove("outer-shadow","hover-in-shadow");                      
                    }
                })
                fadeOutEffect();
            }
            // add hash (#) to url
            window.location.hash = hash;
         }
     }

 })


    
    })();
    






(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");


    tabsContainer.addEventListener("click", (event) =>{

        if(event.target.classList.contains("tab-item") &&
        ! event.target.classList.contains("active")){

            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", 
            "active");
            event.target.classList.add("active","outer-shadow");
            
                        // //deactivate tab-content
                        aboutSection.querySelector(".tab-content.active").classList.remove("active");

                        //activate new tab content'
                       aboutSection.querySelector(target).classList.add("active");

        }

    })
})();



function  bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}



/*--------------------------portfolio filter and popup-------------------------*/

(() =>{

    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;


    //filter portfolio item
    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            //deactivate filter
          filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            //activate filter
            event.target.classList.add("active","outer-shadow");
            const target = event.target.getAttribute("data-heading");
            portfolioItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })


    portfolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            
            //get the portfolioitem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // convert screen short into a array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetailsToggle();
        }
    })

           closeBtn.addEventListener("click", () =>{
            popupToggle();
           })

           function popupToggle(){
           popup.classList.toggle("open");
           bodyScrollingToggle();
           }

           function popupSlideshow(){
                const imgSrc = screenshots[slideIndex];
                const popupImg = popup.querySelector(".pp-img");

                // loader activate
                popup.querySelector(".pp-loader").classList.add("active");
                popupImg.src=imgSrc;
                popupImg.onload = () =>{
                popup.querySelector(".pp-loader").classList.remove("active");    
                }
                popup.querySelector(".pp-counter").innerHTML = (slideIndex=1)
                + " of " + screenshots.length;
           }

        //    next slide

        nextBtn.addEventListener("click", () =>{
            if(slideIndex === screenshots.length-1){
                slideIndex = 0;
            }
            else{
                slideIndex++;
            }
            popupSlideshow();
            
        })
 
        prevBtn.addEventListener("click", () =>{
            if(slideIndex === 0){
                slideIndex = screenshots.length;
            }
            else{
                slideIndex--;
            }
            popupSlideshow();
            
        })

        projectDetailsBtn.addEventListener("click",() =>{
            popupDetailsToggle();
        })
        function popupDetailsToggle(){
            if(projectDetailsContainer.classList.contains("active")){

                projectDetailsContainer.classList.remove("active");
                projectDetailsContainer.style.maxHeight = 0 + "px";
            }
            else{

                projectDetailsContainer.classList.add("active");
                projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
                popup.scrollTo(0,projectDetailsContainer.offestTop);
            }
        }

})();




//section start----------------------------------------


  (() =>{
    const sections = document.querySelectorAll(".section");
     sections.forEach((section) =>{
         if(!section.classList.contains("active")){
             section.classList.add("hide")
         }
     })


     })();



 