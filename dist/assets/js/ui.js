window.addEventListener("DOMContentLoaded", () => {
  commonInit();
  //deviceDebug();
  tabFunc();
  responImgRendar();
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
  function pcHeader() {
    //const pc_nav_list = document.querySelector(".pc_nav_list");
    const page_wrap = document.querySelector(".page_wrap");
    const header_wrap = document.querySelector(".header_wrap");
    const header_dim = document.querySelector(".header_dim");
    const pc_nav_li = document.querySelectorAll(".pc_nav_list > li");
    if (!!header_dim) {
      page_wrap.append(header_dim);
    }
    if (!!header_wrap) {
      header_wrap.addEventListener("mouseenter", (e) => {
        const thisItem = e.currentTarget;
        thisItem.classList.add("hover");
        headerDimShow();
      });
      header_wrap.addEventListener("mouseleave", (e) => {
        const thisItem = e.currentTarget;
        thisItem.classList.remove("hover");
        pc_nav_li.forEach((item) => {
          const thisItem = item;
          const thisItemTwoWrap = thisItem.querySelector(".pc_two_list_wrap");
          thisItem.classList.remove("active");
          thisItemTwoWrap.classList.remove("motion");
          setTimeout(() => {
            thisItemTwoWrap.classList.remove("active");
          }, 30);
          headerDimHide();
        });
      });
    }
    if (!!pc_nav_li) {
      pc_nav_li.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
          const thisItem = e.currentTarget;
          const thisItemTwoWrap = thisItem.querySelector(".pc_two_list_wrap");
          const thisItemSiblings = siblings(thisItem);
          thisItemSiblings.forEach((item) => {
            if (item !== thisItem) {
              item.classList.remove("active");
            }
          });
          thisItem.classList.add("active");
          thisItemTwoWrap.classList.add("active");
          setTimeout(() => {
            thisItemTwoWrap.classList.add("motion");
          }, 10);
        });
      });
    }

    function headerDimShow() {
      header_dim.classList.add("active");
      setTimeout(() => {
        header_dim.classList.add("motion");
      }, 10);
    }

    function headerDimHide() {
      header_dim.classList.remove("motion");
      setTimeout(() => {
        header_dim.classList.remove("active");
      }, 400);
    }
  }

  function scrollTopGo() {
    const btn_page_control = document.querySelector(".btn_page_control");
    const page_control_layer = document.querySelector(".page_control_layer");
    let touchstart = "ontouchstart" in window;
    let barHeight = 0;


    if (!touchstart) {
      barHeight = 0;
    } else {
      if (document.querySelector("html").classList.contains("ios")) {
        barHeight = 130;
      } else {
        barHeight = 100;
      }
    }

    if (window.scrollY == 0) {
      page_control_layer.classList.add("bottom_pos");
    }

    window.addEventListener("scroll", () => {
      if (window.innerWidth > 1300) {
        return;
      }
      if (document.querySelector("body").scrollHeight - window.innerHeight - barHeight <= window.scrollY) {
        page_control_layer.classList.add("bottom_pos");
      } else {
        page_control_layer.classList.remove("bottom_pos");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1300) {
        page_control_layer.classList.remove("bottom_pos");
      } else {
        page_control_layer.classList.add("bottom_pos");
      }
    });

    if (!!btn_page_control) {
      btn_page_control.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      });
    }
  }

  function mobileNavi() {
    const mobile_nav_li = document.querySelectorAll(".mobile_nav_list > li");
    const mb_one_item = document.querySelectorAll(".mb_one_item");
    const btn_mobile_total = document.querySelectorAll(".btn_mobile_total");
    const btn_mobile_call = document.querySelector("#btn_mobile_call");
    const btn_mobile_close = document.querySelector("#btn_mobile_close");
    const mobile_nav_wrap = document.querySelector(".mobile_nav_wrap");
    const bodyDom = document.querySelector("body");
    mb_one_item.forEach((item) => {
      item.addEventListener("click", (e) => {
        const t_mobile_nav_li = item.closest(".mobile_nav_list > li");
        const t_mb_two_list_wrap = t_mobile_nav_li.querySelector(".mb_two_list_wrap");
        const t_mb_two_list = t_mobile_nav_li.querySelector(".mb_two_list");

        e.preventDefault();

        mobile_nav_li.forEach((item) => {
          const t_not_item = item;
          const t_not_mb_two_list_wrap = t_not_item.querySelector(".mb_two_list_wrap");
          const t_not_mb_two_list = t_not_item.querySelector(".mb_two_list");

          if (t_not_item !== t_mobile_nav_li) {
            t_not_item.classList.remove("active");
            t_not_mb_two_list_wrap.style.height = "0px";
          }
        });

        t_mobile_nav_li.classList.toggle("active");
        if (t_mobile_nav_li.classList.contains("active")) {
          t_mb_two_list_wrap.style.height = t_mb_two_list.getBoundingClientRect().height + "px";
        } else {
          t_mb_two_list_wrap.style.height = "0px";
        }

      });
    });

    btn_mobile_call.addEventListener("click", (e) => {
      e.preventDefault();
      mobile_nav_wrap.classList.add("active");
      setTimeout(() => {
        mobile_nav_wrap.classList.add("motion");
        btn_mobile_total.forEach((item) => {
          item.classList.add("active");
          bodyDom.classList.add("touchDis");
        });
      }, 10);
    });

    btn_mobile_close.addEventListener("click", (e) => {
      e.preventDefault();
      closeMobileFunc();
    });

    // window.addEventListener("resize",()=>{
    //   if(window.innerWidth <= 1300){
    //     closeMobileFunc();
    //   }
    // });

    function closeMobileFunc() {
      mobile_nav_wrap.classList.remove("motion");
      bodyDom.classList.remove("touchDis");
      setTimeout(() => {
        mobile_nav_wrap.classList.remove("active");
      }, 520);
      btn_mobile_total.forEach((item) => {
        item.classList.remove("active");
      });
    }
  }

  function subMapFuc() {
    const sub_map_toggle = document.querySelectorAll(".sub_map_toggle");
    if (!!sub_map_toggle) {
      sub_map_toggle.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const thisItem = e.currentTarget;
          const thisParent = thisItem.closest("li");
          const thisLayer = thisParent.querySelector(".sub_map_toggle_layer");

          thisParent.classList.toggle("active");
          if (thisParent.classList.contains("active")) {
            showToggleItem(thisLayer);
          } else {
            hideToggleItem(thisLayer);
          }
        });
      });
      document.querySelector("body").addEventListener("click", (e) => {
        if (!e.target.closest(".has_current")) {
          resetToggleItem();
        }
      });
    }

    function showToggleItem(target) {
      const thisLayer = target;
      const thisLayerContent = target.querySelector(".sub_map_menu_list_wrap");
      thisLayer.classList.add("active");
      thisLayer.style.height = thisLayerContent.getBoundingClientRect().height + "px";
    }

    function hideToggleItem(target) {
      const thisLayer = target;
      thisLayer.style.height = "0px";
      setTimeout(() => {
        thisLayer.classList.remove("active");
      }, 400);
    }

    function resetToggleItem() {
      const sub_map_li = document.querySelectorAll(".sub_map_list > li");
      const sub_map_toggle = document.querySelectorAll(".sub_map_toggle");
      const sub_map_toggle_layer = document.querySelectorAll(".sub_map_toggle_layer");

      sub_map_li.forEach((item) => {
        item.classList.remove("active");
      });
      sub_map_toggle_layer.forEach((item) => {
        item.style.height = "0px";
        setTimeout(() => {
          item.classList.remove("active");
        }, 400);
      })
    }
  }
  pcHeader();
  scrollTopGo();
  mobileNavi();
  subMapFuc();
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

/**
 * 디자인 모달
 * @param {*} option
 */
function DesignModal(option) {
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
    `<a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>` : ``;
  innerPublish = `
    <div class='design_modal_wrap'>
      <div class='design_modal_tb'>
        <div class='design_modal_td'>
          <div class='bg_design_modal'></div>
          <div class='design_modal'>
            <div class='design_modal_cont_w'>
              <div class='design_modal_maintext'></div>
              <div class='design_modal_subtext'></div>
            </div>
            <div class='btn_dmsm_wrap'>
            <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmclose'>닫기</a>
            ${confirmPublish}
            <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>
            </div>
            <a href='javascript:;' class='btn_modal_close'><span class='hdtext'>닫기</span></a>
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
    this.design_modal_text.innerHTML = option.main_message;
    this.design_modal_subtext.innerHTML = option.sub_message;
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


function deviceDebug() {
  const divAppend = document.createElement("div");
  divAppend.classList.add("debug");
  document.querySelector("body").append(divAppend);
}

function responImgRendar() {
  const responImg = document.querySelectorAll(".data_respon");

  action();
  resizeAction(() => {
    action();
  });

  function action() {
    responImg.forEach((item) => {
      const thisItem = item;
      if (window.innerWidth <= 1300) {
        if (window.innerWidth <= 768) {
          if (!!thisItem.dataset.mobile) {
            thisItem.src = thisItem.dataset.mobile;
          } else {
            thisItem.src = thisItem.dataset.tablet;
          }
        } else {
          thisItem.src = thisItem.dataset.tablet;
        }
      } else {
        thisItem.src = thisItem.dataset.pc;
      }
    });
  }
}


function tabFunc() {
  const tabmenu = document.querySelectorAll("[name='tabmenu']");
  if (!!tabmenu) {
    tabmenu.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisEvent = e.currentTarget;
        const thisEventParent = thisEvent.closest("li");
        const thisTargetObj = thisEvent.getAttribute("href");
        const thisTargetDom = document.querySelector(thisTargetObj);
        const thisEventNot = siblings(thisEventParent);
        const thisTargetNot = siblings(thisTargetDom);

        thisEventNot.forEach((item) => {
          if (item !== thisEvent) {
            item.classList.remove("active");
          }
        })
        thisEventParent.classList.add("active");
        if (!!thisTargetDom) {
          thisTargetNot.forEach((item) => {
            if (item !== thisTargetDom) {
              item.classList.remove("active");
            }
          })
          thisTargetDom.classList.add("active");
        }
      });
    });
  }
}


function galleryViewSwiper() {
  const gallery_swiper_wrap = document.querySelectorAll(".gallery_swiper_wrap");

  if (!!gallery_swiper_wrap) {
    gallery_swiper_wrap.forEach((item) => {
      const thisWrap = item;
      const thisViewImg = thisWrap.querySelector(".gallery_view_img");
      const thisThumnailWrap = thisWrap.querySelector(".gallery_thumnail_wrap");
      const thisGalleryThumnailContainer = thisWrap.querySelector(".gallery_thumnail_container");
      const thisGalleryThumnailSlide = thisWrap.querySelectorAll(".swiper-slide");
      let thisGalleryThumnailImg = null;
      let swiperObj = null;

      if (thisGalleryThumnailSlide.length > 5) {
        if (swiperObj !== null) {
          swiperObj.update();
        } else {
          swiperObj = new Swiper(".gallery_thumnail_container", {
            speed: 1000,
            slidesPerView: 5,
            loop: true,
            navigation: {
              nextEl: '.gallery_swiper_wrap .btn_thumnail_control.next',
              prevEl: '.gallery_swiper_wrap .btn_thumnail_control.prev',
            }
          });
        }
      } else {
        thisWrap.classList.add("slider_ready");
      }
      thisGalleryThumnailImg = thisWrap.querySelectorAll(".gallery_thumnail_img");
      thisGalleryThumnailImg.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const thisEventTarget = e.currentTarget;
          const thisEventImage = thisEventTarget.querySelector("img");
          const thisTargetNot = thisWrap.querySelectorAll(".gallery_thumnail_img");
          thisViewImg.src = thisEventImage.getAttribute("src");

          thisTargetNot.forEach((item) => {
            item.classList.remove("active");
          });
          thisEventTarget.classList.add("active");
        });
      })

    });
  }
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