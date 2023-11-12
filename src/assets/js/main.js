
function mcTab(){
    const mc_linkage_menu = document.querySelectorAll(".mc_linkage_menu");
    const mc_linkage_dot = document.querySelectorAll(".mc_linkage_dot");
    if(!!mc_linkage_menu){
        mc_linkage_menu.forEach((item, index)=>{
            item.addEventListener("click",(e)=>{
                e.preventDefault();

                const eventTarget = e.currentTarget;
                const contentTarget = document.querySelector(eventTarget.dataset.target);
                const contentTargetNot = siblings(contentTarget);
                dotFunc(index);

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
}