/* 	balloon ������
//	��Ϸ������Ĺ���
*/

//��Ա����
public var balloonArray : BalloonInfo[];

//��Ϸ����
function Start() {
	StartCoroutine("GenerateBalloon");
}
function Update () {
}

//��������
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