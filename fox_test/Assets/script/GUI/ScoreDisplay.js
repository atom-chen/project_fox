var displayIndex : int = 0;
var sprite : PackedSprite;

function DisplayScore(score : int)
{
	var strScore = score.ToString();
	var scoreLength = score.ToString().Length;
	if(scoreLength - 1 >= displayIndex)
	{
		sprite.DoAnim(strScore.Substring(scoreLength - displayIndex - 1, 1));
	}
}