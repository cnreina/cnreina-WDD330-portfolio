#tag Class
Protected Class cnrHTTPSRequestClass
	#tag Method, Flags = &h0
		Sub cnrAppendToBody(cnrDataParam As String)
		  cnrBodyString = cnrBodyString + cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrBody() As String
		  Return cnrBodyString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrBodyFields() As cnrStringDictionaryClass
		  Return cnrBodyFieldsObject
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrCookies() As cnrStringDictionaryClass
		  Return cnrCookiesObject
		  
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
		Function cnrHeaders() As cnrStringDictionaryClass
		  Return cnrHeadersObject
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrHTTPVersion() As String
		  Return cnrHTTPVersionString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrLastErrorMessage() As String
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrMethod() As String
		  Return cnrRequestMethodString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrPath() As String
		  Return cnrPathString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrQueryString() As String
		  Return cnrRequestQueryString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrQueryStringFields() As cnrStringDictionaryClass
		  Return cnrRequestQueryStringFields
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrReceivedTime() As String
		  Return cnrRequestReceivedTime
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrRequestID() As String
		  Return cnrRequestIDString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrResponse() As cnrHTTPResponseClass
		  Return cnrResponseObject
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSessionID() As String
		  Return cnrSessionIDString
		  
		End Function
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
		Sub cnrSetSessionID(cnrDataParam As String)
		  cnrSessionIDString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSetSocketID(cnrDataParam As String)
		  cnrSocketIDString = cnrDataParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSocketID() As String
		  Return cnrSocketIDString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrStartLine() As String
		  Return cnrRequestStartLine
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrString() As String
		  Return cnrRequestString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor(cnrRequestMessageParam as String)
		  If cnrRequestMessageParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestMessageParam.IsEmpty")
		    Return
		  End If
		  
		  // HEADERS
		  Var cnrNewHeadersVar As cnrStringDictionaryClass = New cnrStringDictionaryClass
		  If cnrNewHeadersVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewHeadersVar = Nil")
		    Return
		  End If
		  cnrHeadersObject = cnrNewHeadersVar
		  
		  // COOKIES
		  Var cnrNewCookiesVar As cnrStringDictionaryClass = New cnrStringDictionaryClass
		  If cnrNewCookiesVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewCookiesVar = Nil")
		    Return
		  End If
		  cnrCookiesObject = cnrNewCookiesVar
		  
		  // QUERY STRING
		  Var cnrQueryStringFieldsVar As cnrStringDictionaryClass = New cnrStringDictionaryClass
		  If cnrQueryStringFieldsVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrQueryStringFieldsVar = Nil")
		    Return
		  End If
		  cnrRequestQueryStringFields = cnrQueryStringFieldsVar
		  
		  // BODY FIELDS
		  Var cnrRequestBodyFieldsVar As cnrStringDictionaryClass = New cnrStringDictionaryClass
		  If cnrRequestBodyFieldsVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestBodyFieldsVar = Nil")
		    Return
		  End If
		  cnrBodyFieldsObject = cnrRequestBodyFieldsVar
		  
		  // RESPONSE
		  Var cnrResponseVar As cnrHTTPResponseClass = New cnrHTTPResponseClass
		  If cnrResponseVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrResponseVar = Nil")
		    Return
		  End If
		  cnrResponseObject = cnrResponseVar
		  
		  
		  //********** PROCESS HTTP REQUEST
		  
		  Var cnrRequestMessageVar As String = cnrRequestMessageParam
		  cnrRequestMessageVar = cnrRequestMessageVar.DefineEncoding(Encodings.UTF8)
		  
		  cnrRequestReceivedTime = DateTime.Now.ToString
		  
		  Var cnrRequestStringBuilderArrayVar() As String
		  
		  // default request id
		  // will be overriden by id from X-Request-ID header if present
		  cnrRequestIDString = cnrGetNewUUID
		  
		  // request method
		  Var cnrRequestMethodVar As String = cnrRequestMessageVar.NthField(" ", 1)
		  If Not cnrRequestMethodVar.IsEmpty Then
		    cnrRequestMethodVar = cnrRequestMethodVar.Trim
		    cnrRequestMethodVar = cnrRequestMethodVar.ReplaceLineEndings("")
		    cnrRequestMethodString = cnrRequestMethodVar
		  End If
		  
		  // request path
		  Var cnrRequestPathVar As String = cnrRequestMessageVar.NthField(" ", 2)
		  If Not cnrRequestPathVar.IsEmpty Then
		    cnrRequestPathVar = cnrRequestPathVar.Trim
		    cnrRequestPathVar = cnrRequestPathVar.ReplaceLineEndings("")
		    cnrPathString = cnrRequestPathVar
		  End If
		  
		  // http version
		  Var cnrRequestVersionVar As String = cnrRequestMessageVar.NthField(" ", 3)
		  If Not cnrRequestVersionVar.IsEmpty Then
		    cnrRequestVersionVar = cnrRequestVersionVar.Left(cnrRequestVersionVar.IndexOf(EndOfLine.CRLF))
		    cnrRequestVersionVar = cnrRequestVersionVar.Trim
		    cnrRequestVersionVar = cnrRequestVersionVar.ReplaceLineEndings("")
		    cnrHTTPVersionString = cnrRequestVersionVar
		  End If
		  
		  // start line
		  Var cnrRequestLineVar As String = cnrRequestMethodVar + " " + cnrRequestPathVar + " " + cnrRequestVersionVar
		  cnrRequestStartLine = cnrRequestLineVar
		  cnrRequestStringBuilderArrayVar.Add(cnrRequestStartLine)
		  
		  // REQUEST QUERY STRING
		  Var cnrRequestQueryVar As String = ""
		  If cnrRequestPathVar.IndexOf("?") >= 0 Then
		    cnrRequestQueryVar = cnrRequestPathVar.NthField("?", 2)
		    If Not cnrRequestQueryVar.IsEmpty Then
		      cnrRequestQueryVar = cnrRequestQueryVar.Trim
		      cnrRequestQueryVar = cnrRequestQueryVar.ReplaceLineEndings("")
		      // cleanup path
		      cnrRequestPathVar = cnrRequestPathVar.Left(cnrRequestPathVar.IndexOf("?"))
		      cnrRequestPathVar = cnrRequestPathVar.Trim
		      cnrRequestPathVar = cnrRequestPathVar.ReplaceLineEndings("")
		      cnrPathString = cnrRequestPathVar
		      // cleanup line
		      cnrRequestLineVar = cnrRequestMethodVar + " " + cnrRequestPathVar + " " + cnrRequestVersionVar
		      cnrRequestStartLine = cnrRequestLineVar
		      // parse query string
		      Var cnrQueryArrayVar() As String = cnrRequestQueryVar.ToArray("&")
		      If cnrQueryArrayVar.LastIndex >= 0 Then
		        Var cnrQueryCountVar As Integer
		        For cnrQueryCountVar = 0 To cnrQueryArrayVar.LastIndex
		          Var cnrQueryNameVar As String = cnrQueryArrayVar(cnrQueryCountVar).NthField("=", 1)
		          cnrQueryNameVar = cnrQueryNameVar.Trim
		          cnrQueryNameVar = cnrQueryNameVar.ReplaceLineEndings("")
		          Var cnrQueryValueVar As String = cnrQueryArrayVar(cnrQueryCountVar).NthField("=", 2)
		          cnrQueryValueVar = cnrQueryValueVar.Trim
		          cnrQueryValueVar = cnrQueryValueVar.ReplaceLineEndings("")
		          If cnrQueryNameVar.IsEmpty Or cnrQueryNameVar = "" Then
		            Continue
		          End If
		          // save query string
		          cnrRequestQueryStringFields.cnrAddKeyValuePair(cnrQueryNameVar, cnrQueryValueVar)
		          cnrRequestQueryString = String.FromArray(cnrQueryArrayVar, EndOfLine.CRLF)
		        Next
		      End If
		    End If
		  End If
		  
		  // REQUEST HEADERS (RFC822)
		  // Headers occur before the message body and are terminated  by a null line (i.e., two contiguous CRLFs).
		  // A line beginning a field starts with a printable character which is not a colon.
		  // A line which continues a header field begins with a SPACE or HTAB  character.
		  // A field-name consists of one or  more  printable  characters (excluding  colon,  space, and control-characters).
		  // A field-name MUST be contained on one line.
		  // Upper and lower case are not distinguished when comparing field-names.
		  // 
		  // HEADERS:
		  //     Sec-Fetch-User
		  //     fetch metadata request header.
		  //     sent for requests initiated by user activation, and its value will always be ?1.
		  //     https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-User
		  // 
		  //     Boundary
		  //     For multipart entities the boundary directive Is required.
		  //     The directive consists Of 1 To 70 characters from a set Of characters (And Not ending With white space) known
		  //     to be very robust through email gateways.
		  //     It Is used to encapsulate the boundaries Of the multiple parts Of the message.
		  //     Often, the header boundary Is prepended With two dashes And the final boundary has two dashes appended at the End.
		  //     https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
		  
		  Var cnrRequestHeadersVar As String = cnrRequestMessageVar.NthField(EndOfLine.CRLF + EndOfLine.CRLF, 1)
		  Var cnrRequestFieldsArrayVar() As String = cnrRequestHeadersVar.Split(EndOfLine)
		  If cnrRequestFieldsArrayVar.Count > 0 Then
		    // parse headers
		    Var cnrHeaderNameVar As String = ""
		    Var cnrHeaderValueVar As String = ""
		    Var cnrFieldsCountVar As Integer = -1
		    Var cnrHeaderFieldVar As String = ""
		    For cnrFieldsCountVar = 0 To cnrRequestFieldsArrayVar.LastIndex
		      cnrHeaderFieldVar = cnrRequestFieldsArrayVar(cnrFieldsCountVar)
		      cnrHeaderFieldVar = cnrHeaderFieldVar.ReplaceAll(EndOfLine.CRLF, "")
		      cnrHeaderFieldVar = cnrHeaderFieldVar.Trim
		      If cnrHeaderFieldVar.IsEmpty Then
		        Continue
		      End If
		      cnrHeaderNameVar = cnrRequestFieldsArrayVar(cnrFieldsCountVar).NthField(": ", 1)
		      cnrHeaderValueVar = cnrRequestFieldsArrayVar(cnrFieldsCountVar).NthField(": ", 2)
		      // detect end of header fields
		      If cnrHeaderNameVar.IsEmpty And cnrHeaderValueVar.IsEmpty Then
		        Exit
		      End If
		      If cnrHeaderNameVar.BeginsWith(cnrRequestMethodVar) Then
		        Continue
		      End If
		      If cnrHeaderNameVar.IsEmpty Then
		        Continue
		      End If
		      cnrHeaderNameVar = cnrHeaderNameVar.Trim
		      cnrHeaderValueVar = cnrHeaderValueVar.Trim
		      // save header
		      cnrHeadersObject.cnrAddKeyValuePair(cnrHeaderNameVar, cnrHeaderValueVar)
		      cnrRequestStringBuilderArrayVar.Add(cnrHeaderNameVar + ": " + cnrHeaderValueVar)
		    Next
		  End If
		  
		  //  REQUEST BODY
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
		  
		  If cnrMethod.Lowercase = "post" Then
		    Var cnrContentTypeVar As String = cnrHeaders.cnrGetValueByKeyName("Content-Type")
		    If Not cnrContentTypeVar.IsEmpty Then
		      // get body
		      Var cnrBodyDataVar As String = cnrRequestMessageVar.Replace(cnrRequestMessageVar.NthField(EndOfLine.CRLF + EndOfLine.CRLF, 1), "")
		      cnrBodyDataVar = cnrBodyDataVar.Trim
		      If Not cnrBodyDataVar.IsEmpty Then
		        // save body
		        cnrBodyString = cnrBodyDataVar
		        cnrRequestStringBuilderArrayVar.Add(EndOfLine.CRLF + cnrBodyString)
		      End If
		    End If
		  End If
		  
		  //  REQUEST COOKIES
		  // Cookie: name=value; name2=value2; name3=value3
		  // Pairs in the list are separated by a semicolon and a space ('; ').
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
		  // 
		  Var cnrRequestCookiesVar As String = cnrHeaders.cnrGetValueByKeyName("Cookie")
		  If Not cnrRequestCookiesVar.IsEmpty Then
		    Var cnrCookiesArrayVar() As String
		    If cnrRequestCookiesVar.IndexOf(";") >= 0 Then
		      cnrCookiesArrayVar = cnrRequestCookiesVar.ToArray(";")
		    Else
		      cnrCookiesArrayVar.Add(cnrRequestCookiesVar)
		    End If
		    // parse cookies
		    Var cnrCookiesCountVar As Integer
		    For cnrCookiesCountVar = 0 To cnrCookiesArrayVar.LastIndex
		      Var cnrCookieNameVar As String = cnrCookiesArrayVar(cnrCookiesCountVar).NthField("=", 1)
		      cnrCookieNameVar = cnrCookieNameVar.Trim
		      cnrCookieNameVar = cnrCookieNameVar.ReplaceLineEndings("")
		      Var cnrCookieValueVar As String = cnrCookiesArrayVar(cnrCookiesCountVar).NthField("=", 2)
		      cnrCookieValueVar = cnrCookieValueVar.Trim
		      cnrCookieValueVar = cnrCookieValueVar.ReplaceLineEndings("")
		      If cnrCookieNameVar.IsEmpty Or cnrCookieNameVar = "" Then
		        Continue
		      End If
		      // save cookie
		      cnrCookiesObject.cnrAddKeyValuePair(cnrCookieNameVar, cnrCookieValueVar)
		    Next
		  End If
		  
		  //  SAVE REQUEST SESSION ID
		  // server sets session id in cookie, client sends it back on each request.
		  cnrSessionIDString = cnrCookies.cnrGetValueByKeyName("cnrSessionID")
		  
		  //  SAVE REQUEST ID
		  // a default ID is created in the constructor.
		  // override with ID from X-Request-ID header, if present.
		  cnrRequestIDString = cnrCookies.cnrGetValueByKeyName("X-Request-ID")
		  
		  // save request string
		  cnrRequestString = String.FromArray(cnrRequestStringBuilderArrayVar, EndOfLine)
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod


	#tag Note, Name = README
		Copyright Carlos N Reina
		cnreina@gmail.com
		
		Class cnrHTTPRequestClass
		----------------------------------------------------------
		
	#tag EndNote

	#tag Note, Name = TODO
		refactor > handle multiple values > Content-Type: application/json; charset=UTF-8
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrBodyFieldsObject As cnrStringDictionaryClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrBodyString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrCookiesObject As cnrStringDictionaryClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrHeadersObject As cnrStringDictionaryClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrHTTPVersionString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLastErrorMessageString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrPathString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestIDString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestMethodString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestQueryString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestQueryStringFields As cnrStringDictionaryClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestReceivedTime As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestStartLine As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrResponseObject As cnrHTTPResponseClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSessionIDString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSocketIDString As String
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
