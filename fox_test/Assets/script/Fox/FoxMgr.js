var positionList : Vector3[];
public var info : FoxInfo[];
private var hitCount : int = 0;
private var multiple : int = 1;
private var type : int = 1;

function Start()
{
	EventSystem.AddObserver(this, "OnGameStart");
	EventSystem.Send(this, "OnCalcTotalFox", info.Length);
	EventSystem.AddObserver(this, "OnHitFoxSuccess");
	EventSystem.AddObserver(this, "OnCleanMultiple");
	EventSystem.AddObserver(this, "OnAddMultiple");
	EventSystem.AddObserver(this, "OnMultipleType");
}

function OnGameStart()
{
	StartCoroutine("CreateFox");
}

function CreateFox()
{
	for(var i = 0; i<=info.Length - 1; i++)
	{
		yield WaitForSeconds (info[i].createTimer);
		var obj : GameObject = Instantiate(info[i].fox, positionList[info[i].positionIndex], Quaternion.identity);
		//~ obj.SendMessage("RefreshMultiple", multiple);
		EventSystem.Send(this, "OnCreateFox", info[i].positionIndex);
	}
}


function OnHitFoxSuccess()
{
	hitCount++;
	if(hitCount >= info.length)
	{
		Application.LoadLevel(0);
	}
}

function OnCleanMultiple()
{
	multiple = 1;
	EventSystem.Send(this, "OnRefreshMultiple", multiple);
}

function OnMultipleType(notify : Notification)
{
	type = notify.data;
}

function OnAddMultiple()
{
	if(multiple == 3)
		EventSystem.Send(this, "OnDisplayCombox", 1);
	else if(multiple == 4)
		EventSystem.Send(this, "OnDisplayCombox", 2);
	else if(multiple > 4)
		EventSystem.Send(this, "OnDisplayCombox", 3);
	
	CalcMultiple();
	EventSystem.Send(this, "OnRefreshMultiple", multiple);
}

function CalcMultiple()
{
	if(type == 1)
	{
		if(multiple >= 9)
			multiple = 9;
		else
			multiple++;
	}
	else if(type == 2)
	{
		if(multiple >= 8)
			multiple = 8;
		else
			multiple = multiple * 2;
	}
}
