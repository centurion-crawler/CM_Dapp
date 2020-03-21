pragma solidity ^0.5.0;

contract CM{
    
    struct Medicinal_Materials// 中药结构体
    {
        string name;// 名称
        uint num;// 数量
        string Place_of_Origin;// 产地
        string Picking_Date;//  采摘日期
        string Processing_Date;// 炮制日期
        string Effective_Date;// 有效日期
        string quality;//  质量评级
        bool inspect;// 是否通过审查
    }
    
    struct Medical_order//  医疗单结构体（单次）
    {
        string doctor_Name;//医生姓名
        string patient_Name;//患者姓名
        string Symptom;// 症状
        string Date_of_consultation;//就诊日期
        string Describe;// 描述
        string Prescription;// 处方
        //string Disease_grade;//患病等级
        //string Duration;//治疗时间
        //string Improvement;//好转情况
        //string Side_effects;//副作用情况
        //string Deterioration;//恶化情况
        //string patient_ID;//患者ID
        //string doctor_ID;//医生ID
        //uint Appointment_visit_amount;//预约就诊金额
        //uint Prescription_amount;//处方金额
        uint Total_sum;//金额
    }
    
    struct User // 用户结构体
    {
        string ID_of_User;// 持有者ID
        string Name_of_User;// 持有者姓名
        mapping (uint => Medical_order) record;//  病历记录
        uint order_number;// 顺序号码
        string Phone_number;// 电话号码
        string Email;//邮箱
        string Gender;// 性别
        string Registration_time;// 注册时间
        string Occupation;// 职业
        bool Isdoctor;// 是否是医师
    }
    
    struct prescription // 处方
    {
        string medicinal_materials;
        uint ID;
        string Effect;
        string prescription_type;
    }
    
    struct Controller{
        uint ControllerNumber;//管理员人数
        mapping (uint => address) controller;
    }
    
    
    Controller Member_Table;// 管理者表
    
    prescription [100] public prescription_book;// 处方集
    
    uint public Pres_counter;// 处方计数器
    
    uint public Medicinal_counter;//药瓶品数量计数器
    
    uint User_counter;//  用户计数器
    
    mapping (string => Medicinal_Materials) Medicinal_Information; //特定的编码对应特定的药材（药材库）
    
    mapping (address => User) User_block;// 用户块
    
    
    
    constructor () payable public{// 合约初始化函数
        require(address(this).balance >= 0);// 合约创建时里面要有钱
        Member_Table.ControllerNumber = 1;
        Member_Table.controller[Member_Table.ControllerNumber] = msg.sender;//合约创建者为第一个管理者
    }
    
    modifier onlyController(){//函数修改器，确保管理者操作
        uint i;
        for(i = 1; i <= Member_Table.ControllerNumber; i++){
            if(Member_Table.controller[i] == msg.sender){
                break;
            }
        }
        require(i <= Member_Table.ControllerNumber);
        _;
    }
    
    function reduceOwnership(uint num) public onlyController returns (bool){// 管理者减少( 管理员权限)
        uint i;
        if(num <= Member_Table.ControllerNumber && num >= 1){
            for(i = num; i < Member_Table.ControllerNumber; i++){// 记录前移
               Member_Table.controller[i] == Member_Table.controller[i+1];
            }
            Member_Table.ControllerNumber --;
            return true;
        }
        else{
            return false;
        }
    }
    
    function increaseOwnership(address newcontroller) public onlyController returns (uint){// 管理者增加( 管理员权限)
        Member_Table.ControllerNumber ++;
        Member_Table.controller[Member_Table.ControllerNumber] = newcontroller;
        return Member_Table.ControllerNumber;
    }
    
    function checkID(address newcontroller) public view onlyController returns (uint){
        uint i;
        for (i=Member_Table.ControllerNumber;i>0;i--)
        {
            if (Member_Table.controller[i] == newcontroller)
                return i;
        }
        return 1e9-7;
    }
    function Registration ( 
        string memory User_ID,
        string memory User_name,
        string memory phonenumber,
        string memory _email,
        string memory _gender,
        string memory _time,
        string memory _occupation,
        bool _Isdoctor
    ) 
    public{// 用户注册函数
        User storage U = User_block[msg.sender];
        U.ID_of_User = User_ID;
        U.Name_of_User = User_name;
        U.Phone_number = phonenumber;
        U.Email = _email;
        U.Gender = _gender;
        U.Registration_time = _time;
        U.Occupation = _occupation;
        U.Isdoctor = _Isdoctor;
        User_counter ++;
    }
    
    //function Change_information()
    
    function Record_medical_records(
        string memory doctorName,
        string memory patientName,
        string memory _Symptom,
        string memory _Date_of_consultation,
        string memory _Describe,
        string memory _Prescription,
        uint _Total_sum
        )
        public
        returns(uint){// 病历登记函数
            uint i1;// 暂存变量
            User_block[msg.sender].order_number ++;
            i1 = User_block[msg.sender].order_number ;
            Medical_order storage m = User_block[msg.sender].record[i1];
            m.doctor_Name = doctorName;
            m.patient_Name = patientName;
            m.Symptom = _Symptom;
            m.Date_of_consultation = _Date_of_consultation;
            m.Describe = _Describe;
            m.Prescription = _Prescription;
            //m.Disease_grade = _Disease_grade;
            //m.Duration = _Duration;
            //m.Improvement = _Improvement;
            //m.Side_effects = _Side_effects;
            //m.Deterioration = _Deterioration;
            //m.patient_ID = _patient_ID;
            //m.doctor_ID = _doctor_ID;
            //m.Appointment_visit_amount = _Appointment_visit_amount;
            //m.Prescription_amount = _Prescription_amount;
            m.Total_sum = _Total_sum;
            return(User_block[msg.sender].order_number);
        }
        
    
    function Purchase (string memory identifier,string memory _name,uint _num,string memory place,string memory date) public onlyController returns(bool){// 药材采购鉴定状况登记入库( 管理员权限)
     if( Medicinal_Information[identifier].inspect)
     {
        Medicinal_Materials storage Materials = Medicinal_Information[identifier];
        Materials.name = _name;
        Materials.num = _num;
        Materials.Place_of_Origin = place;
        Materials.Processing_Date = date;
        Medicinal_counter++;
        //identifier: 标识符
        return(true);
     }
     else
     {
         return(false);
     }
    }
    
    function Produce (string memory identifier,bool _inspect,string memory _quality,string memory _ProcessingDate,string memory  _EffectDate) public onlyController returns(bool){// 药材生产信息登记（ 管理员权限）
         if(Medicinal_Information[identifier].inspect == false)
         {
          Medicinal_Materials storage Materials = Medicinal_Information[identifier];
          Materials.Picking_Date = _ProcessingDate;
          Materials.quality = _quality;
          Materials.Effective_Date = _EffectDate;
          Materials.inspect = _inspect;
          return(true);
         }
         else
         {
            return(false);
         }
        //identifier: 标识符
    }
    
    function checkMedicine (string memory identifier) view public returns(string memory ,uint,string memory ,string memory ,string memory ,string memory ,string memory,bool){// 查询药材信息
        Medicinal_Materials storage c =  Medicinal_Information[identifier];
        return(c.name,c.num,c.Place_of_Origin,c.Picking_Date,c.Processing_Date,c.Effective_Date,c.quality,c.inspect);
    }
    
    function checkMedicalOrder (uint page) view public returns(string memory ,string memory ,string memory ,string memory ,string memory ,string memory ,uint){// 查询病历,page为对应页数
        User storage U = User_block[msg.sender];
        Medical_order storage m = U.record[page];
        return(m.doctor_Name,m.patient_Name,m.Symptom,m.Date_of_consultation,m.Describe,m.Prescription,m.Total_sum);
    }
    
    function Submit_prescription(
        string memory _medicinal_materials,
        string memory _Effect,
        string memory _prescription_type
        )
        payable public returns(bool){// 上传处方函数
            //require(User_block[msg.sender].Isdoctor == true);//仅医师可以传
            Pres_counter ++;
            prescription_book[Pres_counter] = prescription(_medicinal_materials,Pres_counter,_Effect,_prescription_type);
            msg.sender.transfer(100);// 奖励一定代币
            return true;
        }
    
    function checkpage() view public returns(uint){//返回某个患者病历页数
        return(User_block[msg.sender].order_number);
    }
  
    function Deposit() public payable onlyController returns(uint){// 向合约内输入资金（管理员权限）
        return(address(this).balance);
    }
    
    function checkPrescription(uint _ID) view public returns(string memory,string memory,string memory){// 查询处方函数
        return(prescription_book[_ID].medicinal_materials,prescription_book[_ID].Effect,prescription_book[_ID].prescription_type);
    }
    
    function checkUserdate() view public returns (string memory,string memory,string memory,string memory,string memory,string memory,string memory){// 返回用户信息
        User storage U = User_block[msg.sender];
        return(U.ID_of_User,U.Name_of_User,U.Phone_number,U.Email,U.Gender,U.Registration_time,U.Occupation);
    }
}