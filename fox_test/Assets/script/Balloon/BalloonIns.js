/* 	balloon 实例类
//	游戏中气球的实例行为
*/

//类成员变量
enum BalloonType {
	BalloonRed = 0,			//普通气球
	BalloonPurple = 1,		//强力气球
	BalloonBlue = 2,			//盾牌气球
	BalloonGreen = 3			//爆炸气球
}

class BalloonInfo {
	public var balloonType:BalloonType;
	public var balloonObj:GameObject;
	public var createTimer:float;
	public var upSpeed:float;
	public var areaDamageRadius:float;
	public var pos:Vector3;
}

public  var info:BalloonInfo;
private var sprit:PackedSprite;
private var isActive:boolean = false;
//private var 

//游戏流程
function Start() {
	EventSystem.AddObserver(this, "OnNormalHitBalloon");
	EventSystem.AddObserver(this, "OnBananaHitBalloon");
	//EventSystem.AddObserver(this, "OnBalloonBang");
	
	sprit = GetComponent(PackedSprite);
	if(!sprit) {
		Debug.Log("error! can not find packedsprite");
	}
	
	if(info.createTimer == 0.0f) {
		OnCreateBalloon();
	} 
	
	DoBalloonAnim(info.balloonType);
}
function Update () {
	if(isActive) {
		transform.position += Vector3(0, info.upSpeed, 0);
	}
}

function OnCollisionEnter(collision:Collision) {
	if(collision.transform.tag=="bullet") {
		OnNormalHitBalloon(collision.gameObject);
		
		Destroy(collision.gameObject);
	}
	else if(collision.transform.name == "Balloon(Clone)") {
		if(info.balloonType == 3) {
			rigidbody.velocity = collision.relativeVelocity;
		} else {
			OnDestoryBalloon();
		}
	}
}

function OnTriggerEnter(other:Collider) {
	if(other.gameObject.transform.name=="Banana(Clone)") {
		OnBananaHitBalloon();
		
		//Destroy(collision.gameObject);
	} else if(other.gameObject.transform.tag == "watermelon") {
		// TODO
	} else if(other.gameObject.transform.name == "Balloon(Clone)") {
		// TODO
	}
}


//事件响应
public function OnCreateBalloon() {
	isActive = true;
}
private function OnDestoryBalloon() {
	isActive = false;
	
	Destroy(this.gameObject);
}
private function OnNormalHitBalloon(object:GameObject) {
	if(info.balloonType == 0) {
	
		OnDestoryBalloon();
	} else if(info.balloonType == 1) {
	
		info.balloonType = 0;
		DoBalloonEffect("change");
	} else if(info.balloonType == 2) {
	
		OnDestoryBalloon();
	} else if(info.balloonType == 3) {
		rigidbody.isKinematic = false;
		var direction : Vector3 = transform.position - object.transform.position;
		direction = Vector3(direction.x * 2500, direction.y * 2500, 0);
		transform.rigidbody.AddForceAtPosition(direction, transform.position);
		EventSystem.Send(this, "OnBalloonLeak");
		Physics.IgnoreLayerCollision(14, 11, true); // ignore collision between balloon and hedgehog bullet
		//collider.isTrigger = true;
	} else {
		Debug.Log("balloon type is not exsit!");
	}
}
private function OnBananaHitBalloon() {
	if(info.balloonType == 0) {
		OnDestoryBalloon();
	} else if(info.balloonType == 1) {
		OnDestoryBalloon();
	} else if(info.balloonType == 2) {
		EventSystem.Send(this, "OnAttackBalloonRebound", transform.position);
	} else if(info.balloonType == 3) {
		//EventSystem.Send(this, "OnBalloonBang");
		EventSystem.Send(this, "OnBalloonLeak");
	} else {
		Debug.Log("balloon type is not exsit!");
	}
}

/*private function OnBalloonBang(notify : Notification) {
	var kDistance = Vector3.Distance(gameObject.transform.position,notify.sender.transform.position);
	var kComponent:BalloonIns = notify.sender.GetComponent(BalloonIns);
	if(kDistance <= kComponent.info.areaDamageRadius) {
		OnDestoryBalloon();
	}
}*/

//功能函数
private function DoBalloonAnim(type:BalloonType) {
	if(type == 0) {
		sprit.DoAnim("red");
	} else if(type == 1) {
		sprit.DoAnim("purple");
	} else if(type == 2) {
		sprit.DoAnim("blue");
	} else if(type == 3) {
		sprit.DoAnim("green");
	} else {
		Debug.Log("bulloon type is not exsit!!!");
	}
}

private function DoBalloonEffect(name:String) {
	sprit.DoAnim(name);
}


//存取操作
function GetBalloonType()  {
	return info.balloonType ;
}
function SetBalloonInfo(kInfo:BalloonInfo) {
	info = kInfo;
}
function GetBalloonInfo() {
	return info;
}