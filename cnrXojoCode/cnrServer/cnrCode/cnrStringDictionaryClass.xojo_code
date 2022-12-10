#tag Class
Protected Class cnrStringDictionaryClass
	#tag Method, Flags = &h0
		Sub cnrAddKeyByName(cnrKeyNameParam As String)
		  If cnrKeyNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Key Is Empty")
		    Return
		  End If
		  
		  If cnrGetKeyIndexByName(cnrKeyNameParam) > 0 Then
		    cnrSetLastError(CurrentMethodName, "Key Exists")
		    Return
		  End If
		  
		  Var cnrNewPairVar As cnrStringPairStruct = New cnrStringPairStruct(cnrKeyNameParam, "")
		  cnrDataArray.Add(cnrNewPairVar)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrAddKeyValuePair(cnrKeyParam As String, cnrValueParam As String)
		  If cnrKeyParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Key Is Empty")
		    Return
		  End If
		  
		  If cnrGetKeyIndexByName(cnrKeyParam) > 0 Then
		    cnrSetLastError(CurrentMethodName, "Key Exists")
		    Return
		  End If
		  
		  Var cnrNewPairVar As cnrStringPairStruct = New cnrStringPairStruct(cnrKeyParam, cnrValueParam)
		  cnrDataArray.Add(cnrNewPairVar)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetKeyByIndex(cnrIndexParam As Integer) As String
		  If cnrIndexParam < 0 Or cnrIndexParam > cnrDataArray.LastIndex Then
		    cnrSetLastError(CurrentMethodName, "Index Out of Range")
		    Return ""
		  End If
		  
		  Return cnrDataArray(cnrIndexParam).cnrKey
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetKeyIndexByName(cnrNameParam As String) As Integer
		  If cnrNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Name Is Empty")
		    Return -1
		  End If
		  If cnrDataArray.Count < 0 Then
		    Return -1
		  End If
		  
		  Var cnrKeyCountVar As Integer = cnrDataArray.LastIndex
		  Var cnrKeyIndexVar As Integer = 0
		  For cnrKeyIndexVar = 0 To cnrKeyCountVar
		    If cnrDataArray(cnrKeyIndexVar).cnrKey = cnrNameParam Then
		      Return cnrKeyIndexVar
		    End If
		  Next
		  
		  Return -1
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetKeyValuePairByIndex(cnrIndexParam As Integer, cnrSeparatorParam As String) As String
		  If cnrIndexParam < 0 Or cnrIndexParam > cnrDataArray.LastIndex Then
		    cnrSetLastError(CurrentMethodName, "Index Out Of Range")
		    Return ""
		  End If
		  
		  If cnrSeparatorParam.IsEmpty Then
		    Return cnrDataArray(cnrIndexParam).cnrKey + ":" + cnrDataArray(cnrIndexParam).cnrValue
		  End If
		  
		  Return cnrDataArray(cnrIndexParam).cnrKey + cnrSeparatorParam + cnrDataArray(cnrIndexParam).cnrValue
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetValueByIndex(cnrIndexParam As Integer) As String
		  If cnrIndexParam < 0 Or cnrIndexParam > cnrDataArray.LastIndex Then
		    cnrSetLastError(CurrentMethodName, "Index Out Of Range")
		    Return ""
		  End If
		  
		  Return cnrDataArray(cnrIndexParam).cnrValue
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetValueByKeyName(cnrNameParam As String) As String
		  If cnrNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Name Is Empty")
		    Return ""
		  End If
		  If cnrDataArray.Count < 0 Then
		    Return ""
		  End If
		  
		  Var cnrKeyCountVar As Integer = cnrDataArray.LastIndex
		  Var cnrKeyIndexVar As Integer = 0
		  For cnrKeyIndexVar = 0 To cnrKeyCountVar
		    If cnrDataArray(cnrKeyIndexVar).cnrKey = cnrNameParam Then
		      Return cnrDataArray(cnrKeyIndexVar).cnrValue
		    End If
		  Next
		  
		  Return ""
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrHasKey(cnrNameParam As String) As Boolean
		  If cnrNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Name Is Empty")
		    Return False
		  End If
		  If cnrDataArray.Count < 0 Then
		    Return False
		  End If
		  
		  If cnrGetKeyIndexByName(cnrNameParam) >= 0 Then
		    Return True
		  End If
		  
		  Return False
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrKeyCount() As Integer
		  Return cnrDataArray.Count
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrLastErrorMessage() As String
		  Return cnrLastErrorMessage
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrRenameKeyByKeyName(cnrKeyNameParam As String, cnrNewKeyNameParam As String)
		  If cnrKeyNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Key Name Is Empty")
		    Return
		  End If
		  If cnrNewKeyNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed New Key Name Is Empty")
		    Return
		  End If
		  If cnrDataArray.Count < 0 Then
		    Return
		  End If
		  
		  // find key
		  Var cnrKeyIndexVar As Integer = cnrGetKeyIndexByName(cnrKeyNameParam)
		  If cnrKeyIndexVar >= 0 Then
		    // rename key
		    cnrDataArray(cnrKeyIndexVar).cnrKey(cnrNewKeyNameParam)
		    Return
		  End If
		  
		  // key not found - create new entry
		  cnrAddKeyByName(cnrNewKeyNameParam)
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSetLastError(cnrOriginParam As String, cnrMessageParam As String)
		  If cnrOriginParam.IsEmpty Then
		    Return
		  End If
		  If cnrMessageParam.IsEmpty Then
		    Return
		  End If
		  
		  // save
		  Var cnrStringBuilderVar() As String
		  cnrStringBuilderVar.Add("Time: " + DateTime.Now.ToString)
		  cnrStringBuilderVar.Add("Origin: " + cnrOriginParam)
		  cnrStringBuilderVar.Add("Message: " + cnrMessageParam)
		  cnrLastErrorMessage = String.FromArray(cnrStringBuilderVar, EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetValueByKeyName(cnrKeyNameParam As String, cnrNewValueParam As String)
		  If cnrKeyNameParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "Passed Key Name Is Empty")
		    Return
		  End If
		  If cnrDataArray.Count < 0 Then
		    Return
		  End If
		  
		  // find key
		  Var cnrKeyIndexVar As Integer = cnrGetKeyIndexByName(cnrKeyNameParam)
		  If cnrKeyIndexVar >= 0 Then
		    // add value
		    cnrDataArray(cnrKeyIndexVar).cnrValue(cnrNewValueParam)
		    Return
		  End If
		  
		  // key not found - create new entry
		  cnrAddKeyValuePair(cnrKeyNameParam, cnrNewValueParam)
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrToString() As String
		  If cnrDataArray.Count < 0 Then
		    Return ""
		  End If
		  
		  Var cnrStringBuilderVar() As String
		  Var cnrKeyCountVar As Integer = cnrDataArray.LastIndex
		  Var cnrKeyIndexVar As Integer = 0
		  For cnrKeyIndexVar = 0 To cnrKeyCountVar
		    cnrStringBuilderVar.Add(cnrDataArray(cnrKeyIndexVar).cnrPair)
		  Next
		  
		  Return String.FromArray(cnrStringBuilderVar, EndOfLine)
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor()
		  cnrLastErrorMessage = ""
		  cnrLastErrorMessage = cnrLastErrorMessage.DefineEncoding(Encodings.UTF8)
		  
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h21
		Private cnrDataArray() As cnrStringPairStruct
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLastErrorMessage As String
	#tag EndProperty


	#tag ViewBehavior
		#tag ViewProperty
			Name="Name"
			Visible=true
			Group="ID"
			InitialValue=""
			Type="String"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Index"
			Visible=true
			Group="ID"
			InitialValue="-2147483648"
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Super"
			Visible=true
			Group="ID"
			InitialValue=""
			Type="String"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Left"
			Visible=true
			Group="Position"
			InitialValue="0"
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Top"
			Visible=true
			Group="Position"
			InitialValue="0"
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
	#tag EndViewBehavior
End Class
#tag EndClass
