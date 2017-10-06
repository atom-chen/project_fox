/* 	balloon 管理类
//	游戏中气球的管理
*/

//成员变量
public var balloonArray : BalloonInfo[];

//游戏流程
function Start() {
	StartCoroutine("GenerateBalloon");
}
function Update () {
}

//操作函数
function GenerateBalloon() {
	var kIns : BalloonIns;
	for(var balloon in balloonArray) {
		yield WaitForSeconds (balloon.createTimer);
		var obj : GameObject = Instantiate(balloon.balloonObj, balloon.pos, Quaternion.identity);
		kIns = obj.GetComponent(BalloonIns);
		kIns.SetBalloonInfo(balloon);
		kIns.OnCreateBalloon();
	}
}