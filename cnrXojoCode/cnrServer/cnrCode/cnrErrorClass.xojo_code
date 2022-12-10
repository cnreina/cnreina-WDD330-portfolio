#tag Class
Protected Class cnrErrorClass
	#tag Method, Flags = &h0
		Sub cnrAddError(cnrOriginParam As String, cnrMessageParam As String)
		  Var cnrErrorObjectVar As New cnrErrorClass
		  cnrErrorObjectVar.cnrOrigin = cnrOriginParam
		  cnrErrorObjectVar.cnrMessage = cnrMessageParam
		  cnrErrorObjectVar.cnrTime = DateTime.Now.ToString
		  
		  cnrErrorsArray.Add(cnrErrorObjectVar)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetCount() As Integer
		  Return cnrErrorsArray.LastIndex + 1
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetErrorsArray() As cnrErrorClass()
		  Return cnrErrorsArray
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetErrorsString() As String
		  If cnrErrorsArray.LastIndex < 0 Then
		    Return ""
		  End If
		  
		  Var cnrStringBuilderVar() As String
		  Var cnrTotalErrorsVar As Integer = cnrErrorsArray.LastIndex + 1
		  Var cnrErrorNumberVar As Integer
		  Var cnrCounterVar As Integer
		  For cnrCounterVar = 0 To cnrErrorsArray.LastIndex
		    cnrErrorNumberVar = cnrCounterVar + 1
		    cnrStringBuilderVar.Add("Error " + cnrErrorNumberVar.ToString + " of " + cnrTotalErrorsVar.ToString)
		    If Not cnrErrorsArray(cnrCounterVar).cnrTime.IsEmpty Then
		      cnrStringBuilderVar.Add("Time: " + cnrErrorsArray(cnrCounterVar).cnrTime)
		    End If
		    If Not cnrErrorsArray(cnrCounterVar).cnrOrigin.IsEmpty Then
		      cnrStringBuilderVar.Add("Origin: " + cnrErrorsArray(cnrCounterVar).cnrOrigin)
		    End If
		    If Not cnrErrorsArray(cnrCounterVar).cnrMessage.IsEmpty Then
		      cnrStringBuilderVar.Add("Message: " + cnrErrorsArray(cnrCounterVar).cnrMessage)
		    End If
		    cnrStringBuilderVar.Add(" ")
		  Next
		  
		  Var cnrErrorsArraytringVar As String = String.FromArray(cnrStringBuilderVar, EndOfLine)
		  Return cnrErrorsArraytringVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrGetErrorString() As String
		  If cnrErrorsArray.LastIndex < 0 Then
		    Return ""
		  End If
		  
		  Var cnrStringBuilderVar() As String
		  If Not cnrTime.IsEmpty Then
		    cnrStringBuilderVar.Add("Time: " + cnrTime)
		  End If
		  If Not cnrOrigin.IsEmpty Then
		    cnrStringBuilderVar.Add("Origin: " + cnrOrigin)
		  End If
		  If Not cnrMessage.IsEmpty Then
		    cnrStringBuilderVar.Add("Message: " + cnrMessage)
		  End If
		  
		  Var cnrErrorsArraytringVar As String = String.FromArray(cnrStringBuilderVar, EndOfLine)
		  Return cnrErrorsArraytringVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetLastError() As cnrErrorClass
		  If cnrErrorsArray.LastIndex >= 0 Then
		    Return cnrErrorsArray(cnrErrorsArray.LastIndex)
		  End If
		  
		  Return Nil
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrGetLastErrorString() As String
		  If cnrErrorsArray.LastIndex >= 0 Then
		    Return cnrErrorsArray(cnrErrorsArray.LastIndex).cnrGetErrorString
		  End If
		  
		  Return ""
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor()
		  
		End Sub
	#tag EndMethod


	#tag Note, Name = TODO
		
		cnrErrorsArraytruct as cnrErrorClass (private methods and properties)
		cnrErrorClass > Methods > getLastErrorObject returns last instance of self from array.
		cnrErrorClass > Constants > cnrERROR_HTTP_NOT_FOUND = '404 Not Found', cnrERROR_HTTP_SERVER_ERROR = '500 Server Error', Etc
		cnrErrorClass > cnrErrorsArraytruct > cnrErrorProtocol > cnrERROR_PROTOCOL_HTTP, cnrERROR_PROTOCOL_CNR, cnrERROR_PROTOCOL_UDP, Etc.
		cnrErrorClass > cnrErrorsArraytruct > cnrErrorOrigin > cnrERROR_ORIGIN_SERVER, cnrERROR_ORIGIN_CLIENT, Etc.
		cnrErrorClass > cnrErrorsArraytruct > cnrErrorsArrayource > CurrentMethodName, Etc.
		cnrErrorClass > cnrErrorsArraytruct > cnrErrorMessage > string.
		
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrErrorsArray() As cnrErrorClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrMessage As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrOrigin As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrTime As String
	#tag EndProperty


	#tag Constant, Name = cnrERROR_PROTOCOL_HTTP, Type = String, Dynamic = False, Default = \"http-TEST-CONST", Scope = Public
	#tag EndConstant


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
