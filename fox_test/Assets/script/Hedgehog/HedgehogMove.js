var moveSpeed:float = 8;		// 移动速度
var upEnable:boolean = true;	// 允许向上移动
var downEnable:boolean = true;	// 允许向下移动
var leftEnable:boolean = true;	// 允许向左移动
var rightEnable:boolean = true;	// 允许向右移动

function Start()
{
	EventSystem.AddObserver(this, "OnMoveUp");
	EventSystem.AddObserver(this, "OnMoveDown");
	EventSystem.AddObserver(this, "OnMoveLeft");
	EventSystem.AddObserver(this, "OnMoveRight");
	EventSystem.AddObserver(this, "OnMoveStop");
}

function OnMoveUp()
{
	if (upEnable)
	{
		UpArrow(moveSpeed);
	}
}

function OnMoveDown()
{
	if (downEnable)
	{
		DownArrow(moveSpeed);
	}
}

function OnMoveLeft()
{
	if (leftEnable)
	{
		LeftArrow(moveSpeed);
	}
}

function OnMoveRight()
{
	if (rightEnable)
	{
		RightArrow(moveSpeed);
	}
}

function OnMoveStop()
{
	transform.gameObject.rigidbody.velocity = Vector3.zero;
}
//--------------------------------------------------
// 按下↑键,obj以v的速度匀速向上运动
function UpArrow(v:float):boolean
{
	transform.gameObject.rigidbody.velocity = Vector3(0, v, 0);
}
//--------------------------------------------------
// 按下↓键,obj以v的速度匀速向下运动
function DownArrow(v:float):boolean
{
	transform.gameObject.rigidbody.velocity = Vector3(0, -v, 0);
}
//--------------------------------------------------
// 按下←键,obj以v的速度匀速向左运动
function LeftArrow(v:float):boolean
{
	transform.gameObject.rigidbody.velocity = Vector3(-v, 0, 0);
}
//--------------------------------------------------
// 按下→键,obj以v的速度匀速向右运动
function RightArrow(v:float):boolean
{
	transform.gameObject.rigidbody.velocity = Vector3(v, 0, 0);
}
//--------------------------------------------------