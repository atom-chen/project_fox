/* 	狐狸武器 管理类
//	游戏中狐狸武器的管理
*/
class AttackInfo{
	var attackSpeed:float;			//攻击速度
	var attackDir:Vector3;			//攻击方向
	var attackObj:GameObject;	//攻击物件
	var attackInterval:float;		//攻击间隔
}

public var attackNormal:AttackInfo;

private var currentNarmalBullets : Array = new Array();
private var dir:Vector3;

function Start() {
	EventSystem.AddObserver(this, "OnFoxAttack");
	EventSystem.AddObserver(this, "onFoxBulletDestory");
	
	dir = attackNormal.attackDir.normalized;
}
function Update () {
	if(currentNarmalBullets.length != 0) {
		for(var bullet in currentNarmalBullets) {
			if(bullet) {
				bullet.transform.position += attackNormal.attackSpeed*dir;
			}
		}
	}
}

function OnFoxAttack(notify:Notification) {
	var pos:Vector3 = notify.sender.transform.position+Vector3(0,50,0);
	var bullet : GameObject = Instantiate(attackNormal.attackObj, pos, Quaternion.identity);
	if(!bullet) {
		Debug.Log("error in instantiate!!!");
	} else {
		currentNarmalBullets.Push(bullet);
		EventSystem.Send(this,"OnFoxBulletLaunch",gameObject);
	}
}

function onFoxBulletDestory(notify:Notification) {
	var idx : int = -1;
	for(var i=0; i<currentNarmalBullets.length-1; i++) {
		if(notify.sender.gameObject.GetInstanceID() == currentNarmalBullets[i].GetInstanceID()) {
			idx = i;
			break;
		}
	}
	if(idx != -1) {
		currentNarmalBullets.RemoveAt(idx);
	}
	
	Destroy(notify.data.gameObject);
}