//~ private enum FoxStatus
//~ {
	//~ down = 1,
	//~ up = 2,
	//~ left = 3,
	//~ right = 4
//~ }
private var isDie : boolean = false;
private var completeDropFruit : boolean = false;
private var moveSpeed : float= 0;
private var currStatus : FoxStatus;
private var multiple : int = 1;
private var hitCount : int = 0;
private var currActionInfoIndex : int = 0;
private var waitForDelegate : boolean = false;
private var downDieSpeed : float = -120;

public var score : int = 100;
public var sprite : PackedSprite;
private var horizontalMoveSpeed : float = 0;	
private var verticalMoveSpeed : float = 0;
private var bFoxAttack:boolean = false;
public var foxScore : GameObject;
public var foxActionInfo : FoxActionInfo[];
public var downCanHit : boolean;
public var bShield : boolean;
public var hitHedgehogHeight : float;
public var totalHitCount : int = 1;

function Start()
{
	StartCoroutine("OnAutoChangeAction");
	EventSystem.AddObserver(this, "OnRefreshMultiple");
}

function OnRefreshMultiple(notify : Notification)
{
	multiple = notify.data;
}

function RefreshMultiple(data : int)
{
	multiple = data;
}

function OnAutoChangeAction()
{
	for(var i = 0; i < foxActionInfo.Length; i++)
	{
		currActionInfoIndex = i;
		yield WaitForSeconds(foxActionInfo[i].changeTimer);
		horizontalMoveSpeed = foxActionInfo[i].horizontalMoveSpeed;
		verticalMoveSpeed = foxActionInfo[i].verticalMoveSpeed;
		currStatus = foxActionInfo[i].status;
		if(!isDie && !waitForDelegate)
		{
			if(foxActionInfo[i].autoInfo.Length > hitCount)
			{
				if(foxActionInfo[i].autoInfo[hitCount].randName.Length > 0)
				{
					var index : int = Random.value * foxActionInfo[i].autoInfo[hitCount].randName.Length;
					if(foxActionInfo[i].autoInfo[hitCount].randName[index] != "")
						sprite.DoAnim(foxActionInfo[i].autoInfo[hitCount].randName[index]);
				}
				else
				{
					if(foxActionInfo[i].autoInfo[hitCount].name != "")
						sprite.DoAnim(foxActionInfo[i].autoInfo[hitCount].name);
				}
			}
		}
		else
			break;
	}
}

function OnCollisionEnter(collision:Collision)
{
	if(collision.transform.tag=="bullet" && !isDie)
		OnBulletCollision(collision);
	else if(collision.transform.name == "Floor")
	{
		downDieSpeed = 0;
		yield WaitForSeconds(0.3);
		Destroy(this.gameObject);
	}
	else if(collision.transform.name == "DownDeahArea") {
		OnDeahAreaCollision();
	}
	else if(collision.transform.name == "Balloon(Clone)") {
		isDie = true;
		DestroyFox();
	}
}

function OnDeahAreaCollision()
{
	sprite.DoAnim("up_has_fruit");
	currStatus = FoxStatus.up;
}

function OnBulletCollision(collision:Collision)
{
	if(currStatus ==  FoxStatus.down)
		OnFoxDown(collision);
	else if(currStatus == FoxStatus.up)
		OnFoxUp(collision);
		
	OnDisplaySkipName();
}

function OnFoxDown(collision:Collision)
{
	if(downCanHit)
	{
		totalHitCount--;
		hitCount++;
		Destroy(collision.gameObject);
		if(totalHitCount <= 0)
			isDie = true;
		DestroyFox();
	}
	else
		//collision.rigidbody.AddForce(10000, -10000, 0);
		Destroy(collision.gameObject);
}

function OnFoxUp(collision:Collision)
{
	if(!bShield) {
		totalHitCount--;
		hitCount++;
		if(totalHitCount == 0)
		{
			Destroy(collision.gameObject);
		}
		else
		{
			Destroy(collision.gameObject);
			if(totalHitCount <= 0)
				isDie = true;
			DestroyFox();
		}
	}
	else {
		Destroy(collision.gameObject);
	}
}

function OnDisplaySkipName()
{
	if(foxActionInfo[currActionInfoIndex].autoInfo.Length > hitCount && foxActionInfo[currActionInfoIndex].autoInfo[hitCount].skipName != "")
	{
		sprite.DoAnim(foxActionInfo[currActionInfoIndex].autoInfo[hitCount].skipName);
		waitForDelegate = true;
		sprite.SetAnimCompleteDelegate(OnCompleteDropFruit);
	}
}

function OnCompleteDropFruit(sprt:SpriteBase)
{
	if(foxActionInfo[currActionInfoIndex].autoInfo.Length > hitCount)
		sprite.DoAnim(foxActionInfo[currActionInfoIndex].autoInfo[hitCount].name);
		
	waitForDelegate = false;
}

function OnTriggerEnter(other : Collider)
{
	if(!isDie && other.gameObject.transform.tag=="bullet")
	{
		isDie = true;
		DestroyFox();
	}
}

function DestroyFox()
{
	if(isDie)
	{
		EventSystem.Send(this, "OnBulletDestroy", this);
		EventSystem.Send(this, "OnHitFoxSuccess", score * multiple);
		EventSystem.Send(this, "OnFoxDestory");
		var scoreObj : GameObject = Instantiate(foxScore, transform.position, transform.rotation);
		scoreObj.BroadcastMessage("DisplayScore", score * multiple);
		EventSystem.Send(this, "OnAddMultiple");
		Die();
	}
}

function Die()
{
	if(currStatus ==  FoxStatus.down)
		sprite.DoAnim("down_die");
	else if(currStatus == FoxStatus.up)
	{
		sprite.DoAnim("up_die");
		yield WaitForSeconds(0.5);
		sprite.DoAnim("drop_down");
	}
}

function FoxAttack() {
	if(!bFoxAttack) {
		EventSystem.Send(this,"OnFoxAttack");
		bFoxAttack = true;
	}
}

function Update () {
	if(!isDie) {
		transform.position += Vector3(horizontalMoveSpeed * Time.deltaTime, verticalMoveSpeed * Time.deltaTime, 0);
		if(transform.position.y >= hitHedgehogHeight) {
			FoxAttack();
		}
	}
	else
		transform.position += Vector3(0,downDieSpeed * Time.deltaTime,0);
}