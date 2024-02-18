window.addEventListener("DOMContentLoaded", () => {
  commonInit();
  selectFunc();
});
window.addEventListener("load", () => {
  layoutFunc();
});

$(function() {
  datePicker();
})

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
class DesignPopup {
  constructor(option) {
    // variable
    this.option = option;
    this.selector = document.querySelector(this.option.selector);
    if (!this.selector) {
      return;
    }

    this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.layer_wrap_parent = null;
    this.btn_closeTrigger = null;
    this.scrollValue = 0;

    // init
    const popupGroupCreate = document.createElement("div");
    popupGroupCreate.classList.add("layer_wrap_parent");
    if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
      this.pagewrap.append(popupGroupCreate);
    }
    this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");


    // event
    this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
    this.bg_design_popup = this.selector.querySelector(".bg_dim");
    let closeItemArray = [...this.btn_close];
    if (!!this.selector.querySelectorAll(".close_trigger")) {
      this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
      closeItemArray.push(...this.btn_closeTrigger);
    }
    if (closeItemArray.length) {
      closeItemArray.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          this.popupHide(this.selector);
        }, false);
      });
    }
  }
  dimCheck() {
    const popupActive = document.querySelectorAll(".popup_wrap.active");
    if (!!popupActive[0]) {
      popupActive[0].classList.add("active_first");
    }
    if (popupActive.length > 1) {
      this.layer_wrap_parent.classList.add("has_active_multi");
    } else {
      this.layer_wrap_parent.classList.remove("has_active_multi");
    }
  }
  popupShow() {
    this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
    if (this.selector == null) {
      return;
    }
    this.domHtml.classList.add("touchDis");
    this.selector.classList.add("active");
    setTimeout(() => {
      this.selector.classList.add("motion_end");
      setTimeout(() => {
        setTabControl(this.selector);
      }, 400);
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
    this.layer_wrap_parent.append(this.selector);
    this.dimCheck();
  }
  popupHide() {
    let target = this.option.selector;
    if (!!target) {
      this.selector.classList.remove("motion");
      if ("beforeClose" in this.option) {
        this.option.beforeClose();
      }
      //remove
      this.selector.classList.remove("motion_end");
      setTimeout(() => {
        this.selector.classList.remove("active");
      }, 400);
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      this.dimCheck();
      if ("closeCallback" in this.option) {
        this.option.closeCallback();
      }
      if (this.design_popup_wrap_active.length == 1) {
        this.domHtml.classList.remove("touchDis");
      }
    }
  }
}

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
      const thisItem = item;
      const thisItemDepth = thisItem.querySelector(".mbmenu_one");
      const thisItemDepth2 = thisItem.querySelector(".mbmenu_two_menu_list_wrap");
      const thisItemDepth3 = thisItem.querySelector(".mbmenu_two_menu_list");
      if (!!thisItemDepth2) {
        thisItemDepth2.classList.add("motion");
        thisItemDepth2.style.height = "auto";
      }
      item.classList.add("active");
    })
  }
}





/* 레이어 포커스 머물게 하는 함수 */
function setTabControl(element) {
  let focusable = [];
  let el_firstFocus = null;
  let el_lastFocus = null;
  let targetElement = typeof element == "object" ? element : document.querySelector(element);
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



function selectFunc() {
  const form_select = document.querySelectorAll(".form_select");

  if (!!form_select) {
    form_select.forEach((item) => {
      valueCheck(item);
    });
  }

  addDynamicEventListener(document.body, 'change', '.form_select', function(e) {
    const thisTarget = e.target;

    valueCheck(thisTarget);
  });

  function valueCheck(target) {
    if (!target.value) {
      target.classList.add("current_placeholder");
    } else {
      target.classList.remove("current_placeholder");
    }
  }
}


function responColsgroup() {
  const responcols = document.querySelectorAll("[data-responcols]");
  action();
  window.addEventListener("resize", () => {
    action();
  });

  function action() {
    if (!!responcols) {
      responcols.forEach((item) => {
        const thisItem = item;
        const thisItemCols = thisItem.querySelectorAll("col:not(.mb_hide)");

        thisItemCols.forEach((col) => {
          if (window.innerWidth > 1023) {
            if (!!col.dataset.pccols) {
              col.style.width = col.dataset.pccols;
            }
          } else {
            if (!!col.dataset.mbcols) {

              col.style.width = col.dataset.mbcols;
            }
          }
        });
      });
    }
  }

}



function setupScrolling() {
  function scrollToTarget(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);
  }

  $(document).ready(function() {
    $(".benefit_anchor").on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');
      scrollToTarget(target);
    });
  });
}




function scrollDrag(target) {
  let targetDom = [...target];
  let touchstart = "ontouchstart" in window;
  targetDom.forEach((item) => {
    scrollAction(item);
  });

  function scrollAction(targetItem) {
    if (touchstart) {
      return;
    }
    const slider = document.querySelector(targetItem);
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      e.preventDefault();
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }
}


function responColsFunc() {
  const responCols = document.querySelectorAll("[name='respon_cols']");

  action();
  let windowWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (windowWidth !== window.innerWidth) {
      action();
    }
    windowWidth = window.innerWidth;
  });



  function action() {
    if (!!responCols) {
      responCols.forEach((item) => {
        const thisItem = item;
        const thispcAttri = thisItem.dataset.pc;
        const thistabletAttri = thisItem.dataset.tablet;

        if (window.innerWidth > 1280) {
          thisItem.style.flexBasis = thispcAttri + "px";
        } else if (window.innerWidth >= 768) {
          thisItem.style.flexBasis = thistabletAttri + "px";
        } else {
          thisItem.style.removeProperty("flexBasis");
        }
      });
    }
  }
}

function toggleItemFunc(option) {
  const toggle_item = document.querySelectorAll(".toggle_bar");
  if (!!toggle_item) {
    toggle_item.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisEventTarget = e.currentTarget;
        const thisEventParent = thisEventTarget.closest(".toggle_item");
        const thisBoolean = thisEventParent.classList.contains("active");
        const controlWord = thisEventParent.querySelector(".control_word");
        thisEventParent.classList.toggle("active");
        if (thisBoolean) {
          controlWord.textContent = option.hiddenOpenText;
        } else {
          controlWord.textContent = option.hiddenCloseText;
        }
      });
    });
  }
}


function datePicker() {
  var $datepicker = $(".calendar_type");
  var $popup_contents_row = $(".popup_contents_row");
  // var $datepickerDiv = $(".calendar_render");
  let touchstart = "ontouchstart" in window;
  let calendar_option = {
    monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    changeMonth: true,
    changeYear: true,
    dateFormat: 'yy.mm.dd'
  }
  if ($datepicker.length) {
    $datepicker.each(function() {
      var $dateThis = $(this);
      $dateThis.datepicker(calendar_option);
    });
    var $windowWidth = 0;
    $(window).on("resize", function() {
      if ($windowWidth == $(window).width() && touchstart) {
        return;
      }
      $datepicker.datepicker("hide");
      $windowWidth = $(window).width();
    });
    $popup_contents_row.on("scroll", () => {
      $datepicker.datepicker("hide");
    });
    $("body").on("scroll", () => {
      $datepicker.datepicker("hide");
    });
  }
  /* if($datepickerDiv.length){
		$datepickerDiv.datepicker(calendar_option);
    //setTabControl($datepickerDiv);
	} */
}


function folderTreeFunc(option) {
  const folder_tree_wrap = document.querySelector(".folder_tree_wrap");
  const ft_bar = document.querySelectorAll(".ft_bar");

  if (!!folder_tree_wrap) {
    if (!!ft_bar) {
      ft_bar.forEach((item) => {
        const thisItem = item;
        thisItem.addEventListener("click", (e) => {
          e.preventDefault();
          const thisEvent = e.currentTarget;
          const thisParent = thisEvent.closest(".folder_tree_list > li");
          const thisHdtext = thisEvent.querySelector(".control_hd");

          thisParent.classList.toggle("folding");
          if (thisParent.classList.contains("folding")) {
            thisHdtext.textContent = option.openText;
          } else {
            thisHdtext.textContent = option.closeText;
          }
        });
      });
    }
  }
}




function swiperForm(option) {
  const swiper_form_container_wrap = document.querySelector(".swiper_form_container_wrap");
  const swiper_form_container = document.querySelector(".swiper_form_container");
  const swiper_form_slide = swiper_form_container.querySelectorAll(".swiper-slide");
  const ft_depth_bar = document.querySelectorAll(".ft_depth_bar");
  let swiper_form_obj = null;
  if (!swiper_form_obj && swiper_form_slide.length >= 1 && !!swiper_form_container_wrap) {
    swiper_form_obj = new Swiper(".swiper_form_container", {
      autoHeight: true,
      touchRatio: 0,
      speed: 0,
      pagination: {
        el: ".swiper_form_container_wrap .swiper_form_fraction",
        type: 'fraction',
        formatFractionCurrent: function(number) {
          return '0' + number;
        },
        formatFractionTotal: function(number) {
          return '0' + number;
        }
      },
      navigation: {
        nextEl: ".swiper_form_container_wrap .swiper_form_control_next",
        prevEl: ".swiper_form_container_wrap .swiper_form_control_prev",
      },
      keyboard: {
        enabled: true,
      },
      on: {
        init() {
          ftBarFunc({
            target: ft_depth_bar[0],
            domIndex: 0
          });
          if (option.loadCallback) {
            option.loadCallback();
          }
        }
      }
    });
    swiper_form_obj.on("slideChange", () => {
      ftBarFunc({
        target: ft_depth_bar[swiper_form_obj.realIndex],
        domIndex: swiper_form_obj.realIndex
      });

      if (option.changeCallback) {
        option.changeCallback();
      }


    });
  }

  if (!!ft_depth_bar) {
    ft_depth_bar.forEach((item, index) => {
      const thisItem = item;
      thisItem.addEventListener("click", (e) => {
        e.preventDefault();
        const thisEvent = e.currentTarget;
        /* ftBarFunc({
            target : thisEvent,
            domIndex : index
        }); */
        if (!!swiper_form_obj && swiper_form_slide.length > index) {
          swiper_form_obj.slideTo(index);
        }
      });
    });
  }

  function ftBarFunc(option) {
    let optionIndex = !!option.domIndex ? option.domIndex : 0;
    let targetDom = typeof option.target === 'object' ? option.target : document.querySelector(option.target);
    const thisEventParent = targetDom.closest("li");
    const thisEventParentGlobal = targetDom.closest(".folder_tree_list");
    const thisSiblingsItem = thisEventParentGlobal.querySelectorAll(".ft_depth_bar");
    const thisHdtext = targetDom.querySelector(".hdtext");
    thisSiblingsItem.forEach((item) => {
      if (targetDom !== item) {
        item.classList.remove("active");
        if (!!item.querySelector(".ft_depth_bar .hdtext")) {
          item.querySelector(".ft_depth_bar .hdtext").remove();
        }
      }
    });
    targetDom.classList.toggle("active");
    if (targetDom.classList.contains("active")) {
      if (targetDom.querySelectorAll(".hdtext") === 0) {
        let createHTML = document.createElement("span");
        createHTML.classList.add("hdtext");
        createHTML.textContent = option.selectText;
        targetDom.append(createHTML);
      }
    } else {
      if (!!thisHdtext) {
        thisHdtext.remove();
      }
    }
  }
}



function tooltipFunc() {
  const tooltipCall = document.querySelectorAll("[data-tooltip]");
  const tooltipWrap = document.querySelectorAll(".tooltip_wrap");
  const page_wrap = document.querySelector(".page_wrap");
  let tooltopTopMargin = 10;
  let tooltopLeftMargin = 10;
  let tooltipActive = null;
  let barwidth = getScrollBarWidth();


  if (!tooltipCall || !tooltipWrap) {
    return
  }

  tooltipCall.forEach((item) => {

    const thisItem = item;
    const thisItemToolTip = document.querySelector(item.dataset.tooltip);

    page_wrap.append(thisItemToolTip);

    thisItem.addEventListener("click", (e) => {
      e.preventDefault();
      const thisTarget = e.currentTarget;
      const thisTargetLayer = document.querySelector(thisTarget.getAttribute("data-tooltip"));
      if (!!thisTargetLayer) {
        tooltipWrap.forEach((item) => {
          if (item !== thisTargetLayer) {
            item.classList.remove("active");
          }
        });
        console.log(thisTargetLayer);
        thisTargetLayer.classList.add("active");
        tooltipActive = thisTargetLayer;
        posAction(thisTarget);
      }
    });
  });

  document.querySelector("body").addEventListener("click", (e) => {
    console.log(!e.target.closest(".tooltip_wrap"), !e.target.classList.contains("btn_tooltip"));
    if (!e.target.closest(".tooltip_wrap") && !e.target.classList.contains("btn_tooltip")) {
      tooltipWrap.forEach((item) => {
        item.classList.remove("active");
      });
    }
  });

  let windowWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWidth) {
      if (!!tooltipCall) {
        tooltipWrap.forEach((item) => {
          // posAction(item);
          item.classList.remove("active");
        });
      }
    }
    windowWidth = window.innerWidth;
  });

  function posAction(target) {

    let topValue = 0;
    let leftValue = 0;

    if (!tooltipActive) {
      return;
    }


    const callItem = target;
    tooltipActive.removeAttribute("style");



    // default
    topValue = (callItem.getBoundingClientRect().top - tooltipActive.getBoundingClientRect().height) + callItem.getBoundingClientRect().height + window.scrollY;
    topValue2 = callItem.getBoundingClientRect().top + callItem.getBoundingClientRect().height + tooltopTopMargin + window.scrollY;
    leftValue = callItem.getBoundingClientRect().left + callItem.getBoundingClientRect().width + tooltopLeftMargin;
    leftValue2 = callItem.getBoundingClientRect().left - callItem.getBoundingClientRect().width - tooltipActive.getBoundingClientRect().width;


    tooltipActive.setAttribute("style", `
        top : ${topValue}px;
        left : ${leftValue}px;
    `)

    // else
    if (tooltipActive.getBoundingClientRect().right - callItem.getBoundingClientRect().width >= window.innerWidth) {
      tooltipActive.setAttribute("style", `
          top : ${topValue}px;
          left : ${leftValue2}px;
      `)
    }
    if (window.innerWidth < 767) {
      tooltipActive.setAttribute("style", `
          top : ${topValue2}px;
      `)
    }
  }
}


function getScrollBarWidth() {
  let el = document.createElement("div");
  el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
  document.body.appendChild(el);
  let width = el.offsetWidth - el.clientWidth;
  el.remove();
  return width;
}


function mobileToggle(option) {
  const table_toggle_item_li = document.querySelectorAll(".table_toggle_item_list > li");
  if (!!table_toggle_item_li) {
    table_toggle_item_li.forEach((item) => {
      const thisItem = item;
      const thisItemBar = thisItem.querySelectorAll(".table_toggle_bar,.btn_tb_toggle_control");

      if (!!thisItemBar) {
        thisItemBar.forEach((item) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            const thisEvent = e.currentTarget;
            const thisParent = thisEvent.closest("li");
            const thisHiddenControl = thisParent.querySelector(".control_text");

            table_toggle_item_li.forEach((item) => {
              if (item !== thisParent) {
                item.classList.remove("active");
                item.querySelector(".control_text").textContent = option.closeText;
              }
            });
            thisParent.classList.toggle("active");
            if (thisParent.classList.contains("active")) {
              thisHiddenControl.textContent = option.openText;
            } else {
              thisHiddenControl.textContent = option.closeText;
            }
          });
        })
      }
    });
  }
}


/**
 * 디자인 모달
 * @param {*} option
 */
/* function DesignModal(option) {
  this.title = option.title;
  this.message = option.message;
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.design_modal_wrap = null;
  this.btn_dmsmidentify = null;
  this.btn_dmsmcancel = null;
  this.duration = option.duration !== undefined ? option.duration : 400;
  this.initShow(option);
}

DesignModal.prototype.initShow = function(option) {
  var innerPublish = "";
  var objThis = this;
  let confirmPublish =
    option.type === "confirm" ?
    `${option.closeText2}` :
    `${option.closeText}`;
  innerPublish = `
  <div class='design_modal_wrap'>
    <div class='design_modal_tb'>
      <div class='design_modal_td'>
        <div class='bg_design_modal'></div>
        <div class='design_modal' tabindex='0'>
          <div class='design_modal_cont_w'>
            <div class='design_modal_maintext'></div>
            <div class='design_modal_subtext'></div>
          </div>
          <div class='btn_dmsm_wrap'>
          
          <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>${confirmPublish}</a>
          <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>${option.submitText}</a>
          </div>
          <a href='javascript:;' class='btn_modal_close'><span class='hdtext'>${option.closeText}</span></a>
        </div>
      </div>
    </div>
  </div>
  `;

  this.modalparent = document.createElement("div");
  this.pagewrap.appendChild(this.modalparent);
  this.modalparent.classList.add("design_modal_insert_wrap");
  this.modalparent.innerHTML = innerPublish;
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.btn_modal_close = document.querySelector(".btn_modal_close");

  if (option.type === "confirm" || option.type === "alert") {
    this.design_modal_tit = document.querySelector(".design_modal_tit");
    this.design_modal_text = document.querySelector(".design_modal_maintext");
    this.design_modal_subtext = document.querySelector(".design_modal_subtext");
    this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");

    if(!!option.main_message){
      this.design_modal_text.innerHTML = option.main_message;
    }else{
      this.design_modal_text.remove();
    }

    if(!!option.sub_message){
      this.design_modal_subtext.innerHTML = option.sub_message;

    }else{
      this.design_modal_subtext.remove();
    }
  }
  if (option.type === "confirm") {
    this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
  }
  if (option.type === "title") {
    this.design_modal_tit.innerHTML = option.title;
  }

  this.bindEvent(option);
};
DesignModal.prototype.show = function() {
  this.pagewrap.style.zIndex = 0;
  this.domHtml.classList.add("touchDis");

  this.design_modal_wrap.classList.add("active");
  setTimeout(() => {
    this.design_modal_wrap.classList.add("motion");
    setTimeout(()=>{
      setTabControl(this.design_modal_wrap.querySelector(".design_modal"));
    },450);
  }, 30);
};
DesignModal.prototype.hide = function() {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
  }, 530);
};
DesignModal.prototype.bindEvent = function(option) {
  var objThis = this;
  let btn_close_item = [this.btn_modal_close, ...this.closetrigger];
  btn_close_item.forEach((element, index) => {
    element.addEventListener(
      "click",
      function() {
        objThis.hide();
      },
      false
    );
  });
  if (this.btn_dmsmidentify !== null) {
    this.btn_dmsmidentify.addEventListener(
      "click",
      function() {
        if (option.identify_callback !== undefined) {
          option.identify_callback();
        }
      },
      false
    );
  }
  if (this.btn_dmsmcancel !== null) {
    this.btn_dmsmcancel.addEventListener(
      "click",
      function() {
        if (option.cancel_callback !== undefined) {
          option.cancel_callback();
        }
      },
      false
    );
  }
};
 */


/* design */
function benefitTab(option) {
  const benefit_list_wrap = document.querySelector(".benefit_list_wrap");
  const benefit_list_group = document.querySelector(".benefit_list_group");
  const benefit_anchor = document.querySelectorAll(".benefit_anchor");
  const benefit_panel = document.querySelectorAll(".benefit_panel");
  let benefit_list_pos = benefit_list_wrap.getBoundingClientRect().top + window.scrollY;
  let posRender = 0;
  let posArrayBox = [];
  let btnClickIs = false;
  setTab();
  window.addEventListener("touchstart", () => {
    btnClickIs = false;
  });

  window.addEventListener("mousewheel", () => {
    btnClickIs = false;
  });

  window.addEventListener("mousedown", () => {
    btnClickIs = false;
  });
  window.addEventListener("resize", () => {
    setTab();
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY > benefit_list_pos) {
      benefit_list_group.classList.add("fixed");
    } else {
      benefit_list_group.classList.remove("fixed");
    }
    panelScroll();
    if (document.querySelector("body").getBoundingClientRect().height - window.innerHeight <= window.scrollY) {
      activeTab(benefit_anchor[benefit_anchor.length - 1]);
    }
  });
  if (!!benefit_anchor) {
    benefit_anchor.forEach((item) => {
      if (!!item.querySelector(".hdtext")) {
        item.querySelector(".hdtext").remove();
      } else {
        const domChild = document.createElement("span");
        domChild.classList.add("hdtext");
        item.appendChild(domChild);
      }
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisEvent = e.currentTarget;
        const thisPanel = document.querySelector(thisEvent.getAttribute("href"));
        const siblingsDom = siblings(thisEvent);
        activeTab(thisEvent);
        /* if(!!siblingsDom){
          siblingsDom.forEach((sitem)=>{
            if(thisEvent !== sitem){
              sitem.querySelector(".hdtext").textContent = '';
              sitem.classList.remove("active");
            }
          });
        }

        item.querySelector(".hdtext").textContent = option.hideText;
        item.classList.add("active"); */
        if (!!thisPanel) {
          if (window.innerWidth > 1023) {
            posRender = thisPanel.getBoundingClientRect().top + window.scrollY - 20;
          } else {
            posRender = thisPanel.getBoundingClientRect().top + window.scrollY - (benefit_list_group.getBoundingClientRect().height - 20);
          }
          window.scrollTo({
            top: posRender,
            left: 0,
            behavior: "smooth"
          })
        }
        btnClickIs = true;
      });
    });
  }

  function setTab() {
    benefit_list_wrap.style.removeProperty("height");
    benefit_list_wrap.style.height = benefit_list_group.getBoundingClientRect().height + "px";
    benefit_list_pos = benefit_list_wrap.getBoundingClientRect().top + window.scrollY;
    posArrayBox = panelRender();
  }

  function panelScroll() {
    if (!btnClickIs) {
      benefit_anchor.forEach((item, index) => {
        if (posArrayBox[index] <= window.scrollY) {
          activeTab(item);
        }
      });
    }
    /* posArrayBox.forEach((pos,index)=>{
      if(pos > window.scrollY){
        const activeAnochor = benefit_anchor[index];
        const siblingsDom = siblings(activeAnochor);
        if(!!siblingsDom){
          siblingsDom.forEach((sitem)=>{
            if(activeAnochor !== sitem){
              sitem.querySelector(".hdtext").textContent = '';
              sitem.classList.remove("active");
            }
          });
        }
        activeAnochor.querySelector(".hdtext").textContent = option.hideText;
        activeAnochor.classList.add("active");
      }
    }); */

  }

  function panelRender() {
    let panelArray = [];
    let posPanel = 0;

    if (!!benefit_panel) {
      benefit_panel.forEach((item, index) => {
        //panelArray.push(item.getBoundingClientRect().top + window.scrollY)
        if (window.innerWidth > 1023) {
          posPanel = item.getBoundingClientRect().top + window.scrollY - 20;
        } else {
          posPanel = item.getBoundingClientRect().top + window.scrollY - (benefit_list_group.getBoundingClientRect().height - 20);
        }
        panelArray.push(posPanel)
      });
      panelArray[0] = 0;
    }
    return panelArray;
  }

  function activeTab(target) {
    const thisEvent = target;

    if (!!benefit_anchor) {
      benefit_anchor.forEach((sitem) => {
        sitem.querySelector(".hdtext").textContent = '';
        sitem.classList.remove("active");
      });
    }


    thisEvent.querySelector(".hdtext").textContent = option.hideText;
    thisEvent.classList.add("active");
    // benefit_list_group.scrollTo
    benefit_list_group.scrollLeft = thisEvent.getBoundingClientRect().left - 20;
  }
}
/* // design */




/**
 * 디자인 모달 개선
 * @param {*} option
 */


class DesignModal {
  constructor(option) {
    this.optionObj = option;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.currentModalWrap = null;
    this.currentButtonItem = null;
  }
  show() {
    let innerPublish = `
    <div class='design_modal_wrap'>
      <div class='design_modal_tb'>
        <div class='design_modal_td'>
          <div class='bg_design_modal'></div>
          <div class='design_modal' tabindex='0'>
            <div class='design_modal_cont_w'>
              <div class='design_modal_maintext'>${this.optionObj.main_message}</div>
              <div class='design_modal_subtext'>${this.optionObj.sub_message}</div>
            </div>
            <div class='btn_dmsm_wrap'>
              <a href='javascript:;' class='btn_dmsm btn_dmsmcancel'>${this.optionObj.closeText2}</a>
              <a href='javascript:;' class='btn_dmsm btn_dmsmidentify'>${this.optionObj.submitText}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    const allmodal = document.querySelectorAll(".design_modal_insert_wrap");

    let modalparent = null;
    modalparent = document.createElement("div");

    this.pagewrap.appendChild(modalparent);
    modalparent.classList.add("design_modal_insert_wrap");

    modalparent.innerHTML = innerPublish;

    if (allmodal.length) {
      allmodal.forEach((item) => {
        item.remove();
      });
    }



    this.currentModalWrap = modalparent.querySelector(".design_modal_wrap");
    const currentModalMainText = this.currentModalWrap.querySelector(".design_modal_maintext");
    const currentModalSubText = this.currentModalWrap.querySelector(".design_modal_subtext");
    const currentModalCancel = this.currentModalWrap.querySelector(".btn_dmsmcancel");
    const currentModalSubmit = this.currentModalWrap.querySelector(".btn_dmsmidentify");
    this.currentButtonItem = this.currentModalWrap.querySelectorAll(".btn_dmsm");


    if (!this.optionObj.main_message) {
      currentModalMainText.remove();
    }
    if (!this.optionObj.sub_message) {
      currentModalSubText.remove();
    }
    if (!this.optionObj.submitText) {
      currentModalSubmit.textContent = "Confirm";
    }
    if (this.optionObj.type == "alert") {
      currentModalCancel.remove();
      currentModalSubmit.textContent = this.optionObj.closeText;
    } else {
      currentModalCancel.textContent = this.optionObj.closeText;
      currentModalSubmit.textContent = this.optionObj.submitText;
    }

    this.currentModalWrap.classList.add("active");

    if (!!this.currentButtonItem) {
      this.currentButtonItem.forEach((item) => {
        item.addEventListener("click", () => {
          this.hide();
        });
      });
    }

    if (!!currentModalSubmit) {
      currentModalSubmit.addEventListener("click", () => {
        if (!!this.optionObj.identify_callback) {
          this.optionObj.identify_callback();
        }
      }, false);
    }
    if (!!currentModalCancel) {
      currentModalCancel.addEventListener("click", () => {
        if (!!this.optionObj.cancel_callback) {
          this.optionObj.cancel_callback();
        }
      }, false);
    }

    setTimeout(() => {
      this.currentModalWrap.classList.add("motion");
      setTimeout(() => {
        setTabControl(this.currentModalWrap.querySelector(".design_modal"));
      }, 450);
    }, 30);
  }
  hide() {
    this.currentModalWrap.classList.remove("motion");
    setTimeout(() => {
      this.currentModalWrap.classList.remove("active");
      this.currentModalWrap.remove();
      this.domHtml.classList.remove("touchDis");
    }, 530);
  }
}


function toggleKeyFunc() {
  addDynamicEventListener(document.body, 'click', '.btn_keyform_bar', function(e) {
    const thisEvent = e.target;
    const thisParent = thisEvent.closest(".keyform_toggle_item");
    thisParent.classList.toggle("active");
  });
}