enum PositionType
{
	position1 = 0,
	position2 = 1,
	position3 = 2,
	position4 = 3
}

enum FoxStatus
{
	down = 1,
	up = 2,
	left = 3,
	right = 4
}

class FoxInfo
{
	public var positionIndex : PositionType;
	public var createTimer : float;
	public var fox : GameObject;
}

class FoxActionInfo
{
	public var changeTimer : float;
	public var autoInfo : AutoActionInfo[];
	public var horizontalMoveSpeed : float;
	public var verticalMoveSpeed : float;
	public var status : FoxStatus;
}

class AutoActionInfo
{
	public var name:String;
	public var skipName:String;
	public var randName : String[];
}