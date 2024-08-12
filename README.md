# Tic Tac Toe Game - Codeigniter 4 and React js

เป็นโปรแกรมเกม X/O ที่สร้างขึ้นโดยใช้ font-end เป็น React js และ back-end ใช้ Codeigniter 4 ติดต่อฐานข้อมูล mySql ด้วย Api ตัวโปรแกรม สามารถปรับขนาดของตารางได้ 3 ขนาดคือ 3x3,4x4 และ 5x5 เมื่อเกมมีผู้ชนะจะสามารถบันทึกประวัติการเล่น และดูประวัติการเล่นได้ 
![tictactoe-video-](https://github.com/user-attachments/assets/008370c2-1b04-4fad-91e5-a91e2c26bb71)


## สารบัญ Table of Content

 - [ขั้นตอนการติดตั้ง](#%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87)
 - [วิธีการใช้งาน](#%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99)
 - 

## ขั้นตอนการติดตั้ง   
1. **Clone the repository:**
```yaml
git clone https://github.com/poominpinmoo007/CodeIgniter4.git
```
Alternatively, you can download the zip file and extract it.

2. **Fetch the dependencies:**
```yaml
php spark serve
```
Run project

## Font-end Design
โดยการออกแบบหน้าเว็บจะพยายามทำออกมาให้เหมือนกับการเล่นเกมโดยใช้ โทนสี ฟ้อนต์ ให้ดูน่าสนใจ และ การใช้งานง่าย มีการใช้ bootstrap 5 มาใช้ในการจัด layout 
 - tic_tac_toe.php เป็นหน้าที่ดึงส่วนแสดวงมาจาก component app.js
 - Main.js เป็นหน้าหลักที่รวม component ทุกส่วนก่อนส่งไป app.js
 - Game.js เป็น component จัดการ logic และ ติดต่อูฐานข้อมูล
 - Board.js เป็น component ส่วนแสดงตาราง จากขนาดที่เลือก
 - Square.js เป็น component ปุ่มที่อยู่ในตาราง X/O
 - History.js เป็น component แสดงประวัติการเล่น

ด้วยตัว Codeigniter 4 ต้องเขียนในรูปแบบ MVC จึงจำเป็นต้องมีการ กำหนดค่าหลายส่วน 
**1. folder:Controllers->Tic_tac.php**
function  index() ให้ return หน้า tic_tac_toe.php ใน folder Views
```yaml
<?php namespace  App\Controllers;
class  Tic_tac  extends  BaseController{
	public  function  index(): string{
		return  view('tic_tac_toe');
	}
}
```
**2. folder:Config->Routes.php**
เซ็ทให้เมื่อ URL = http://localhost:8080/ ให้รับค่าจาก Controller ที่ชื่อ Tic_tac และเรียก method ชื่อ index
```yaml
<?php
use CodeIgniter\Router\RouteCollection;
$routes->get('/', 'Tic_tac::index');
```

## Back-end Design
โดยการจะทำให้สามารถเก็บ history play ของเกม และดู replay ได้มีดังนี้
 **1. การออกแบบฐานข้อมูล มีอยู่ 1 ตาราง โดยจะทำการเก็บข้อมูลได้แก่**
 - id เก็บ id ของการเล่นแต่ละครั้ง
  - history เก็บ ประวัติการเดินของผู้เล่น 
  - date เก็บ วันและเวลา
  - size เก็บ ขนาดของตาราง
  - step เก็บ จำนวนการเดินทั้งหมด
  - winner เก็บ ผู้ชนะ

ตัวอย่าง ข้อมูล 
```yaml
CREATE  TABLE `history` (
	`id`  int(11) NOT NULL,
	`history`  varchar(2000) NOT NULL,
	`date`  datetime  NOT NULL  DEFAULT  current_timestamp(),
	`size`  int(2) NOT NULL,
	`step`  int(2) NOT NULL,
	`winner`  int(1) NOT NULL
)
ตัวอย่าง ข้อมูล :
{
	"id":  "12",
	"history":  "[{\"squares\":[null,null,null,null,null,null,null,null,null]},{\"squares\":[\"X\",null,null,null,null,null,null,null,null]},{\"squares\":[\"X\",null,\"O\",null,null,null,null,null,null]},{\"squares\":[\"X\",null,\"O\",null,\"X\",null,null,null,null]},{\"squares\":[\"X\",null,\"O\",null,\"X\",\"O\",null,null,null]},{\"squares\":[\"X\",null,\"O\",null,\"X\",\"O\",null,null,\"X\"]}]",
	"date":  "2024-08-08 15:42:29",
	"size":  "3",
	"step":  "5",
	"winner":  "0"
}
```	
 **2. การสร้าง Api ในการติดต่อฐานข้อมูลสามารถทำได้ 2 อย่างคือ เพิ่มข้อมูล และ ดึงข้อมูล การสร้าง Api สามารถทำได้ดังนี้**
 
- เข้าไปที่ folder:Config->Database.php
และเซ็ทค่าตามฐานข้อมูลในเครื่องเรา
```yaml	
<?php namespace  Config;
use CodeIgniter\Database\Config;
class  Database  extends  Config{
public  string  $filesPath  = APPPATH .  'Database'  .  DIRECTORY_SEPARATOR;
public  string  $defaultGroup  =  'default';
public  array  $default  = [
	'DSN' => '',
	'hostname' => 'localhost',
	'username' => 'root',
	'password' => '',
	'database' => 'tic_tac_toe',
	'DBDriver' => 'MySQLi',
	'DBPrefix' => '',
	'pConnect' => false,
	'DBDebug' => true,
	'charset' => 'utf8mb4',
	'DBCollat' => 'utf8mb4_general_ci',
	'swapPre' => '',
	'encrypt' => false,
	'compress' => false,
	'strictOn' => false,
	'failover' => [],
	'port' => 4306,
	'numberNative' => false,
	'dateFormat' => [
	'date' => 'Y-m-d',
	'datetime' => 'Y-m-d H:i:s',
	'time' => 'H:i:s',
	],
];
```

- ไปที่ folder:Controllers->Tictac_Api.php
เป็นส่วนที่จะสร้างApi สำหรับ รับข้อมูลประวัติการเล่น และ บันทึกข้อมูลประวัติการเล่น
```yaml	

```

### Game Logic
การเดินเกมจะมี function อยู่ 3 ส่วนหลัก คือ

1. function render() สำหรับการสร้างตาราง จะมีกำหนดตัวแปร history จากค่า history จากใน state ,กำหนดตัวแปร current ให้เข้าถึง array จำนวนครั้งที่เดินใน history โดยกำหนดค่ามาจาก state.stepNumber และ กำหนดตัวแปร winner จากการคำนวณโดยส่งค่า current.squares และ this.state.size ไปคำนวณผู้ชนะ

จากนั้นมีการส่งค่าไปใน Component Board เพื่อสร้างตาราง

```yaml
render() {
const history = this.state.history;
const current = history[this.state.stepNumber];
const winner = calculateWinner(current.squares, this.state.size);
let status;
if (winner) {
status = 'Winner: ' + winner;
console.log(this.btn_status.history,this.btn_status.disabled)
if(this.btn_status.history==true){
this.btn_status.disabled=true
}else{
this.btn_status.disabled=false
}
} else {
status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
}
.
.
.
<Board
squares={current.squares}
size={this.state.size}
onClick={(i) => this.handleClick(i)}
/>
```

  

2. function calculateWinner() สำหรับคำนวณผู้ชนะ โดยการตรวจสอบว่ามีแถว, คอลัมน์, หรือเส้นทแยงมุมใดที่มีเครื่องหมาย (X หรือ O) เหมือนกันทั้งหมดหรือไม่

```yaml

function calculateWinner(squares, size) {

const lines = [];

  

// ตรวจสอบแถวและคอลัมน์

for (let i = 0; i < size; i++) {

const row = [];

const col = [];

for (let j = 0; j < size; j++) {

row.push(i * size + j);

col.push(j * size + i);

}

lines.push(row);

lines.push(col);

}

  

// ตรวจสอบเส้นทแยงมุม

const diag1 = [];

const diag2 = [];

for (let i = 0; i < size; i++) {

diag1.push(i * size + i);

diag2.push(i * size + (size - i - 1));

}

lines.push(diag1);

lines.push(diag2);

  

// ตรวจสอบทุกเส้นที่บรรจุอยู่ใน lines

for (let i = 0; i < lines.length; i++) {

const [a, b, ...rest] = lines[i];

if (squares[a] && squares[a] === squares[b] && rest.every((index) => squares[a] === squares[index])) {

return squares[a];

}

}

return null;

}

```

  

3. function handleClick() สำหรับกำหนดค่า X | O ลงในปุ่มที่กดและเปลี่ยนตาผู้เล่น

```yaml

handleClick(i) {

const history = this.state.history.slice(0, this.state.stepNumber + 1);

const current = history[history.length - 1];

const squares = current.squares.slice();

if (calculateWinner(squares, this.state.size) || squares[i]) {

return;

}

squares[i] = this.state.xIsNext ? 'X' : 'O';

this.setState(

{

history: history.concat([

{

squares: squares,

},

]),

stepNumber: history.length,

xIsNext: !this.state.xIsNext,

},

() => this.saveGameHistory()

);

}

```
> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.


## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|


## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).


## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```
