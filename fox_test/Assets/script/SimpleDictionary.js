import System;
import System.IO;

class SimpleDictionary extends ScriptableObject {
    public static var keys = new Array();
    public static var values = new Array();

    static function Get( key : String ) : String {
        for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                return( values[i] );
            }
        }
    
        return "";
    }

    static function Set( key : String, val : String ) {
        for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                values[i] = val;
                return;
            }
        }
    
        keys.push( key );
        values.push( val );
    }
    
    static function Remove( key : String ){
        for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                keys.RemoveAt(i);
                values.RemoveAt(i);
                return;
            }
        }
        print( "SimpleDictionary.Remove failed, key not found: " + key );
    }
	
	static function Contains( key : String){
		for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                return true;
            }
        }
		
		return false;
	}

    function Save( fileName : String ){
        var sw : StreamWriter = new StreamWriter ( Application.dataPath + "/" + fileName );
        for(var i = 0; i < keys.length; i++){
            sw.WriteLine( keys[i] + "=" + values[i] );
        }
        sw.Close ();
        print ( "SimpleDictionary.Saved " + Application.dataPath + "/" + fileName );
    }

    function Load( fileName : String ) : SimpleDictionary {
        keys = new Array();
        values = new Array();
    
        var line : String = "-";
        var offset : int;
        try {
            var sr : StreamReader = new StreamReader ( Application.dataPath + "/" + fileName );
            line = sr.ReadLine();
        while (line != null) {
            offset = line.IndexOf("=");
                if( offset > 0 ){
                    Set( line.Substring(0, offset), line.Substring(offset+1) );
                }
                line = sr.ReadLine();
        }
            sr.Close();
            print ( "SimpleDictionary.Loaded " + Application.dataPath + "/" + fileName );
        }
        catch (e) {
            print ( "SimpleDictionary.Load failed: " + Application.dataPath + "/" + fileName );
        }
    }

    function Count(){
        return keys.length;
    }
}