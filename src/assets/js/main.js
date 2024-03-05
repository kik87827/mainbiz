
function mcTab(){
    const mc_linkage_menu = document.querySelectorAll(".mc_linkage_menu");
    const mc_linkage_dot = document.querySelectorAll(".mc_linkage_dot");
    const mb_linkage_swiper = document.querySelector(".mb_linkage_swiper");
    const mb_linkage_slide = mb_linkage_swiper.querySelectorAll(".swiper-slide");
    let mb_linkage_obj = null;
    let slide_current_index = 0;
    let windowWidth = window.innerWidth;
    if(!!mc_linkage_menu){
        mc_linkage_menu.forEach((item, index)=>{
            item.addEventListener("click",(e)=>{
                e.preventDefault();

                const eventTarget = e.currentTarget;
                const contentTarget = document.querySelector(eventTarget.dataset.target);
                const contentTargetParent = contentTarget.closest(".mc_linkage_contents_cols");
                const contentTargetNot = contentTargetParent.querySelectorAll(".mc_linkage_contents");
                dotFunc(index);

                slide_current_index = index;

                mc_linkage_menu.forEach((item)=>{
                    if(eventTarget !== item){
                        item.classList.remove("active");
                    }
                });
                eventTarget.classList.add("active");
                if(!!contentTarget){
                    contentTargetNot.forEach((item)=>{
                        item.classList.remove("active");
                    });
                    contentTarget.classList.add("active");
                }
            });
        });

        
    }
    if(!!mc_linkage_dot){
        mc_linkage_dot.forEach((item, index)=>{
            item.addEventListener("click",(e)=>{
                e.preventDefault();
                const triggerEvent = new MouseEvent("click");
                mc_linkage_menu[index].dispatchEvent(triggerEvent);
            });
        });
    }
    if(!!mb_linkage_swiper){
        if(mb_linkage_slide.length>1){
            if(mb_linkage_obj !== null){
                mb_linkage_obj.update();
                mb_linkage_obj.slideTo(slide_current_index);
            }else{
                if(window.innerWidth < 768){
                    mbFunc();
                }
                //slideObj.update();
    
                window.addEventListener("resize",()=>{
                    if(windowWidth !== window.innerWidth){
                        if(mb_linkage_obj !== null){
                            mb_linkage_obj.destroy();
                        }
                        if(window.innerWidth < 768){
                            mbFunc();
                        }
                    }
                    windowWidth = window.innerWidth;
                });
                /* mb_linkage_obj = new Swiper(".mb_linkage_swiper", {
                    speed : 1000, 
                    initialSlide: slide_current_index,
                    pagination: {  
                        el: ".mb_linkage_swiper .swiper-pagination",
                        clickable: true
                    },
                    keyboard: {
                        enabled: true,
                    }
                }); */
            }
        }else{
            if(!!mb_linkage_swiper){
                mb_linkage_swiper.classList.add("nodata_type");
            }
        }
    }

    function triggerEvent(){
        const mc_linkage_menu_active = document.querySelector(".mc_linkage_menu.active");
        if(!!mc_linkage_menu_active){
            let triggerEvent = new MouseEvent("click");
            mc_linkage_menu_active.dispatchEvent(triggerEvent);
        }
    }

    function mbFunc(){
        mb_linkage_obj = new Swiper(".mb_linkage_swiper", {
            speed : 1000, 
            initialSlide: slide_current_index,
            pagination: {  
                el: ".mb_linkage_swiper .swiper-pagination",
                clickable: true
            },
            keyboard: {
                enabled: true,
            }
        });

        mb_linkage_obj.on("slideChange",()=>{
            document.querySelectorAll(".mc_linkage_menu")[mb_linkage_obj.realIndex].classList.add("active");
            triggerEvent();
        })
    }

    function dotFunc(current){
        if(!!mc_linkage_dot){
            mc_linkage_dot.forEach((item,index)=>{
                if(mc_linkage_dot[current] !== item){
                    item.classList.remove("active");
                }
            });
            mc_linkage_dot[current].classList.add("active");
        }
    }

    /* 
    function mainProductType144(){
	let slideObj = null;
	let swiperParentText = '.swiper-product-144';
	let swiperParent = document.querySelector(swiperParentText);
	let swiperSlide = document.querySelectorAll(swiperParentText+" .swiper-slide");
	if(swiperSlide.length>1){
		if(slideObj !== null){
			slideObj.update();
		}else{
			slideObj = new Swiper(swiperParentText, {
				speed : 1000, 
				loop : true,
				pagination: {  
					el: swiperParentText+" .swiper-pagination",
					clickable: true
				}
			});
		}
	}else{
		if(!!swiperParent){
			swiperParent.classList.add("nodata_type");
		}
	}
}
     */
}


