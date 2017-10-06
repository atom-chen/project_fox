/*
	Ģ���ƶ�
*/
private var speed : float;

public var normalSpeed : float = 10;
public var hitedSpeed : float = 1;

function Start() 
{
	speed = normalSpeed;
	EventSystem.AddObserver(this, "OnMushroomHited");
	EventSystem.AddObserver(this, "OnMushroomNormal");
}

function Update () {
	transform.position += Vector3(0, speed * Time.deltaTime, 0);
}

//�����к����ȼ���
function OnMushroomHited(notify : Notification)
{
	if(notify.data == transform.GetInstanceID())
		speed = hitedSpeed;
}

//�ٶȻָ�����
function OnMushroomNormal(notify : Notification)
{
	if(notify.data == transform.GetInstanceID())
		speed = normalSpeed;
}
