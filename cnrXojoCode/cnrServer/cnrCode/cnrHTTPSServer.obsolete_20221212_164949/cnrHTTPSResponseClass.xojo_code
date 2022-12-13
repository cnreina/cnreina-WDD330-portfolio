#tag Class
Protected Class cnrHTTPSResponseClass
	#tag Method, Flags = &h0
		Function cnrFile() As FolderItem
		  Return cnrFileObject
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrGetNewUUID() As String
		  Var cnrDateTimeNowVar As String = DateTime.Now.ToString
		  Var cnrDateTimeMillisecondsVar As String = DateTime.Now.Nanosecond.ToString
		  Var cnrHashSourceVar As String = cnrDateTimeNowVar + cnrDateTimeMillisecondsVar
		  
		  Var cnrMD5MemoryBlockVar As MemoryBlock
		  cnrMD5MemoryBlockVar = Crypto.MD5(cnrHashSourceVar)
		  
		  Var cnrMD5HexStringVar As String = EncodeHex(cnrMD5MemoryBlockVar)
		  
		  Return cnrMD5HexStringVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrHTTPVersion() As String
		  Return cnrHTTPVersionString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrLastErrorMessage() As String
		  Return cnrLastErrorMessageString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrResponseBody() As String
		  Return cnrResponseBodyString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrResponseHeaders() As cnrStringDictionaryClass
		  Return cnrResponseHeadersObject
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrResponseID() As String
		  Return cnrResponseIDString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSentTime() As String
		  Return cnrResponseSentTime
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSessionID() As String
		  Return cnrSessionIDString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetFile(cnrDataParam As FolderItem)
		  cnrFileObject = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetHTTPVersion(cnrDataParam As String)
		  cnrHTTPVersionString = cnrDataParam
		  
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
		  cnrLastErrorMessageString = String.FromArray(cnrStringBuilderVar, EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetResponseBody(cnrDataParam As String)
		  cnrResponseBodyString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetResponseID(cnrDataParam As String)
		  cnrResponseIDString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetSentTime(cnrDataParam As String)
		  cnrResponseSentTime = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetSessionID(cnrDataParam As String)
		  cnrSessionIDString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetSocketID(cnrDataParam As String)
		  cnrSocketIDString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSetStatusCode(cnrDataParam As String)
		  cnrStatusCodeString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSocketID() As String
		  Return cnrSocketIDString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrStartLine() As String
		  Return cnrHTTPVersionString + " " + cnrStatusCodeString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrStatusCode() As String
		  Return cnrStatusCodeString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrString() As String
		  Var cnrStringBuilderArrayVar() As String
		  cnrStringBuilderArrayVar.Add(cnrStartLine)
		  
		  // headers
		  If cnrResponseHeadersObject.cnrKeyCount > 0 Then
		    Var cnrCountVar As Integer = -1
		    Var cnrTotalCountVar As Integer = cnrResponseHeadersObject.cnrKeyCount - 1
		    For cnrCountVar = 0 To cnrTotalCountVar
		      cnrStringBuilderArrayVar.Add(cnrResponseHeadersObject.cnrGetKeyByIndex(cnrCountVar) + ": " + cnrResponseHeadersObject.cnrGetValueByIndex(cnrCountVar))
		    Next
		  End If
		  
		  Var cnrStringVar As String = String.FromArray(cnrStringBuilderArrayVar, EndOfLine.CRLF)
		  
		  Return cnrStringVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor()
		  cnrLastErrorMessageString = ""
		  cnrLastErrorMessageString = cnrLastErrorMessageString.DefineEncoding(Encodings.UTF8)
		  cnrHTTPVersionString = ""
		  cnrHTTPVersionString = cnrHTTPVersionString.DefineEncoding(Encodings.UTF8)
		  cnrResponseBodyString = ""
		  cnrResponseBodyString = cnrResponseBodyString.DefineEncoding(Encodings.UTF8)
		  cnrResponseIDString = ""
		  cnrResponseIDString = cnrResponseIDString.DefineEncoding(Encodings.UTF8)
		  cnrResponseSentTime = ""
		  cnrResponseSentTime = cnrResponseSentTime.DefineEncoding(Encodings.UTF8)
		  cnrSessionIDString = ""
		  cnrSessionIDString = cnrSessionIDString.DefineEncoding(Encodings.UTF8)
		  cnrStatusCodeString = ""
		  cnrStatusCodeString = cnrStatusCodeString.DefineEncoding(Encodings.UTF8)
		  cnrSocketIDString = ""
		  cnrSocketIDString = cnrSocketIDString.DefineEncoding(Encodings.UTF8)
		  
		  Var cnrNewHeadersVar As cnrStringDictionaryClass = New cnrStringDictionaryClass
		  If cnrNewHeadersVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewHeadersVar = Nil")
		    Return
		  End If
		  cnrResponseHeadersObject = cnrNewHeadersVar
		  
		End Sub
	#tag EndMethod


	#tag Note, Name = README
		Copyright Carlos N Reina
		cnreina@gmail.com
		
		Class cnrHTTPRequestClass
		----------------------------------------------------------
		
		Stand alone class. Does not subclass.
		Implements TCP socket as internal component to maintain
		independence and make it easier to update, upgrade, or change.
		
		
		
	#tag EndNote

	#tag Note, Name = TODO
		
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrFileObject As FolderItem
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrHTTPVersionString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLastErrorMessageString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrResponseBodyString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrResponseHeadersObject As cnrStringDictionaryClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrResponseIDString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrResponseSentTime As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSessionIDString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSocketIDString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrStatusCodeString As String
	#tag EndProperty


	#tag Constant, Name = cnrHTTP_REQUEST_METHOD_GET_CONST, Type = String, Dynamic = False, Default = \"GET", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_REQUEST_METHOD_POST_CONST, Type = String, Dynamic = False, Default = \"POST", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_OK_CONST, Type = String, Dynamic = False, Default = \"200 OK", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_VERSION_CONST, Type = String, Dynamic = False, Default = \"HTTP/1.1", Scope = Private
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
