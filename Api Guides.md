## Sale man Roles

```
enum    sale_role:
        unknown = 0,
        dir = 1,
        chief = 2,
        lead = 3,
        sale = 4,
```



## Login:

Url: `http://visitme.cloudapp.net:83/Home/Login`

Param: `Json`

`{Email, Password, Imei}`

Test data:

```
{ Email: "6066", Password: "6066", Imei: "6066" }
```

Result:
- HTTP 200 if success; .AspNet.ApplicationCookie is returned and used for authorize requests later.
- HTTP Code 401(?) Unauthorized if login failed
- `http://visitme.cloudapp.net:83/Home/Login?Email=6066&Password=Ngo%20Hong%20Huong`

		
## Get label flags:

Url: `http://visitme.cloudapp.net:83/Home/GetLabelFlags`

Param: `None`

Result: `Json`

Sample data:

```
{
   "Result":{
      "0":"Type 0",
      "1":"Nupak",
      "2":"Nutrition",
      "3":"Dachan",
      "4":"Type 4",
      "5":"Redstar",
      "6":"Type 6",
      "8":"Type 8",
      "9":"Type 9"
   },
   "ResultCode":"Success",
   "ResultMessages":[

   ]
}
```
		
## Get p_1 list:
Url: `http://visitme.cloudapp.net:83/Home/GetP1List`

Param: `None`

Result: `Json`

Sample data:

```
{
   "Result":{
      "03":"Gà Đẻ",
      "04":"Cút",
      "05":"Vịt",
      "06":"Gà Thịt",
      "07":"Cám Cá",
      "08":"Heo",
      "09":"Bò",
      "11":"Heo đặc biệt",
      "12":"Cá đặc biệt",
      "17":"Tôm"
   },
   "ResultCode":"Success",
   "ResultMessages":[

   ]
}
```
			
## Get p_2 list:

Url: `http://visitme.cloudapp.net:83/Home/GetP2List`

Param: `{p1}`
- `p1`: string; p1 number.
- `http://visitme.cloudapp.net:83/Home/GetP2List?p1=03`

Result: 'Json'

Sample data:
```
{
   "Result":[
      {
         "p2":"0301",
         "p2_name":"03_So 1"
      },
      {
         "p2":"0302",
         "p2_name":"03_So 2"
      }
   ],
   "ResultCode":"Success",
   "ResultMessages":[
   ]
}
```

## Get products list:

Url: `http://visitme.cloudapp.net:83/Home/GetProductList`

Param: `{p2}`
- `p2`: string; p2 number.
- `http://visitme.cloudapp.net:83/Home/GetProductList?p2=0301`

Result: `Json`

Sample data:

```
{
   "Result":[
      {
         "product_no":"B3000",
         "product_vname":"ĐĐ gà đẻ 18 tuần - Đào thải",
         "p_1":"03",
         "p_2":"0301",
         "part_kind":"B"
      },
      {
         "product_no":"B301",
         "product_vname":"Gà con(4 ngày-08 tuần)",
         "p_1":"03",
         "p_2":"0301",
         "part_kind":"A"
      },
      ...
   ],
   "ResultCode":"Success",
   "ResultMessages":[

   ]
}
```
			
## Get belonging sale-mans list (lấy danh sách sale-man và chief dưới quyền):

Url: `http://visitme.cloudapp.net:83/Home/GetSalemanList`

Param: `None`

Result: `Json`

Sample data:
```
[
   {
      "sale_no":"6104",
      "chief_ename":"aa"
   },
   {
      "sale_no":"6138",
      "chief_ename":"ddd"
   },
   ...
]
```

## Get belonging chiefs list (lấy danh sách chief dưới quyền):

Url: `http://visitme.cloudapp.net:83/Home/GetChiefList`

Param: `None`

Result: `Json`

Sample data:
```
[
   {
      "sale_no":"6104",
      "chief_ename":null
   },
   {
      "sale_no":"6138",
      "chief_ename":null
   },
   ...
]
```

## Get Data (NOT VALID ANYMORE):

Url: `http://visitme.cloudapp.net:83/Home/GetSaleData`

Param: `Json`

`{SaleNo, Date}`
- `SaleNo`: string
- `Date`: ISO date "2015-12-05T08:00:30"
- Sample data: `{SaleNo: "6066", Date: "2015-09-01T00:00:00"}`
- `http://visitme.cloudapp.net:83/Home/GetSaleData?SaleNo=6066&Date=2015-09-01T00:00:00`

Result: `Json`

Sample data:
```
[
  {
    "TcNo": "TC15090055",
    "CustNo": "C50571",
    "SumTotalQty": 4250
  },
  {
    "TcNo": "TC15090010",
    "CustNo": "C50649",
    "SumTotalQty": 11250
  }
]
```

## Get customer list belonging to a sale man or chief/director:

Url: `http://visitme.cloudapp.net:83/Home/GetCustomerList`

Param: `None`

Result: `Json`

Sample data:
```
[
  {
     "cust_no":"C50097",
     "cust_vname":"Phạm Văn Quân.",
     "address_name":null,
     "sale_no":"6066",
     "label_flag":"5",
     "cust_type":"3",
     "cust_kind":null
  },
  {
     "cust_no":"C50357",
     "cust_vname":"Lâm Quốc Toàn",
     "address_name":null,
     "sale_no":"6066",
     "label_flag":"5",
     "cust_type":"3",
     "cust_kind":null
  },
   ...
]
```

## Get sale man list belonging to a chief or director:

Url: `http://visitme.cloudapp.net:83/Home/GetSalemanList`

Param: `None`

Result: `Json`

Sample data:
```
[
  {
     "sale_no":"0004",
     "sale_ename":"Thieu Vinh Dat"
  },
  {
     "sale_no":"0005",
     "sale_ename":"Nguyen Trung Mong"
  },
   ...
]
```

## Get chief list belonging to a director:

Url: `http://visitme.cloudapp.net:83/Home/GetChiefList`

Param: `None`

Result: `Json`

Sample data:
```
[
  {
     "sale_no":"0004",
     "sale_ename":"Thieu Vinh Dat"
  },
  {
     "sale_no":"0005",
     "sale_ename":"Nguyen Trung Mong"
  },
   ...
]
```
			
## Get customer report data:

Url: `http://visitme.cloudapp.net:83/Home/GetCustomerReport`

Param: 'Json'

'{ cust_no, part_kind, tc_date1, tc_date2 }'

- `cust_no`: string; customer no.
- `part_kind`: A (Hỗn hợp), B (Đậm đặc), NULL (All)
- `tc_date1`: Report start date.
- `tc_date2`: Report end date.
- Sample data: `{cust_no: "C50357", part_kind: "A", tc_date1: "2012-09-01", tc_date2: "2015-09-01"}`
- `http://visitme.cloudapp.net:83/Home/GetCustomerReport?cust_no=C50357&part_kind=A&tc_date1=2012-09-01&tc_date2=2015-09-01`

Result: `Json`

Sample data:
```
{
   {
      "cust_vname":"Đặng Văn Tuấn",
      "PartKindName":null,
      "AgentTotalWeight":22475.0,
      "AgentTotalAmount":4815906400.0,
      "GrandTotalWeight":22475.0,
      "GrandTotalAmount":4815906400.0,
      "index":[
         "Seq",
         "Product Name",
         "Packing type",
         "Weight (Kgs)",
         "Amount (VND)"
      ],
      "data":{
         "1":[
            "08 Name",
            "",
            "",
            "",
            ""
         ],
         "2":[
            "0805 Name",
            "",
            "",
            "",
            ""
         ],
         "3":[
            1,
            "B866\t Thức ăn hỗn hợp cho heo nái nuôi con",
            25.0,
            4125.0,
            989001750.0
         ],
         "4":[
            "Sub Total of P2",
            "",
            "",
            4125.0,
            989001750.0
         ],
         "5":[
            "0802 Name",
            "",
            "",
            "",
            ""
         ],
         "6":[
            1,
            "V85A-N\tThức ăn hỗp hợp cho heo nái hậu bị.",
            25.0,
            3625.0,
            584937250.0
         ],
         ...
      }
   },
   "ResultCode":"Success",
   "ResultMessages":[

   ]
}
```

## Get sale man report data:

Url: `http://visitme.cloudapp.net:83/Home/GetSaleManReport`

Param: `Json`

`{ sale_no, part_kind, tc_date1, tc_date2 }`

- `sale_no`: string; customer no.
- `part_kind`: A (Hỗn hợp), B (Đậm đặc)
- `tc_date1`: Report start date.
- `tc_date2`: Report end date.
- Sample data: `{sale_no: "6073", part_kind: "A", tc_date1: "2012-09-01", tc_date2: "2015-09-01"}`
- `http://visitme.cloudapp.net:83/Home/GetSaleManReport?sale_no=C50357&part_kind=A&tc_date1=2012-09-01&tc_date2=2015-09-01`

Result: `Json`
Sample data:
```
{
   {
      "cust_vname":"Đặng Văn Tuấn",
      "PartKindName":null,
      "AgentTotalWeight":22475.0,
      "AgentTotalAmount":4815906400.0,
      "GrandTotalWeight":22475.0,
      "GrandTotalAmount":4815906400.0,
      "index":[
         "Seq",
         "Product Name",
         "Packing type",
         "Weight (Kgs)",
         "Amount (VND)"
      ],
      "data":{
         "1":[
            "08 Name",
            "",
            "",
            "",
            ""
         ],
         "2":[
            "0805 Name",
            "",
            "",
            "",
            ""
         ],
         "3":[
            1,
            "B866\t Thức ăn hỗn hợp cho heo nái nuôi con",
            25.0,
            4125.0,
            989001750.0
         ],
         "4":[
            "Sub Total of P2",
            "",
            "",
            4125.0,
            989001750.0
         ],
         "5":[
            "0802 Name",
            "",
            "",
            "",
            ""
         ],
         "6":[
            1,
            "V85A-N\tThức ăn hỗp hợp cho heo nái hậu bị.",
            25.0,
            3625.0,
            584937250.0
         ],
         ...
      }
   },
   "ResultCode":"Success",
   "ResultMessages":[

   ]
}
```

## Get chief report data:

Url: `http://visitme.cloudapp.net:83/Home/GetChiefReport`

Param: `Json`

`{ chief_no, cust_type, label_flag, tc_date }`

- `chief_no`: string; chief no.
- `cust_type`: customer area (khu vực) 1/2/3/4
- `label_flag`: Loại Khách hàng hay Thương hiệu (1: nupak; 3: Dachan; 5:Redstar)
- `tc_date`: Report year.
- Sample data: `{chief_no: "6073", cust_type: "1", label_flag: "1", tc_date: "2015-01-01"}`
- `http://visitme.cloudapp.net:83/Home/GetChiefReport?chief_no=0004&cust_type=1&label_flag=1&tc_date=2015-01-01`

Result: `Json`

Sample data:
```
{
   "Result":{
      "chief_ename":"Thieu Vinh Dat",
      "index":[
         "Sale Man",
         "Agent",
         1,
         2,
         3,
         4,
         5,
         6,
         7,
         8,
         9,
         10,
         11,
         12,
         "Grand Total"
      ],
      "data":{
         "1":[
            "Chang Yu Lung",
            "Huỳnh Hìu Linh",
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1000.0,
            1500.0,
            4500.0,
            0.0,
            7000.0
         ],
         "2":[
            "",
            "Total",
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1000.0,
            1500.0,
            4500.0,
            0.0,
            7000.0
         ],
         "3":[
            "Grand Total:",
            "",
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1000.0,
            1500.0,
            4500.0,
            0.0,
            7000.0
         ],
         ...
      }
   },
   "ResultCode":"Success",
   "ResultMessages":[

   ]
}
```

## Get director report data:

Url: `http://visitme.cloudapp.net:83/Home/GetDirectorReport`

Param: `Json`

`{ cust_type, label_flag, packing_type, p_1, p_2, product_no, tc_date, PeriodType }`
		
- `cust_type`: customer area (khu vực) 1/2/3/4
- `label_flag`: Loại Khách hàng hay Thương hiệu (1: nupak; 3: Dachan; 5:Redstar)
- `packing_type`: // TODO: define later. Bỏ qua.
- `p_1`: Phân loại sản phẩm cấp 1: Tôm, Cá, Gà, ... (00: Hỗn hợp, 03: Gà; 04: Cút)
- `p_2`: Phân lại SP cấp 2: Tôm thịt, tôm con; Cá thịt, cá đẻ ... (0301: Gà con; 0302: Gà hậu bị ...)
- `product_no`: Mã SP.
- `tc_date`: Ngày report.
- `PeriodType`: Xem enum PeriodType bên dưới.
- Sample data: `{cust_type: "1", label_flag: "1", tc_date: "2015-01-01"}`
- `http://visitme.cloudapp.net:83/Home/GetDirectorReport?cust_type=1&label_flag=1&p_1=1&tc_date=2015-01-01`

```
enum    PeriodType
        Daily = 1,
        Weekly = 2,
        Monthly = 3,
        Quarterly = 4,
        Annualy = 5
```

Result: `Json`

Sample data:
			
