window.addEventListener("DOMContentLoaded", () => {
  commonInit();
});
window.addEventListener("load", () => {
  layoutFunc();
});

$(function() {})

/**
 * device check
 */
function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf("samsung") > -1) {
    browserAdd("samsung");
  }

  if (
    navigator.platform.indexOf("Win") > -1 ||
    navigator.platform.indexOf("win") > -1
  ) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

/*
  resize
*/
function resizeAction(callback) {
  let windowWid = 0;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWid) {
      if (callback) {
        callback();
      }
    }
    windowWid = window.innerWidth;
  });
}

/**
 * 레이아웃
 */
function layoutFunc() {

  function skipMenu() {
    const skiplist_link = document.querySelectorAll(".skiplist a");
    if (!!skiplist_link) {
      skiplist_link.forEach((item) => {
        item.addEventListener("click", (e) => {
          const thisEventTarget = e.currentTarget;
          const thisEventContents = document.querySelector(thisEventTarget.getAttribute("href"));
          if (!!thisEventContents) {
            thisEventContents.setAttribute("tabindex", "0");
            thisEventContents.focus();
          }
        });
      });
      /* $('.skiplist a').blur(function(){
        setTimeout(function(){
          var $focused = $(':focus');
          if( !$('.skiplist a').is(':focus') ) {
            $('body').removeClass('skip');
          }
        },10);			
      }).click(function(ev){
        var target = $( $(this).attr('href') );
        target.attr('tabindex', 0).focus();
      }); */
    }
  }

  function pcGnb() {
    const header_nav_list_wrap = document.querySelector(".header_nav_list_wrap");
    const nav_depth_menu_list_wrap = document.querySelectorAll(".nav_depth_menu_list_wrap");
    const nav_depth_menu_list = document.querySelectorAll(".nav_depth_menu_list");
    const header_nav_menu = document.querySelectorAll(".header_nav_menu");
    const middle_wrap = document.querySelector(".page_wrap > .middle_wrap");
    const mbmenu_one = document.querySelectorAll(".mbmenu_one");
    let middle_focusItem = null;

    if (!!middle_wrap) {
      middle_focusItem = middle_wrap.querySelectorAll("a,button,input,textarea,select")[0];
    }
    // let twodep_ani_is = false;
    let bg_depth = null;
    let max_height = 0;

    let timeout_value = 0;
    // init
    initMenu();


    header_nav_menu.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        menuOpen();
      });
      item.addEventListener("focusin", () => {
        menuOpen();
      });
    });
    if (!!header_nav_list_wrap) {
      header_nav_list_wrap.addEventListener("mouseleave", () => {
        menuReset();
      });
    }
    if (!!middle_focusItem) {
      middle_focusItem.addEventListener("focusin", () => {
        menuReset();
      });
    }

    if (!!mbmenu_one) {
      mbmenu_one.forEach((item) => {
        item.addEventListener("click", (e) => {
          const thisEventTarget = e.currentTarget;
          const thisEventParent = thisEventTarget.closest("li");
          const thisEventParentGlobal = thisEventTarget.closest(".mbmenu_vlist");
          const thisEventParentGlobalLi = thisEventParentGlobal.querySelectorAll(":scope > li");
          const thisEventDepth = thisEventParent.querySelector(".mbmenu_two_menu_list_wrap");
          const thisEventDepthInner = thisEventParent.querySelector(".mbmenu_two_menu_list");
          if (!!thisEventParentGlobalLi) {
            thisEventParentGlobalLi.forEach((item) => {
              const thisItem = item;
              const thisItemDepth = thisItem.querySelector(".mbmenu_two_menu_list_wrap");
              if (thisEventParent !== item) {
                item.classList.remove("active");
                if (!!thisItemDepth) {
                  thisItemDepth.classList.remove("motion");
                  thisItemDepth.style.height = "0px";
                }
              }
            })
          }
          thisEventParent.classList.toggle("active");
          if (thisEventParent.classList.contains("active")) {
            thisEventDepth.classList.add("motion");
            thisEventDepth.style.height = thisEventDepthInner.getBoundingClientRect().height + "px";
          } else {
            thisEventDepth.classList.remove("motion");
            thisEventDepth.style.height = "0px";
          }
        });
      });
    }


    function initMenu() {
      if (!!header_nav_list_wrap) {
        let depth_bg_html = document.createElement("div");
        depth_bg_html.classList.add("bg_depth");
        header_nav_list_wrap.appendChild(depth_bg_html);
        bg_depth = document.querySelector(".bg_depth");
      }
    }

    function menuOpen() {
      if (!!nav_depth_menu_list_wrap) {
        let motionObj = [bg_depth, ...nav_depth_menu_list_wrap];
        if (!!header_nav_list_wrap) {
          header_nav_list_wrap.classList.add("ready", "active");
        }
        getHeight();
        motionObj.forEach((item) => {
          item.style.height = max_height + "px";
        });
      }
    }

    function menuReset() {
      if (!!header_nav_list_wrap) {
        header_nav_list_wrap.classList.remove("active");
      }
      if (!!nav_depth_menu_list_wrap) {
        let motionObj = [bg_depth, ...nav_depth_menu_list_wrap];
        getHeight();
        motionObj.forEach((item) => {
          item.style.height = "0px";
        });
      }
    }

    function getHeight() {
      let twodepArray = [];
      nav_depth_menu_list.forEach((item) => {
        twodepArray.push(item.getBoundingClientRect().height);
      });
      max_height = Math.max.apply(null, twodepArray);
    }

  }

  function mbTotal() {
    var touchstart = "ontouchstart" in window;
    var btn_panel_menu = document.querySelector(".btn_panel_menu"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      mainmenu_dim = document.querySelector(".mainmenu_dim"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      mobile_mainmenu_wrap = document.querySelector(".mobile_mainmenu_wrap");
    domHtml = document.querySelector("html"),
      domBody = document.querySelector("body");

    // init 
    if (mobile_mainmenu_zone === null) {
      return;
    }
    btn_panel_menu.addEventListener("click", function(e) {
      e.preventDefault();
      totalOpen();
    }, false);
    btn_mbmenuclose.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);
    mainmenu_dim.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);
    resizeAction(() => {
      if (window.innerWidth > 767) {
        totalClose();
      }
    });

    function totalOpen() {
      mobile_mainmenu_zone.classList.add("active")
      setTimeout(function() {
        mobile_mainmenu_zone.classList.add("motion");
        setTimeout(function() {
          if (!!mobile_mainmenu_wrap) {
            setTabControl(".mobile_mainmenu_wrap");
          }
        }, 500);
        if (touchstart) {
          domHtml.classList.add("touchDis");
        }
      }, 30);
    }

    function totalClose() {
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(function() {
        mobile_mainmenu_zone.classList.remove("active");
        domHtml.classList.remove("touchDis");
        btn_panel_menu.focus();
      }, 500);
    }
  }
  skipMenu();
  pcGnb();
  mbTotal();
}

/**
 * menu rock
 */
function menuRock(target) {
  const targetDom = document.querySelector(target);
  if (!!targetDom) {
    targetDom.classList.add("active");
  }
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}

/* popup */

/**
 * 디자인 팝업
 * @param {*} option
 */
function DesignPopup(option) {
  this.option = option;
  this.selector = this.option.selector;

  if (this.selector !== undefined) {
    this.selector = document.querySelector(this.option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.layer_wrap_parent = null;
  this.btn_closeTrigger = null;
  this.btn_close = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;

  this.btn_closeTrigger = null;
  this.btn_close = null;

  const popupGroupCreate = document.createElement("div");
  popupGroupCreate.classList.add("layer_wrap_parent");

  if (
    !this.layer_wrap_parent &&
    !document.querySelector(".layer_wrap_parent")
  ) {
    this.pagewrap.append(popupGroupCreate);
  }

  this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");

  // console.log(this.selector.querySelectorAll(".close_trigger"));

  this.bindEvent();
}

DesignPopup.prototype.dimCheck = function() {
  const popupActive = document.querySelectorAll(".popup_wrap.active");
  if (!!popupActive[0]) {
    popupActive[0].classList.add("active_first");
  }
  if (popupActive.length > 1) {
    this.layer_wrap_parent.classList.add("has_active_multi");
  } else {
    this.layer_wrap_parent.classList.remove("has_active_multi");
  }
};
DesignPopup.prototype.popupShow = function() {
  this.design_popup_wrap_active =
    document.querySelectorAll(".popup_wrap.active");

  if (this.selector == null) {
    return;
  }
  this.domHtml.classList.add("touchDis");

  this.selector.classList.add("active");
  setTimeout(() => {
    this.selector.classList.add("motion_end");
  }, 30);
  if ("beforeCallback" in this.option) {
    this.option.beforeCallback();
  }

  if ("callback" in this.option) {
    this.option.callback();
  }
  if (!!this.design_popup_wrap_active) {
    this.design_popup_wrap_active.forEach((element, index) => {
      if (this.design_popup_wrap_active !== this.selector) {
        element.classList.remove("active");
      }
    });
  }
  //animateIng = true;

  this.layer_wrap_parent.append(this.selector);

  this.dimCheck();

  // this.layer_wrap_parent

  // ****** 주소 해시 설정 ****** //
  // location.hash = this.selector.id
  // modalCount++
  // modalHash[modalCount] = '#' + this.selector.id
};
DesignPopup.prototype.popupHide = function() {
  var target = this.option.selector;
  if (target !== undefined) {
    this.selector.classList.remove("motion");
    if ("beforeClose" in this.option) {
      this.option.beforeClose();
    }
    //remove
    this.selector.classList.remove("motion_end");
    setTimeout(() => {
      this.selector.classList.remove("active");
    }, 400);
    this.design_popup_wrap_active =
      document.querySelectorAll(".popup_wrap.active");
    this.dimCheck();
    if ("closeCallback" in this.option) {
      this.option.closeCallback();
    }
    if (this.design_popup_wrap_active.length == 1) {
      this.domHtml.classList.remove("touchDis");
    }
  }
};

DesignPopup.prototype.bindEvent = function() {
  this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
  this.bg_design_popup = this.selector.querySelector(".bg_dim");
  var closeItemArray = [...this.btn_close];

  // this.selector.querySelector(".popup_content_row").addEventListener("scroll",(e)=>{
  //   console.log(this.selector.querySelector(".popup_content_row").scrollTop)
  // });
  if (!!this.selector.querySelectorAll(".close_trigger")) {
    this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
    closeItemArray.push(...this.btn_closeTrigger);
  }
  // if (!!this.bg_design_popup) {
  //   closeItemArray.push(this.bg_design_popup);
  // }
  if (closeItemArray.length) {
    closeItemArray.forEach((element) => {
      element.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          this.popupHide(this.selector);
        },
        false
      );
    });
  }
};


function swiperFunc(option) {
  let swiper_obj = null;
  const option_target_parent = document.querySelector(option.parent);
  const option_swiper_container = document.querySelector(option.target);
  const option_swiper_slide = !!option_target_parent ? option_target_parent.querySelectorAll(".swiper-slide") : null;
  if (!!option_swiper_slide) {
    if (swiper_obj !== null) {
      swiper_obj.update();
    } else {
      swiper_obj = new Swiper(option.target, option.swiper_option);
    }
  }
}




/**
 * menu rock
 */
function menuRock(target) {
  const targetDom = document.querySelectorAll(target);
  if (!!targetDom) {
    targetDom.forEach((item) => {
      item.classList.add("active");
    })
  }
}





/* 레이어 포커스 머물게 하는 함수 */
function setTabControl(element) {
  let focusable = [];
  let el_firstFocus = null;
  let el_lastFocus = null;
  const targetElement = document.querySelector(element);
  const targetElementAll = targetElement.querySelectorAll("*");
  targetElement.setAttribute("tabIndex", "0");
  if (!!targetElementAll) {
    targetElementAll.forEach((item) => {
      if (item.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(item.getAttribute("tabIndex")) !== -1) {
        focusable.push(item);
      }
      if ((item.getAttribute("tabIndex") !== null) && (parseInt(item.getAttribute("tabIndex")) >= 0) && (item.getAttribute("tabIndex", 2) !== 32768)) {
        focusable.push(item);
      }
    });
  }

  el_firstFocus = focusable[0];
  el_lastFocus = focusable[focusable.length - 1];
  el_firstFocus.addEventListener("keydown", (e) => {
    let keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
      if (e.shiftKey) {
        el_lastFocus.focus();
        e.preventDefault();
      }
    }
  });
  el_lastFocus.addEventListener("keydown", (e) => {
    let keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
      if (!e.shiftKey) {
        el_firstFocus.focus();
        e.preventDefault();
      }
    }
  });
  el_firstFocus.focus();
}