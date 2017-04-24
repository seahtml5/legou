//搜索结果页     edited by 黄武远

var goods_container,paged=false,current_word,btn,items_num=20,keyword;
addEventListener("load",function(){
	createBaseUI();
	//1 获取其他页面的传值
	var result=location.search;
	keyword=decodeURI(result.split('=')[1]);
	if (!result) {
		keyword = "裤子";
	} 
	
	current_word = keyword;
	console.log(typeof keyword,current_word);
	//2 通过关键字进行搜索
	LGB.init();
	loadData(0,keyword);
	var search=document.querySelector('#my_search');
	document.querySelector('#search_btn').addEventListener('click',clickHandler,false);
},false);
//加载所有商品数据
function loadData(skip,keyword){
	var data={
		"keyword":keyword,
		"num":20,
		"skip":skip||0,
	};
	current_word = keyword;
	LGB.queryByType(data,success,error);
}

//所有分类
function createBaseUI(){
	var allClass=document.querySelector('#allClass');
	var item_class=document.createElement('ul');
	item_class.className='classes';
	var big_class_name=document.createElement('h3');
	big_class_name.innerText="分类";
	item_class.appendChild(big_class_name);
	//每样分类的内容
	var detail_class=document.createElement('div');
	detail_class.innerHTML="<a href='../pages/search.html?keyword=卫衣'>卫衣</a><a href='../pages/search.html?keyword=文胸'>文胸</a><a href='../pages/search.html?keyword=口红'>口红</a><a href='../pages/search.html?keyword=板鞋'>板鞋</a><a href='../pages/search.html?keyword=休闲裤'>休闲裤</a>";
	item_class.appendChild(detail_class);
	allClass.appendChild(item_class);
	
	
	var goods_wrap=document.createElement('div');
	goods_wrap.className="big_search";
	allClass.appendChild(goods_wrap);
	var show_goods=document.createElement('div');
	show_goods.className='show_goods';
	goods_wrap.appendChild(show_goods);
	goods_container=document.createElement('div');
	goods_container.className='good_container';
	show_goods.appendChild(goods_container);
}

function success(obj)
{
	// console.log("查询成功:",obj);
	loading(obj);
}

function error(error)
{
    console.log("失败",error);
}

function mySort(min,max){
	var value=document.querySelector('#search_input').value;
	
}
document.onkeypress=function(e){
	var e=e||window.event;
	if(e.keyCode==13){
		clickHandler();
	}
}


function clickHandler(){
	var keyword = document.querySelector('#search_input').value;
	if (keyword) {
		current_word=keyword;
	}
	document.body.scrollTop = 0;
	var data={
		"keyword":current_word,
		"num":20,
		"skip":changePage||0,
	}
	console.log(data);
	LGB.queryByType(data,success,function(error){
		console.log(error);
	});
}

//搜索结果	
function loading(obj){
	document.querySelector('.good_container').innerText='';
	if(obj.length==0){
		goods_container.className='nothing';
		goods_container.innerText='没有找到相关商品';
	}
	for(var i=0;i<obj.length;i++)
	{
		createUI(obj[i]);
	}
//	paging(num);
	LGB.queryCount(current_word,function(num){
		 console.log("共查到"+num+"条数据",current_word);
		paging(num);
	},function (error){console.log(error)})
}

function createUI(data){
	var datas=data.attributes;
	var myrandom=Math.floor(Math.random()*950+50);
	var divs=document.createElement('div');
	divs.className='pubuliu';
	divs.setAttribute('id',data.id);
	divs.onclick=goDetails;
	goods_container.appendChild(divs);
	var img_a=document.createElement('a');
	
	img_a.className='img_a';
	img_a.innerHTML="<img src="+datas.coverimg+" />";
	divs.appendChild(img_a);
	var detail_a=document.createElement('a');
	detail_a.className='detail_a';
	detail_a.innerHTML="<p>"+datas.itemname+"</p><div class='good_info'><b class='fl'>¥"+datas.price+"</b><i class='fl'>¥"+datas.orgprice+"</i><span class='fr'><b>☆</b><var>"+myrandom+"</var></span></div>";
	divs.appendChild(detail_a);
}
//跳转 商品详情页
function goDetails(id){
	console.log(this.id);
	window.open("itemDetail.html?"+this.id,'_self');
}

createBack();
//创建返回顶部按钮
function createBack(){
	btn=document.createElement('div');
	var bodys=document.getElementsByTagName('body')[0];
	btn.className='back';
	btn.innerText='Top';
	bodys.appendChild(btn);
	// console.log('dibeds');
	btn.onclick=goback;
}
//返回顶部函数
function goback(){
	scHeight  =  document.documentElement.scrollTop || document.body.scrollTop;
		var t =  setInterval(function (){
			scHeight-=50 ;
			document.documentElement.scrollTop = scHeight;
			document.body.scrollTop = scHeight;
			if (scHeight <= 0) {
				document.body.scrollTop = 0;
				clearInterval(t);
			}
		},17);
}

function paging(num){
//	console.log("hhh");
	if(num>5) num = 5;
	console.log("创建分页");
	var page=document.createElement('div');
	page.className='page';
	var btn_list=document.createElement('div');
	btn_list.className='page_btn';
	for(var i=0;i<num;i++){
		var a_btn=document.createElement('a');
		a_btn.className='clickme';
		a_btn.innerText=i+1;
		a_btn.href='###';
		a_btn.setAttribute('onclick','changePage()');
		btn_list.appendChild(a_btn);
	}
	page.appendChild(btn_list);
	goods_container.appendChild(page);
	paged=true;
}
function changePage(){
	var page_list=document.querySelectorAll('.clickme');
	var event=event||window.event;
	
	console.log(event.target.innerText);
	var click_page = event.target.innerText;
	goods_container.innerText='';
	document.body.scrollTop = 0;
//	console.log(this);
	loadData(click_page-1,current_word);
	
	
}
