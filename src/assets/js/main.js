
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



function mainVisual(){
    let mv_swiper_obj = null;
    const mv_parent = document.querySelector(".mv_zone");
    const mv_container = document.querySelector(".mv_container");
    const mv_slide = !!mv_parent ? mv_parent.querySelectorAll(".swiper-slide") : null;
    const mv_auto_control = document.querySelector(".mv_zone .btn-autoplay");
    if (mv_slide.length>1) {
        mv_parent.classList.add("active");
        if (!!mv_swiper_obj) {
            mv_swiper_obj.update();
        } else {
            mv_swiper_obj = new Swiper(".mv_container",{
                speed : 800,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".mv_zone .swiper-pagination",
                    clickable: true
                },
                keyboard: {
                    enabled: true,
                },
            });
        }
        let accAutoText = mv_auto_control.textContent;
        mv_auto_control.addEventListener("click",(e)=>{
            e.preventDefault();
            let thisEventTarget = e.currentTarget;
            let thisAccDom = thisEventTarget.querySelector(".hdtext");
            let thisAccDataText = thisAccDom.dataset.hdtext;
            thisEventTarget.classList.toggle("active");
            if(thisEventTarget.classList.contains("active")){
                mv_swiper_obj.autoplay.stop();
                thisAccDom.textContent = thisAccDataText;
            }else{
                mv_swiper_obj.autoplay.start();
                thisAccDom.textContent = accAutoText;
            }
        })
    }else{
        mv_parent.classList.remove("active");
    }
}


function mainNoticeBanner(){
    let mn_swiper_obj = null;
    const mn_parent = document.querySelector(".mc_card_swiper_zone");
    const mn_container = document.querySelector(".swiper_banner_container");
    const mn_slide = !!mn_parent ? mn_parent.querySelectorAll(".swiper-slide") : null;
    const mn_auto_control = document.querySelector(".btn-autoplay.mn-autoplay");
    if (mn_slide.length>1) {
        mn_parent.classList.add("active");
        if (!!mn_swiper_obj) {
            mn_swiper_obj.update();
        } else {
            mn_swiper_obj = new Swiper(".swiper_banner_container",{
                speed : 800,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                     el: ".mc_card_swiper_zone .swiper-pagination",
                     clickable: true
                },
                keyboard: {
                    enabled: true,
                },
            });
        }
        let accAutoText = mn_auto_control.textContent;
        mn_auto_control.addEventListener("click",(e)=>{
            e.preventDefault();
            let thisEventTarget = e.currentTarget;
            let thisAccDom = thisEventTarget.querySelector(".hdtext");
            let thisAccDataText = thisAccDom.dataset.hdtext;
            thisEventTarget.classList.toggle("active");
            if(thisEventTarget.classList.contains("active")){
                mn_swiper_obj.autoplay.stop();
                thisAccDom.textContent = thisAccDataText;
            }else{
                mn_swiper_obj.autoplay.start();
                thisAccDom.textContent = accAutoText;
            }
        })
    }else{
        mn_auto_control.style.display = "none";
        mn_parent.classList.remove("active");
    }
}


function mainPartnerBanner(){
    let mp_swiper_obj = null;
    const mp_parent = document.querySelector(".bottom_guide_swiper_wrap");
    const mp_container_wrap = document.querySelector(".swiper-partner-wrap");
    const mp_container = document.querySelector(".swiper-partner");
    const mp_slide = !!mp_parent ? mp_parent.querySelectorAll(".swiper-slide") : null;
    const mp_auto_control = document.querySelector(".bottom_guide_swiper_wrap .btn-autoplay");
    const mp_nav = document.querySelectorAll(".bottom_guide_swiper_wrap .btn_flow_control");
    let swiperOption = {
        loop: true, 
        speed : 800,
        slidesPerView: 7,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".bottom_guide_swiper_wrap .btn_flow_control.next",
            prevEl: ".bottom_guide_swiper_wrap .btn_flow_control.prev",
        },
        breakpoints : {
            1024 : {
                slidesPerView: 4,
            },
            767 : {
                slidesPerView: 2,
            }
        },
        keyboard: {
            enabled: true,
        },
        on : {
            init(){
                
            }
        }
    }
    let swiperKeyOption = {
        loop: false, 
        speed : 800,
        slidesPerView: 7,
        navigation: {
            nextEl: ".bottom_guide_swiper_wrap .btn_flow_control.next",
            prevEl: ".bottom_guide_swiper_wrap .btn_flow_control.prev",
        },
        breakpoints : {
            1024 : {
                slidesPerView: 4,
            },
            767 : {
                slidesPerView: 2,
            }
        },
        keyboard: {
            enabled: true,
        },
        on : {
            init(){
                
            }
        }
    }
    if (mp_slide.length>1) {
        mp_parent.classList.add("active");
        if (!!mp_swiper_obj) {
            mp_swiper_obj.update();
        } else {
            mp_swiper_obj = new Swiper(".swiper-partner",swiperOption);
        }

        if(!!mp_nav){
            mp_nav.forEach((item)=>{
                item.addEventListener("keyup",()=>{
                    keyupAction();
                });
            });
        }
        mp_container_wrap.addEventListener("keyup",()=>{
            keyupAction();
        });

        mp_auto_control.addEventListener("focusin",()=>{
            defaultAction();
        });
        let accAutoText = mp_auto_control.textContent;
        mp_auto_control.addEventListener("click",(e)=>{
            e.preventDefault();
            let thisEventTarget = e.currentTarget;
            let thisAccDom = thisEventTarget.querySelector(".hdtext");
            let thisAccDataText = thisAccDom.dataset.hdtext;
            thisEventTarget.classList.toggle("active");
            if(thisEventTarget.classList.contains("active")){
                mp_swiper_obj.autoplay.stop();
                thisAccDom.textContent = thisAccDataText;
            }else{
                mp_swiper_obj.autoplay.start();
                thisAccDom.textContent = accAutoText;
            }
        })
    }else{
        mp_parent.classList.remove("active");
    }

    function keyupAction(){
        mp_swiper_obj.destroy();
        mp_swiper_obj = new Swiper(".swiper-partner",swiperKeyOption);
        mp_swiper_obj.update();
    }

    function defaultAction(){
        mp_swiper_obj.destroy();
        mp_swiper_obj = new Swiper(".swiper-partner",swiperOption);
        mp_swiper_obj.autoplay.start();
        mp_swiper_obj.update();
    }
}