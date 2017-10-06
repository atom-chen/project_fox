var displayIndex : int = 0;
var sprite : PackedSprite;

function Start () {
	EventSystem.AddObserver(this, "OnDisplayScoret");
}

function OnDisplayScoret(notify : Notification)
{
	var score = notify.data;
	var strScore = score.ToString();
	var scoreLength = score.ToString().Length;
	print(strScore.Substring(scoreLength - displayIndex - 1, scoreLength - displayIndex));
	if(scoreLength - 1 >= displayIndex)
	{
		sprite.DoAnim(strScore.Substring(scoreLength - displayIndex - 1, scoreLength - displayIndex));
	}
}
