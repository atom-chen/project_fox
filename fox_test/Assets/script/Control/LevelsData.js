import System;  
import System.Xml;  
import System.Xml.Serialization;  
import System.IO;  
import System.Text; 

public var isSaveToXML:boolean = false;
  
//Լ������  
class LevelData  
{
	var levelClass:int;
	var levelIdx:int;
	var levelHelp:boolean;
	var levelPass:boolean;
	var scoreBase:int;
	var scoreGood:int;
	var score:int;
}  
  
//����Լ��  
class UserData  
{  
    public var _iUser : LevelData = new LevelData(); 
    //function UserData() { }  
}

private var _FileLocation : String;  
private var _FileName : String = "LevelsData.xml";  
private var _data;  
public var uData : UserData[];  

function LevelIsPass(Idx:int) : boolean {
	for(var value in uData) {
		if(value._iUser.levelIdx == Idx) {
			if(value._iUser.levelPass)
				return true;
		}
	}
	return false;
}

function LevelPass(Idx:int) {
	for(var value in uData) {
		if(value._iUser.levelIdx == Idx) {
			value._iUser.levelPass = true;
			break;
		}
	}
}

function LevelHelpDone(Idx:int) {
	for(var value in uData) {
		if(value._iUser.levelIdx == Idx) {
			value._iUser.levelHelp = true;
			break;
		}
	}
}

function LevelScoreGrade(Idx:int,score:int) : int {
	for(var value in uData) {
		if(value._iUser.levelIdx == Idx) {
			if(value._iUser.scoreBase >= score)
				return 0;
			if(value._iUser.scoreBase < score && value._iUser.scoreGood >= score)
				return 1;
			if(value._iUser.scoreGood < score)
				return 2;
			break;
		}
	}
}

function SetLevelScore(idx:int,score:int) {
	for(var value in uData) {
		if(value._iUser.levelIdx == idx) {
			value._iUser.score = score;
			break;
		}
	}
}

function GetLevelScore(idx:int) {
	for(var value in uData) {
		if(value._iUser.levelIdx == idx) {
			return value._iUser.score;
		}
	}
}
  
function Awake()  
{  
	if(isSaveToXML) {
		_FileLocation = Application.dataPath;
		var fileInfo : FileInfo = new FileInfo(_FileLocation+"/"+ _FileName); 
		if(fileInfo.Exists)
			Load();
		else
			Save();
	}
}  
  
function Start()  
{ 
	DontDestroyOnLoad(this);
}  
  
//ʵ��һ�� TextWriter��ʹ����һ���ض��ı���������д���ַ���   
var streamWriter : StreamWriter;  
  
function Save()  
{	//�������ݵ�ָ����XMl��  
    //FileInfo ����������������ļ�ʱ�������� I/O ����  
    var fileInfo : FileInfo = new FileInfo(_FileLocation+"/"+ _FileName);  
    var streamWriter : StreamWriter; 
	if(fileInfo.Exists) 
	{
		//fileInfo.Delete();  
		streamWriter = fileInfo.CreateText();  
	} 
	else
	{
		streamWriter = fileInfo.CreateText();  
	}
	for(value in uData) {
		_data = SerializeObject(value);  
		streamWriter.WriteLine(_data); 
	}	
    streamWriter.Close();  
}  
  
function Load()  
{//��ȡ������XML�������  
    var streamReader : StreamReader = File.OpenText(_FileLocation+"/"+ _FileName);
	var i:int = 0;
	var _data = streamReader.ReadLine();
	while(_data != null) {
		uData[i] = DeserializeObject(_data); 
		_data = streamReader.ReadLine();
		i++;
	}
    streamReader.Close();  
} 
  
function UTF8ByteArrayToString(characters : byte[] )  
{  
    var encoding : UTF8Encoding = new UTF8Encoding();  
    var constructedString : String = encoding.GetString(characters);  
    return (constructedString);  
}  
  
//byte[] StringToUTF8ByteArray(string pXmlString)  
function StringToUTF8ByteArray(pXmlString : String)  
{  
    var encoding : UTF8Encoding = new UTF8Encoding();  
    var byteArray : byte[] = encoding.GetBytes(pXmlString);  
    return byteArray;  
}  
  
// Here we serialize our UserData object of myData  
//string SerializeObject(object pObject)  
function SerializeObject(pObject : Object)  
{  
    var XmlizedString : String = null;  
    //������֧�ִ洢��Ϊ�ڴ������  
    var memoryStream : MemoryStream = new MemoryStream();  
    //���������л��� XML �ĵ��кʹ� XML �ĵ��з����л�����  
    var xs : XmlSerializer = new XmlSerializer(typeof(UserData));  
    //��ʾ�ṩ���١��ǻ��桢ֻ�������ı�д�����÷������ɰ��� XML ���ݵ������ļ�  
    var xmlTextWriter : XmlTextWriter = new XmlTextWriter(memoryStream, Encoding.UTF8);  
      
    xs.Serialize(xmlTextWriter, pObject);  
    memoryStream = xmlTextWriter.BaseStream; // (MemoryStream)  
    XmlizedString = UTF8ByteArrayToString(memoryStream.ToArray());  
    return XmlizedString;  
}  
  
// Here we deserialize it back into its original form  
//object DeserializeObject(string pXmlizedString)  
function DeserializeObject(pXmlizedString : String)  
{  
    var xs : XmlSerializer = new XmlSerializer(typeof(UserData));  
    var memoryStream : MemoryStream = new MemoryStream(StringToUTF8ByteArray(pXmlizedString));  
    var xmlTextWriter : XmlTextWriter = new XmlTextWriter(memoryStream, Encoding.UTF8);  
    return xs.Deserialize(memoryStream);  
}  