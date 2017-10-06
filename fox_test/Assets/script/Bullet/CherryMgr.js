public var info : BulletInfo;
public var cherry : GameObject;

private var firstBornTimer : float;
private var useCount : int = 1;

function Start() {
	firstBornTimer = Time.time;
	EventSystem.AddObserver(this, "OnCompleteFire");
	yield WaitForSeconds(0.5);
	CreateCherry();
}

function CreateCherry()
{
	useCount++;
	EventSystem.Send(this, "OnSetBullet", info);
}

function OnCompleteFire(notify : Notification)
{
	var bulletInfo : BulletInfo = notify.data;
	if(bulletInfo.type == info.type)
		info.bulletInst = null;

	
	var now : float = Time.time ;
	if(now - firstBornTimer < info.createTimer) //�����ʱ�����
	{
		if(useCount <= info.createCount)//���һ�û�з��������е��ӵ�
		{
			yield WaitForSeconds(info.intervalTimer);
			CreateCherry();
		}
		else
		{
			yield WaitForSeconds(firstBornTimer + info.createTimer - now);
			firstBornTimer = Time.time;
			useCount = 1;
			CreateCherry();
		}
	}
	else
	{
		yield WaitForSeconds(0.1);
		firstBornTimer = Time.time;
		useCount = 0;
		CreateCherry();
	}
}