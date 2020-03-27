App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
  
    
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }

    // Legacy dapp browsers... 
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },//web3


  initContract: function() {
  // 加载CM.json，保存了CM的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
  $.getJSON('CM.json', function(data) {
    // 用CM.json数据创建一个可交互的TruffleContract合约实例。
    var CMArtifact = data;
    App.contracts.CM = TruffleContract(CMArtifact);

    // Set the provider for our contract
    App.contracts.CM.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the adopted pets
    return App.refreshCM();//刷新页面
  });//初始化合约
  return App.bindEvents();//事件触发
  },

   bindEvents: function() {
     //$(document).on('click', '.btn-register', App.adminregister);//点击btn-register，发生函数
     $(document).on('click', '.btn-increaseadmin',App.increasedamin);//获得管理员身份
     $(document).on('click', '.btn-checkID',App.checkID);//查询个账户的ID
     $(document).on('click', '.btn-reduceadmin',App.reduceadmin);//取消管理员资格
     $(document).on('click', '.btn-produce',App.Produce);//生产药品
     $(document).on('click', '.btn-Purchase',App._Purchase);//购买药品
     $(document).on('click', '.btn-register',App.userRegister);//用户注册
     $(document).on('click', '.btn-updatesheet',App.medical_rec);//病历上传
     $(document).on('click', '.btn-submitpre',App.prescription);//提交处方信息
     $(document).on('click', '.btn-showpages',App.showpages);//展示病历单信息
     $(document).on('click', '.btn-showuser',App.showuser);
     $(document).on('click', '.btn-showpres',App.showpres);

   },
   refreshCM : function() {
   
   },
   showmed: function(event)
   {
    
    event.preventDefault();
    var CMInstance;
    web3.eth.getAccounts(function(error,accounts){
     var account=accounts[0];
     document.getElementById("showmed").innerHTML="";
     App.contracts.CM.deployed().then(function(instance) {
      CMInstance = instance;
      var medID=document.getElementById("medicineID").value;
    if (medID=="")
      alert("请填写识别码");
    else
    {  
      var resmed=CMInstance.checkMedicine.call(medID,{from : account});
      resmed.then(function(result)
      {
        console.log(result);
        if (result[result["length"]-1]==false) 
          alert("识别码有误，查不到该药品~>_<");
        else
        for (var i=0;i<result["length"]-1;i++)
          document.getElementById("showmed").innerHTML+="<td>"+result[i]+"</td>";
        
      });
    }
    }).then(function(results) {
      return App.refreshCM();
    }).catch(function(err) {
      console.log(err);
    });
   });
   },
   showuser : function(event)
   {
    event.preventDefault();
    var CMInstance;
    web3.eth.getAccounts(function(error,accounts){
     var account=accounts[0];
     App.contracts.CM.deployed().then(function(instance) {
       CMInstance = instance;
       var res=CMInstance.checkUserdate.call({from:account});
       res.then(function(result){
        if (result[1]!="")
        {
          
          for (i=0;i<result["length"];i++)
          {
            document.getElementById("info"+i).innerHTML=result[i];
          
          }
        }
         
        else
          alert("您还未注册呢~(>_<)");
       });
     }).then(function(results) {
       return App.refreshCM();
     }).catch(function(err) {
       console.log(err);
     });
   });
   },
   showpages: function(event)
   {
     alert("刷新成功");
     event.preventDefault();
     var CMInstance;
     web3.eth.getAccounts(function(error,accounts){
      var account=accounts[0];
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
        var res=CMInstance.checkpage.call({from:account});
        
       
        res.then(function(result){
          var cnt=result["c"]["0"];
          if (cnt==0)
            alert("您还没有病历史哦~~");
          document.getElementById("pageslist").innerHTML="";
          for (var i=1;i<=cnt;i++)
          {
            
            var pagelist=CMInstance.checkMedicalOrder.call(i,{from:account});
            pagelist.then(function(listdata)
            {
              var st='<tr class="odd gradeX">';
                for (var j=0;j<=5;j++)
                {
                  st+='<td class="center">'+listdata[j]+"</td>";
                  
                }
                st+='<td class="center">'+"￥"+listdata[6]["c"]["0"]+"</td></tr>";
                document.getElementById("pageslist").innerHTML+=st;
            });
          }
        });
      }).then(function(result) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },
   showpres: function(event)
   {
     ;
     event.preventDefault();
     var CMInstance;
     web3.eth.getAccounts(function(error,accounts){
      var account=accounts[0];
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
        var AB=CMInstance.Pres_counter.call({from:account});
        document.getElementById("showpres").innerHTML="";
        AB.then(function(result){
          var cnt=result["c"]["0"];
          for (var i=1;i<=cnt;i++)
          {
            var st='<div class="col-lg-6 mb-4"><div class="row testi-cgrid border-left-grid"><div class="col-sm-4 testi-icon mb-sm-0 mb-3"><img src="" alt="" class="img-fluid"/></div><div class="col-sm-8"><p class="mx-auto"><span class="fa fa-quote-left"></span>';
            var en='</div></div></div>';
            var pagelist=CMInstance.prescription_book.call(i,{from:account});
            pagelist.then(function(listdata)
            {
                document.getElementById("showpres").innerHTML+=st+"序号："+listdata[1]["c"]["0"]+"<br>类型:"+listdata[3]+"<br>药材明细："+listdata[0]+'</p><h6 class="b-w3ltxt mt-3">功效<br><span>'+listdata[2]+'</h6>'+en;
            });
          }
        });
          
        
      }).then(function(result) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },
   increasedamin : function(event)
   {
    event.preventDefault();
    var CMInstance;
    var preadmin=document.getElementById("increaseadmin").value;
    alert("将"+preadmin+"设置为管理员");

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
        var resdata=CMInstance.increaseOwnership.call(preadmin,{from : account});
        var IDdata=CMInstance.checkID.call(preadmin,{from : account});
        
        IDdata.then(function (result) {var flag=result["c"]["0"];
        console.log(flag);
        if (flag==1e9-7)
        { 
          resdata.then(function (result) {alert("任命账户ID是："+result["c"]["0"]+",请牢记！")});
          return CMInstance.increaseOwnership(preadmin,{from : account});
        }


        else
        {
          alert("该账户已经是管理员！");
        }
        });
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },
   checkID : function (event)
   {
    event.preventDefault();
    var CMInstance;
    var adminID=document.getElementById("checkID").value;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
        return CMInstance.checkID(adminID);
      }).then(function(results) {
        if (results["c"]["0"]==1e9-7)
        {
          alert("改账户还不是管理员哦！")
        }
        else
        {
          alert("账户的ID是："+results["c"]["0"]+".           *^_^*");
        }
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },
   reduceadmin: function(event)
   {
    event.preventDefault();
    var CMInstance;
    var aftID=document.getElementById("reduceadmin").value;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;

        var IDdata=CMInstance.reduceOwnership.call(aftID,{from : account});
        
        IDdata.then(function (result) {var flag=result;
        
        if (flag==true)
        { 
          alert("即将删除ID是："+aftID+"的账户的管理员身份！");
          return CMInstance.reduceOwnership(aftID,{from : account});
        }
        else
        {
          alert("该账户不是管理员或者ID错误！");
        }
        });
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },
   Produce : function(event)
   {
    event.preventDefault();
    var CMInstance;
    var identifier=document.getElementById("identifier").value;
    var inspect=$("select#_inspect option:selected").val()=="true";
    var quality=$("select#_quality option:selected").text();
    var _Date=document.getElementById("datepicker").value;
    var _Timeup=document.getElementById("timepicker").value;
    var eff_Date=document.getElementById("Eff_Date").value;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var str="";
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
        if (identifier=="")
          str+="识别码 ";
        if (_Date=="")
          str+="生产日期 ";
        if (_Timeup=="")
          str+="记录时间";
        if (eff_Date=="")
          str+="有效期";
        if (str=="")
        {
          if (inspect==true)
          {
            alert("请牢记识别码以备查询！");
            console.log(CMInstance.Produce.call(identifier,inspect,quality,_Date+" "+_Timeup,eff_Date,{from : account}));
            return CMInstance.Produce(identifier,inspect,quality,_Date+" "+_Timeup,eff_Date,{from : account}); 
          }
          else
            alert("产检不合格！");
        }
        else
          alert("请完善"+str+"的信息");
         
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },
   _Purchase : function(event)
   {
    event.preventDefault();
    var CMInstance;
    var _id=document.getElementById("Buy_identifier").value;
    var _name=document.getElementById("Buy_name").value;
    var _numtxt=document.getElementById("Buy_num").value;
    var _place=document.getElementById("Buy_place").value;
    var _Date=document.getElementById("Buy_date").value;
    var _time=document.getElementById("Buy_time").value;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var str="";
      if (_id=="")
        str+="识别码 ";
      if (_name=="")
        str+="药材名称 ";
      if (_numtxt!="")
      {
        _num=Number(_numtxt); 
      }
      else
      {
        str+="采购量 ";
      }
      if (_place=="")
      { 
          str+="采购地点 ";
      }
      if (_Date=="")
      { 
          str+="采购日期";
      }
      if (_time=="")
      { 
          str+="采购时间";
      }
      
      if (str!="")
        alert("请完善"+str+"信息");       
      else
        App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
          var res= CMInstance.Purchase.call(_id,_name,_num,_place,_Date+" "+_time,{from :account});
          res.then(function(result){
            if (!result) 
              alert("该药品还没进行生产记录！");
            else
            {
              console.log(result);
              return CMInstance.Purchase(_id,_name,_num,_place,_Date+" "+_time,{from :account});  
            }
              
          });
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
   },



  userRegister :function(event)
  {
    event.preventDefault();
    var CMInstance;
    var user_id=document.getElementById("User_ID").value;
    var user_name=document.getElementById("User_Name").value;
    var _numtxt=document.getElementById("phonenum").value;
    var _email=document.getElementById("E_mail").value;
    var _gender=$("select#_gender option:selected").text();
    var _Date=document.getElementById("datepicker1").value;
    var _occup=document.getElementById("occupation").value;
    var _isdoctor=$("select#_gender option:selected").val()=="true";

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var str="";
      if (user_id=="")
        str+="用户名称 ";
      if (user_name=="")
        str+="真实姓名 ";
      if (_numtxt=="")
      {
        str+="联系方式 "; 
      }
      if (_email=="")
      { 
          str+="电子邮箱 ";
      }
      if (_Date=="")
      { 
          str+="注册时间 ";
      }
      if (_occup=="")
      {
        str+="职业";
      }
      
      if (str!="")
        alert("请完善"+str+"的信息");       
      else
        App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
          return CMInstance.Registration(user_id,user_name,_numtxt,_email,_gender,_Date,_occup,_isdoctor,{from :account});  
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
  },

  medical_rec :function(event)
  {
    ;
    event.preventDefault();
    var CMInstance;
    var doc_name=document.getElementById("Doc_Name").value;
    var pat_name=document.getElementById("Pat_Name").value;
    var _Sym1=document.getElementById("Sym1").value;
    var _Sym2=$("input[name='optionsRadios']:checked").val();
    var _Sym3=$("select#Sym3 option:selected").text();
    var _Sym4="好转情况："+document.getElementById("inputSuccess").value+"<br>副作用情况："+document.getElementById("inputWarning").value+"<br>恶化情况："+document.getElementById("inputError").value;
    var _year=document.getElementById("year").value;
    var _month=document.getElementById("month").value;
    var _day=document.getElementById("day").value;
    var Sub_txt=document.getElementById("Subcribe").value;
    var _Prescription=document.getElementById("Prescription").value;
    var Total_sum_txt=document.getElementById("Total_sum").value
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var str="";
      if (doc_name=="")
        str+="医生名字 ";
      if (pat_name=="")
        str+="患者姓名 ";
      if (_Sym1=="")
      {
        str+="症状 "; 
      }
      if (_Sym2=="")
      {
        str+="病患等级 "; 
      }
      if (_Sym3=="")
      {
        str+="已就诊天数 "; 
      }
      if (_Sym4=="")
      {
        str+="疗效 "; 
      }
      if (_year=="")
      { 
          str+="年份 ";
      }
      if (_month=="")
      { 
          str+="月份 ";
      }
      if (_day=="")
      { 
          str+="日期 ";
      }
      if (Sub_txt=="")
      {
        str+="医嘱 ";
      }
      if (_Prescription=="")
      {
        str+="处方 ";
      }
      if (Total_sum_txt=="")
      {
        str+="金额 ";
      }
      else{
        Total_num=Number(Total_sum_txt);
      }
      let _Sym="症状:"+_Sym1+"<br>"+"病患等级:"+_Sym2+"<br>"+"就诊天数:"+_Sym3+"<br>"+_Sym4;
      let _Date=_year+"年"+_month+"月"+_day+"日";
      if (str!="")
        alert("请完善"+str+"的信息");       
      else
        App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
          return CMInstance.Record_medical_records(doc_name,pat_name,_Sym,_Date,Sub_txt,_Prescription,Total_num,{from :account});  
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
  },
  prescription: function(event)
  {
    ;
    event.preventDefault();
    var CMInstance;
    var materials=document.getElementById("materials").value;
    var effect=document.getElementById("effect").value;
    var types=$("select#types option:selected").text();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var str="";
      if (materials=="")
        str+="配方清单 ";
      if (effect=="")
        str+="处方疗效 ";
      if (types=="")
        str+="处方类型";
      if (str!="")
        alert("请完善"+str+"的信息！");
      else
      App.contracts.CM.deployed().then(function(instance) {
        CMInstance = instance;
          return CMInstance.Submit_prescription(materials,effect,types,{from :account,value:10000,gas:60000000});  
      }).then(function(results) {
        return App.refreshCM();
      }).catch(function(err) {
        console.log(err);
      });
    });
  }
};
$(function() {
  $(window).load(function() {
    App.init();
  });
});
