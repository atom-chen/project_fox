public var downmoveSpeed : float = 0.5;	
public var upmoveSpeed : float = 0.1;
private var moveSpeed : float= 0;
var sprite : PackedSprite;

function Start()
{
	sprite.DoAnim("down");
	moveSpeed = -downmoveSpeed;
}

function Update () {
	transform.rigidbody.velocity = Vector3(0, moveSpeed, 0);
}

function OnCollisionEnter(collision:Collision)
{
	if(collision.transform.name == "DownDeahArea")
	{
		sprite.DoAnim("up");
		moveSpeed = upmoveSpeed;
	}
}