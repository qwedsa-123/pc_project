document.addEventListener('DOMContentLoaded', function () {
  initCrumbsNav();
  TabClick(leftTabH4Ele, leftTabContent);
  TabClick(bottomTabLisEle, bottomTabContent);
  rightPanelClick();
  rightMenu();
  initSmallPic();
  thumbImgClick();
  thumbarrowClick();
  zoom();
  initGoodBaseInfo();
  initGoodSizeInfo();
});

// 1.路径导航（面包屑导航）
function initCrumbsNav() {
  // 获取数据
  let paths = goodData.path;

  //遍历paths数据对象获取里面的值，创建并赋值给a，追加给父div
  paths.forEach(function (path, index) {
    let aNode = document.createElement('a');

    // 最后一项不加url
    if (index !== paths.length - 1) {
      aNode.href = path.url;
    }
    aNode.innerText = path.title;

    let conPoin = document.querySelector('.wrap .con .conPoin');
    conPoin.appendChild(aNode);
  });
}

// 2.选项卡
// 左边
let leftTabH4Ele = document.querySelectorAll(
  '.wrap .productDetail .aside .tabWrap h4'
);
let leftTabContent = document.querySelectorAll(
  '.wrap .productDetail .aside .tabContent > div'
);

// 底部
let bottomTabLisEle = document.querySelectorAll(
  '.wrap .productDetail .detail .intro .tabWrap li'
);
let bottomTabContent = document.querySelectorAll(
  '.wrap .productDetail .detail .intro .tabContent > div'
);
/**
 * 实现选项卡切换
 * @param {Array} ele 切换按钮的元素节点
 * @param {Array} tabContent 切换内容的元素节点
 */
function TabClick(ele, tabContent) {
  // 循环Ele集合和绑定事件
  ele.forEach(function (node, index) {
    node.addEventListener('click', function () {
      // 选项卡切换的按钮
      // 排他思想移除再添加
      ele.forEach(function (item) {
        item.classList.remove('active');
      });
      node.classList.add('active');

      // 选项卡内容
      tabContent.forEach(function (item) {
        item.classList.remove('active');
      });
      tabContent[index].classList.add('active');
    });
  });
}

// 3.右侧面板状态
function rightPanelClick() {
  let toolBar = document.querySelector('.wrap .toolBar');
  let btnEle = document.querySelector('.wrap .toolBar .but');
  let isClose = true; //定义开关变量，默认关闭状态

  // but绑定单击事件
  btnEle.addEventListener('click', function () {
    // 动态控制类名切换
    if (isClose) {
      btnEle.classList.replace('list', 'cross');
      toolBar.classList.replace('toolWrap', 'toolOut');
    } else {
      btnEle.classList.replace('cross', 'list');
      toolBar.classList.replace('toolOut', 'toolWrap');
    }
    isClose = !isClose;
  });
}

// 4.右侧菜单悬浮
function rightMenu() {
  // 获取li集合
  let lisEle = document.querySelectorAll('.wrap .toolBar .toolList li');
  lisEle.forEach(function (liNode) {
    // 悬浮
    liNode.addEventListener('mouseenter', function () {
      this.querySelector('i').style.backgroundColor = 'rgb(200,17,34)';
      this.querySelector('em').style.left = '-62px';
    });
    // 离开
    liNode.addEventListener('mouseleave', function () {
      this.querySelector('i').style.backgroundColor = 'rgb(122,110,110)';
      this.querySelector('em').style.left = '35px';
    });
  });
}

// 5.右侧回到顶部

// 6.渲染小图和缩略图
function initSmallPic() {
  // 获取数据
  let imgsrc = goodData.imgsrc;

  // 创建节点
  let smallPicNode = document.createElement('img');
  smallPicNode.src = imgsrc[0].s;

  // 移动到父容器
  let zoom = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );
  zoom.appendChild(smallPicNode);

  let list = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  //循环所有的图片，创建缩略图节点
  imgsrc.forEach(function (imgObj) {
    //   - 创建li节点
    let lisNode = document.createElement('li');
    // - 创建缩略图img节点
    let thumbImgNode = document.createElement('img');
    // - 将img作为li的子节点
    thumbImgNode.src = imgObj.s;
    lisNode.appendChild(thumbImgNode);
    // - 将li节点放到list容器中展示
    list.appendChild(lisNode);
  });
}

// 7.缩略图点击切换
var index = 0;
function thumbImgClick() {
  let lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );
  let zoomImg = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom img'
  );
  // 给所有的缩略图循环绑定单击事件
  lisEle.forEach(function (liNode, i) {
    liNode.addEventListener('click', function () {
      // 点击对应的小缩略图，让上面的图展示对应的图片
      // 改变小图的src
      zoomImg.src = this.firstElementChild.src;
      index = i;
    });
  });
}

// 8.缩略图左右箭头单击
function thumbarrowClick() {
  // 获取左右节点
  let prev = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  );
  let next = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  );
  let ul = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );
  let lis = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  // 给左右节点绑定单击事件
  //    a: 让ul的left偏移量进行移动（75px）
  let ulMove = 0;
  // 步长
  let stepMove =
    lis[0].offsetWidth +
    parseInt(window.getComputedStyle(lis[0], null).marginRight);
  // 最大移动距离
  let ulMaxMove = (lis.length - 5) * stepMove;

  // 左箭头
  prev.addEventListener('click', function () {
    if (ulMove === 0) {
      return;
    }
    ulMove -= stepMove;
    ul.style.left = -ulMove + 'px';
  });

  // 右箭头
  next.addEventListener('click', function () {
    if (ulMove === ulMaxMove) {
      return;
    }
    ulMove += stepMove;
    ul.style.left = -ulMove + 'px';
  });
}

// 9.实现放大镜功能
function zoom() {
  // 小图容器
  let smallImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );
  let preview = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  );
  //null更语义化，表示放的一个对象
  let mask = null;
  let bigImgBox = null;
  let bigImg = null;

  // 小图容器悬浮事件
  smallImgBox.onmouseenter = function () {
    // 创建并追加mask
    mask = document.createElement('div');
    mask.className = 'mask';
    smallImgBox.appendChild(mask);

    // 创建并追加大图容器和大图
    bigImgBox = document.createElement('div');
    bigImgBox.className = 'bigBox';

    bigImg = document.createElement('img');
    bigImg.src = goodData.imgsrc[index].b;
    preview.appendChild(bigImgBox);
    bigImgBox.appendChild(bigImg);
  };

  // 小图容器离开事件
  smallImgBox.onmouseleave = function () {
    // 移除mask和大图容器
    smallImgBox.removeChild(mask);
    preview.removeChild(bigImgBox);
  };

  // 小图容器移动事件
  smallImgBox.onmousemove = function (event) {
    // 让鼠标在遮盖的正中心
    maskLeft =
      event.clientX -
      smallImgBox.getBoundingClientRect().left -
      mask.offsetWidth / 2;
    maskTop =
      event.clientY -
      smallImgBox.getBoundingClientRect().top -
      mask.offsetHeight / 2;

    // 遮盖的最大移动距离
    maskMaxLeft = smallImgBox.clientWidth - mask.offsetWidth;
    maskMaxTop = smallImgBox.clientHeight - mask.offsetHeight;

    // 控制边界
    if (maskLeft < 0) {
      maskLeft = 0;
    }
    if (maskTop < 0) {
      maskTop = 0;
    }
    if (maskLeft > maskMaxLeft) {
      maskLeft = maskMaxLeft;
    }
    if (maskTop > maskMaxTop) {
      maskTop = maskMaxTop;
    }

    mask.style.left = maskLeft + 'px';
    mask.style.top = maskTop + 'px';

    // 大图片的最大移动距离
    bigImgMaxLeft = bigImg.clientWidth - bigImgBox.offsetWidth;
    bigImgMaxTop = bigImg.clientHeight - bigImgBox.offsetHeight;

    // 等比例移动
    bigImgLeft = (maskLeft / maskMaxLeft) * bigImgMaxLeft;
    bigImgTop = (maskTop / maskMaxTop) * bigImgMaxTop;

    bigImg.style.left = -bigImgLeft + 'px';
    bigImg.style.top = -bigImgTop + 'px';
  };
}

// 10. 渲染商品的基本信息
// 选中件数
let checkedNumber = 0;
let suitsNumber = document.querySelector(
  '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
);
function initGoodBaseInfo() {
  // 获取数据
  let baseInfo = goodData.goodsDetail;
  // 渲染商品的基本信息
  let goodsInfo = `<h3 class="infoName">
  ${baseInfo.title}
</h3>
<p class="news">
${baseInfo.recommend}
</p>
<div class="priceArea">
  <div class="priceArea1">
    <div class="title">
      价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
    </div>
    <div class="price">
      <i>￥</i>
      <em>${baseInfo.price}</em>
      <span>降价通知</span>
    </div>
    <div class="remark">
      <i>累计评价</i>
      <span>19876</span>
    </div>
  </div>
  <div class="priceArea2">
    <div class="title">
      促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
    </div>
    <div class="fixWidth">
      <i>${baseInfo.promoteSales.type}</i>
      <span
      ${baseInfo.promoteSales.content}
      </span>
    </div>
  </div>
</div>
<div class="support">
  <div>
    <div class="title">
      支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
    </div>
    <div class="fixWidth">
    ${baseInfo.support}
    </div>
  </div>
  <div>
  <div class="title">配&nbsp;送&nbsp;至</div>
  <div class="fixWidth">${baseInfo.address}</div>
  </div>
  </div>`;

  let info1 = document.querySelector('.wrap .con .mainCon .infoWrap .info1');
  info1.innerHTML = goodsInfo;

  // 渲染搭配商品的信息
  // 左侧商品价格
  let masterPrice = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  );
  masterPrice.innerText = '￥' + baseInfo.price;

  //右侧选购件数以及价格
  let inputsEls = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem input'
  );
  let totalPrice = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );

  // 选中件数总价
  let checkedTotalPrice = 0;
  inputsEls.forEach(function (inputNode) {
    if (inputNode.checked) {
      checkedNumber++;
      checkedTotalPrice += parseInt(inputNode.value);
    }
  });
  suitsNumber.innerText = checkedNumber;
  totalPrice.innerText = '￥' + (baseInfo.price + checkedTotalPrice);
}

// 11. 渲染商品的规格信息
function initGoodSizeInfo() {
  let chooseArea = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea'
  );
  // 获取数据
  let crumbData = goodData.goodsDetail.crumbData;

  // 根据数据循环创建
  crumbData.forEach(function (info) {
    // 创建dl
    let dlNode = document.createElement('dl');
    // 创建dt
    let dtNode = document.createElement('dt');
    dlNode.appendChild(dtNode);
    dtNode.innerText = info.title;
    // 创建dd
    info.data.forEach(function (data) {
      let ddNode = document.createElement('dd');
      dlNode.appendChild(ddNode);
      ddNode.innerText = data.type;
      ddNode.setAttribute('price', data.changePrice);
    });
    chooseArea.appendChild(dlNode);
  });
}
