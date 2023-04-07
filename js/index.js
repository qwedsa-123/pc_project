document.addEventListener('DOMContentLoaded', function () {
  initCrumbsNav();
  leftTabClick();
  bottomTabClick();
  rightPanelClick();
  rightMenu();
  initSmallPic();
  thumbImgClick();
  thumbarrowClick();
  zoom();
  initGoodBaseInfo();
  initGoodSizeInfo();
  goodsSpecClick();
  choosedClick();
  optionalGoodClick();
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

// 2.左侧选项卡
function leftTabClick() {
  // 获取h4标签
  let h4Ele = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  );
  let tabContent = document.querySelectorAll(
    '.wrap .productDetail .aside .tabContent > div'
  );

  // 循环和h4集合绑定事件
  h4Ele.forEach(function (h4Node, index) {
    h4Node.addEventListener('click', function () {
      // 选项卡切换的按钮
      // 排他思想移除再添加
      h4Ele.forEach(function (item) {
        item.classList.remove('active');
      });
      h4Node.classList.add('active');

      // 选项卡内容
      tabContent.forEach(function (item) {
        item.classList.remove('active');
      });
      tabContent[index].classList.add('active');
    });
  });
}

// 3.底部选项卡
function bottomTabClick() {
  // 获取li标签
  let lisEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  );
  let tabContent = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabContent > div'
  );

  // 循环和li集合绑定事件
  lisEle.forEach(function (liNode, index) {
    liNode.addEventListener('click', function () {
      // 排他思想移除再添加
      lisEle.forEach(function (item) {
        item.classList.remove('active');
      });
      liNode.classList.add('active');

      tabContent.forEach(function (item) {
        item.classList.remove('active');
      });
      tabContent[index].classList.add('active');
    });
  });
}

// 4.右侧面板状态
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

// 5.右侧菜单悬浮
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

// 6.渲染小图和缩略图
function initSmallPic() {
  // 获取数据
  let imgsrc = goodData.imgsrc;

  // 创建节点
  // let imgsELE = new Image()
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

// 12.单击商品规格specification
let conditionArr = [0, 0, 0, 0];
function goodsSpecClick() {
  // 1. 找到所有的dl集合
  let dls = document.querySelectorAll(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
  );
  // 存储条件的容器元素
  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  );
  // 条件数组，0代表没有选中条件
  // 2. 循环dl集合，循环时，要找到当前dl下面的所有dd集合
  dls.forEach(function (dlNode, dlIndex) {
    // 3. 再给找到的dd集合循环绑定事件
    let dds = dlNode.querySelectorAll('dd');
    dds.forEach(function (ddNode) {
      ddNode.onclick = function () {
        // 排他思想、颜色变化
        dds.forEach(function (dd) {
          dd.style.color = '#666';
        });
        // 4. 给当前文件颜色改为红色
        this.style.color = 'red';

        // 5. 将值存入到对应dl下标的条件数组
        conditionArr[dlIndex] = {
          text: this.innerText,
          price: Number(this.getAttribute('price')),
        };
        console.log('添加规格：', conditionArr);
        calTotalPrice();
        // 清空条件容器，防止累加条件
        choosed.innerText = '';

        // 6. 根据条件数组循环创建节点，并上树
        conditionArr.forEach(function (obj, dlIndex) {
          // 判断有值的时候才创建
          if (!obj) {
            return;
          }
          let mark = document.createElement('mark');
          let a = document.createElement('a');
          mark.innerText = obj.text;
          a.innerText = '×';
          a.setAttribute('dlIndex', dlIndex);
          // 上树
          mark.appendChild(a);
          choosed.appendChild(mark);
        });
      };
    });
  });
}

// 13.将条件节点的单击事件委托给父容器choosed
function choosedClick() {
  // 1. 将条件节点的单击事件委托给其父容器（.choosed）
  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  );

  // 2. 单击时候
  choosed.onclick = function (event) {
    if (event.target.localName !== 'a') {
      return;
    }
    // a.则要将当前mark节点移除
    let aNode = event.target;
    choosed.removeChild(aNode.parentElement);

    let dlIndex = aNode.getAttribute('dlIndex');
    // b.并要找到对应下标的dl节点，找到所有dd节点，文字颜色都改为灰色，下标为0的dd改为红色
    let dl = document.querySelectorAll(
      '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
    )[dlIndex];
    let dds = dl.querySelectorAll('dd');
    dds.forEach(function (ddNode) {
      ddNode.style.color = '#666';
    });
    dds[0].style.color = 'red';
    // c: 对应下标的条件数组值要重置为0
    conditionArr[dlIndex] = 0;
    console.log('删除规格', conditionArr);
    calTotalPrice();
  };
}

// 14.根据商品原价和所选条件的参数的价格求和
let inputsEls = document.querySelectorAll(
  '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem label input'
);
function calTotalPrice() {
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );
  let totalPriceEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em'
  );
  // 获取商品原价
  let goodlPrice = goodData.goodsDetail.price;

  // 原价与不同规格价格累加
  conditionArr.forEach(function (specification) {
    if (!specification.price) {
      return;
    }
    goodlPrice += specification.price;
  });

  // 同步改变基本信息价格
  totalPriceEle.innerText = goodlPrice;
  // 同步改变附选区的左侧信息价格
  let leftPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  );
  leftPriceEle.innerText = '￥' + goodlPrice;

  // let inputsEls = document.querySelectorAll(
  //   '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem label input'
  // );
  // 遍历被选中的价格进行累加
  inputsEls.forEach(function (inputNode) {
    if (inputNode.checked) {
      // 选中累加
      goodlPrice += Number(inputNode.value);
    }
  });
  // 同步改变附选区的右侧信息价格

  rightPriceEle.innerText = '￥' + goodlPrice;
}

// 14. 给附选商品的复选框绑定单击事件，动态计算套餐价格和数量
function optionalGoodClick() {
  inputsEls.forEach(function (inputNode) {
    inputNode.onclick = function () {
      let rightPriceEle = document.querySelector(
        '.wrap .productDetail .detail .fitting .goodSuits .result .price'
      );
      // 每次点击获取右侧价格
      // rightPriceEle.innerText ---> ￥5300
      let rightTotalPrice = rightPriceEle.innerText;
      rightTotalPrice = Number(rightTotalPrice.substring(1));
      console.log(rightPriceEle);
      if (inputNode.checked) {
        // 选中件数累加
        checkedNumber++;
        rightTotalPrice += Number(this.value);
      } else {
        // 选中件数累减
        checkedNumber--;
        rightTotalPrice -= Number(this.value);
      }
      // 改变件数
      suitsNumber.innerText = checkedNumber;
      // 改变价格
      rightPriceEle.innerText = '￥' + rightTotalPrice;
    };
  });
}
