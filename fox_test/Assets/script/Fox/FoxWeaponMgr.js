/* 	�������� ������
//	��Ϸ�к��������Ĺ���
*/
class AttackInfo{
	var attackSpeed:float;			//�����ٶ�
	var attackDir:Vector3;			//��������
	var attackObj:GameObject;	//�������
	var attackInterval:float;		//�������
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