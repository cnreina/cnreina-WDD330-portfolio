#tag Class
Protected Class cnrHTTPConnectionClass
	#tag Method, Flags = &h21
		Private Sub cnrCloseConnection(cnrSenderParam As TCPSocket)
		  // HTTP/1.1 defaults to the use of "persistent connections", allowing multiple
		  // requests and responses to be carried over a single connection.
		  // The "close" connection option is used to signal that a connection will not
		  // persist after the current request/response.
		  //HTTP implementations SHOULD support persistent connections.
		  
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    RaiseEvent cnrHTTPErrorEvent
		    Return
		  End If
		  
		  If cnrSenderParam.IsConnected Then
		    RaiseEvent cnrHTTPConnectionClosedEvent
		    cnrSenderParam.Close
		  End If
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionString() As String
		  If cnrHTTPSocketObject = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrHTTPSocketObject = Nil")
		    cnrHTTPSocketUUIDString = ""
		    Return ""
		  End If
		  
		  Var cnrStringBuilder() As String
		  cnrStringBuilder.Add("Socket ID: " + cnrHTTPSocketObject.Handle.ToString)
		  cnrStringBuilder.Add("Socket UUID: " + cnrSocketUUID)
		  cnrStringBuilder.Add("Socket Local Address: " + cnrHTTPSocketObject.LocalAddress)
		  cnrStringBuilder.Add("Socket Remote Address: " + cnrHTTPSocketObject.RemoteAddress)
		  cnrStringBuilder.Add("Socket Port: " + cnrHTTPSocketObject.Port.ToString)
		  Var cnrHTTPConnectionStringVar As String = String.FromArray(cnrStringBuilder, EndOfLine)
		  
		  If cnrHTTPConnectionStringVar.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrHTTPConnectionStringVar.IsEmpty")
		    Return ""
		  End If
		  
		  Return cnrHTTPConnectionStringVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrConvertURLString(cnrURLParam As String) As String
		  If cnrURLParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrURLParam.IsEmpty")
		    Return ""
		  End If
		  
		  // covert hex values from the URL string
		  Var cnrURLVar As String = cnrURLParam
		  Var cnrHEXIndexVar As Integer
		  Var cnrEncodeStringVar As String
		  Do
		    cnrHEXIndexVar = cnrURLVar.IndexOf("%") // hex values start with '%'
		    If cnrHEXIndexVar < 0 Then
		      Exit
		    End If
		    
		    cnrEncodeStringVar = cnrURLVar.Middle(cnrHEXIndexVar, 2)
		    cnrEncodeStringVar = Chr(Val("&h" + cnrEncodeStringVar))
		    
		    cnrURLVar = cnrURLVar.Left(cnrHEXIndexVar - 1) + cnrEncodeStringVar + cnrURLVar.Middle(cnrHEXIndexVar + 2)
		    
		  Loop
		  
		  Return cnrURLVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrGetHTTPFileFromPath(cnrPathParam As String) As FolderItem
		  If cnrPathParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrPathParam.IsEmpty")
		    Return Nil
		  End If
		  
		  // find file
		  Var cnrFolderItemVar As FolderItem = SpecialFolder.Resources.Child(cnrHTTP_ROOT_FOLDER_CONST)
		  Var cnrPathLevelCountVar As Integer = cnrPathParam.CountFields("/")
		  Var cnrPathLevelItemVar As String
		  Var cnrCounterVar As Integer
		  For cnrCounterVar = 2 To cnrPathLevelCountVar
		    cnrPathLevelItemVar = cnrPathParam.NthField("/", cnrCounterVar)
		    // move up a level
		    If cnrPathLevelItemVar = ".." Then
		      cnrFolderItemVar = cnrFolderItemVar.Parent
		    End
		    // root folder
		    If cnrPathLevelItemVar = "" And cnrCounterVar = cnrPathLevelCountVar Then
		      cnrFolderItemVar = cnrFolderItemVar.Child("html")
		      cnrPathLevelItemVar = "index.html"
		    End
		    
		    cnrPathLevelItemVar = cnrConvertURLString(cnrPathLevelItemVar)
		    cnrFolderItemVar = cnrFolderItemVar.Child(cnrPathLevelItemVar)
		    If cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False Then
		      cnrSetLastError(CurrentMethodName, "cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False")
		      Return Nil
		    End If
		  Next
		  
		  Return cnrFolderItemVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrGetNewUUID() As String
		  // https://docs.xojo.com/index.php/Crypto.MD5
		  // https://docs.xojo.com/EncodeHex
		  // https://docs.xojo.com/index.php/MemoryBlock
		  
		  Var cnrDateTimeNowVar As String = DateTime.Now.ToString
		  Var cnrDateTimeMillisecondsVar As String = DateTime.Now.Nanosecond.ToString
		  Var cnrHashSourceVar As String = cnrDateTimeNowVar + cnrDateTimeMillisecondsVar
		  
		  Var cnrMD5MemoryBlockVar As MemoryBlock
		  cnrMD5MemoryBlockVar = Crypto.MD5(cnrHashSourceVar)
		  
		  Var cnrMD5HexStringVar As String = EncodeHex(cnrMD5MemoryBlockVar)
		  
		  Return cnrMD5HexStringVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketConnectedEvent(cnrSenderParam As TCPSocket)
		  If Not cnrSenderParam.IsConnected Then
		    Return
		  End If
		  
		  RaiseEvent cnrHTTPConnectedEvent
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketDataAvailableEvent(cnrSenderParam As TCPSocket)
		  // A TCP socket can contain more than one HTTP request per mesage.
		  // A TCP socket can deliver an HTTP request in multiple DataAvailable events.
		  // A message consists of header fields and, optionally, a body.
		  
		  // ********** PROCESS DATA
		  Var cnrDataVar As String = cnrSenderParam.ReadAll.DefineEncoding(Encodings.UTF8)
		  cnrLastDataAvailableString = cnrDataVar
		  
		  // save headers buffer
		  If cnrRequestHeadersBuffer.IsEmpty Then
		    cnrRequestHeadersBuffer = cnrDataVar.NthField(EndOfLine.CRLF + EndOfLine.CRLF, 1)
		    cnrRequestContentLengthBuffer = cnrRequestHeadersBuffer.NthField("Content-Length:", 2)
		    If cnrRequestContentLengthBuffer.IsEmpty Then
		      If Not cnrDataVar.BeginsWith("GET") And Not cnrDataVar.BeginsWith("OPTIONS") Then
		        cnrSetLastError(CurrentMethodName, "cnrRequestContentLengthBuffer.IsEmpty")
		        Return
		      End If
		    End If
		    // save body buffer
		    cnrRequestBodyBuffer = cnrDataVar.Right(cnrDataVar.Length - cnrRequestHeadersBuffer.Length)
		    // evaluate buffer size
		    If cnrRequestBodyBuffer.Length < cnrRequestContentLengthBuffer.ToInteger Then
		      Return
		    End If
		  End If
		  
		  // append to body buffer
		  If cnrRequestBodyBuffer.Length < cnrRequestContentLengthBuffer.ToInteger Then
		    cnrRequestBodyBuffer = cnrRequestBodyBuffer + cnrDataVar
		    // evaluate buffer size
		    If cnrRequestBodyBuffer.Length < cnrRequestContentLengthBuffer.ToInteger Then
		      Return
		    End If
		  End If
		  
		  // create request buffer
		  Var cnrRequestDataVar As String = cnrRequestHeadersBuffer + EndOfLine.CRLF + cnrRequestBodyBuffer
		  cnrRequestObjectBuffer = New cnrHTTPRequestClass(cnrRequestDataVar)
		  If cnrRequestObjectBuffer = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestObjectBuffer = Nil")
		    cnrSenderParam.Close
		    Return
		  End If
		  // save request
		  cnrRequestObjectArray.Add(cnrRequestObjectBuffer)
		  // process request
		  cnrProcessHTTPDataAvailable(cnrRequestObjectBuffer)
		  // reset buffers
		  cnrRequestHeadersBuffer = ""
		  cnrRequestBodyBuffer = ""
		  cnrRequestObjectBuffer = Nil
		  Return
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketErrorEvent(cnrSenderParam As TCPSocket, cnrRuntimeExceptionParam As RuntimeException)
		  // Error Codes:
		  
		  // 0     No error occurred.
		  
		  // 100     There was an error opening and initializing the drivers.
		  //             It may mean that WinSock (on Windows) is not installed, or the version is too early.
		  
		  // 102     This code means that you lost your connection.
		  //            You will get this error if the remote side disconnects (whether its forcibly- by pulling
		  //            their ethernet cable out of the computer), or gracefully (by calling SocketCore's Close method).
		  //            This may or not be a true error situation.
		  //            If the remote side closed the connection, then it is not truly an error; it's just a status indication.
		  //            You will also get this error if you call the Disconnect method of TCPSocket.
		  
		  // 103     The socket was unable to resolve the address that was specified.
		  //            A prime example of this would be a mistyped IP address, or a domain name of an unknown or
		  //            unreachable host.
		  
		  // 105     The address is currently in use.
		  //             This error will occur if you attempt to bind to a port that you have already bound to.
		  //             An example of this would be setting up two listening sockets to try to listen on the same port.
		  
		  // 106     This is an invalid state error, which means that the socket is not in the proper state to be doing a
		  //             certain operation.
		  //            An example of this is calling the Write method before the socket is actually connected.
		  
		  // 107     This error means that the port you specified is invalid.
		  //            This could mean that you entered a port number less than 0, or greater than 65,535.
		  //            It could also mean that you do not have enough privileges to bind to that port.
		  //            This happens under macOS and Linux if you are not running as root and try to bind to a port below 1024.
		  //            You can only bind to ports less than 1024 if you have root privileges. A normal "Admin" user does not have root privileges.
		  
		  // 108     This error indicates that your application has run out of memory. 
		  
		  // https://docs.xojo.com/SocketCore.Error
		  
		  
		  // process error
		  Select Case cnrRuntimeExceptionParam.ErrorNumber
		  Case 0
		    Return
		    
		  Case 100
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  Case 102
		    RaiseEvent cnrHTTPDisconnectedEvent
		    
		  Case 103
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  Case 105
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  Case 106
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  Case 107
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  Case 108
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  Case Else
		    If cnrSenderParam.IsConnected Then
		      cnrSenderParam.Disconnect
		    End If
		    RaiseEvent cnrHTTPErrorEvent
		    
		  End Select
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketSendCompleteEvent(cnrSenderParam As TCPSocket, cnrUserAbortedParam As Boolean)
		  // HTTP/1.1 defaults to the use of "persistent connections", allowing multiple
		  // requests and responses to be carried over a single connection.
		  // The "close" connection option is used to signal that a connection will not
		  // persist after the current request/response.
		  // HTTP implementations SHOULD support persistent connections.
		  
		  RaiseEvent cnrHTTPResponseSendCompleteEvent
		  
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    RaiseEvent cnrHTTPErrorEvent
		    Return
		  End If
		  
		  // User aborts the send by returning True from the SendProgress event.
		  // If the send was completed, this value is False.
		  // UserAborted will always be False for UDP sockets.
		  If cnrUserAbortedParam Then
		    If cnrSenderParam.IsConnected Then
		      RaiseEvent cnrHTTPConnectionClosedEvent
		      cnrSenderParam.Close
		    End If
		    cnrSetLastError(CurrentMethodName, "cnrUserAbortedParam = True")
		    RaiseEvent cnrHTTPErrorEvent
		    Return
		  End If
		  
		  // process connection header
		  Var cnrConnectionVar As String = cnrRequest.cnrHeaders.cnrGetValueByKeyName("Connection")
		  If cnrConnectionVar = "close" Or cnrConnectionVar.IsEmpty Then
		    // waiting for body data
		    If cnrRequest.cnrHeaders.cnrHasKey("Content-Length") Then
		      If cnrRequest.cnrBody.Length < cnrRequest.cnrHeaders.cnrGetValueByKeyName("Content-Length").ToInteger Then
		        Return
		      End If
		    End If
		    // close connection
		    cnrCloseConnection(cnrSenderParam)
		    Return
		  End If
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrHandleSocketSendProgressEvent(cnrSenderParam As TCPSocket, cnrBytesSentParam As Integer, cnrBytesRemainingParam As Integer) As Boolean
		  // Returning True from this event causes the send to be cancelled.
		  // This does not close the socket's connection; it only clears the buffer.
		  // After all of the data has been transferred you will get a final SendProgress event followed by a SendComplete event.
		  // bytesSent is the number of bytes that were sent in the chunk, not the total number of bytes sent. 
		  // https://docs.xojo.com/TCPSocket.SendProgress
		  
		  If cnrSenderParam = Nil Then
		    Return True
		  End If
		  
		  RaiseEvent cnrHTTPSendProgressEvent(cnrBytesSentParam, cnrBytesRemainingParam)
		  
		  Return False
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrLastDataAvailable() As String
		  Return cnrLastDataAvailableString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrLastErrorMessage() As String
		  Return cnrLastErrorMessageString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrProcessHTTPDataAvailable(cnrRequestObjectParam as cnrHTTPRequestClass)
		  If cnrRequestObjectParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestObjectParam = Nil")
		    If cnrHTTPSocketObject <> Nil And cnrHTTPSocketObject.IsConnected Then
		      cnrHTTPSocketObject.Close
		    End If
		    Return
		  End If
		  
		  // ********** GET RESPONSE APPROVAL
		  Var cnrAuthorizationVar As Boolean = RaiseEvent cnrHTTPGetResponseAuthorizationEvent(cnrRequestObjectParam)
		  If cnrAuthorizationVar = False Then
		    cnrSetLastError(CurrentMethodName, "cnrHTTPGetResponseAuthorizationEvent = False")
		    cnrSendHTTPErrorResponse(cnrRequestObjectParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    Return
		  End If
		  
		  
		  // ********** PROCESS HTTP MESSAGE
		  Select Case cnrRequestObjectParam.cnrMethod
		    // OPTIONS
		  Case "OPTIONS"
		    cnrProcessHTTPOPTIONSRequest(cnrRequestObjectParam)
		    Return
		    
		    // GET
		  Case "GET"
		    cnrProcessHTTPGETRequest(cnrRequestObjectParam)
		    Return
		    
		    // POST
		  Case "POST"
		    cnrProcessHTTPPOSTRequest(cnrRequestObjectParam)
		    Return
		    
		    // Unknown
		  Case Else
		    cnrSetLastError(CurrentMethodName, "Unknown Request Method")
		    cnrSendHTTPErrorResponse(cnrRequestObjectParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    Return
		    
		  End Select
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrProcessHTTPGETRequest(cnrRequestParam as cnrHTTPRequestClass)
		  // **************************************************************************************************
		  //
		  // The HTTP GET method requests a representation of the specified resource.
		  // Requests using GET should only be used to request data (they shouldn't include data).
		  // 
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
		  // 
		  // **************************************************************************************************
		  
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  If cnrRequestParam.cnrPath.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam.cnrPath.IsEmpty")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    Return
		  End If
		  
		  //********** PROCESS GET REQUEST
		  
		  // STATIC FILE REQUEST
		  If cnrRequestParam.cnrPath.IndexOf(".") > 0 Or cnrRequestParam.cnrPath = "/" Then
		    // find requested file
		    If cnrRequestParam.cnrPath.IsEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrRequestParam.cnrPath.IsEmpty")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		      Return
		    End If
		    Var cnrFolderItemVar As FolderItem = cnrGetHTTPFileFromPath(cnrRequestParam.cnrPath)
		    If cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False Then
		      cnrSetLastError(CurrentMethodName, "cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		      Return
		    End If
		    
		    // process query strings
		    If cnrRequestParam.cnrQueryStringFields.cnrKeyCount > 0 Then
		      // TODO process file with query strings
		      System.DebugLog("TODO process file with query strings - " + CurrentMethodName)
		      cnrSetLastError(CurrentMethodName, "QueryStrings Not Supported")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		      Return
		    End If
		    
		    // PREPARE RESPONSE
		    If cnrRequestParam.cnrResponse = Nil Then
		      cnrSetLastError(CurrentMethodName, "cnrRequestObjectVar.cnrResponse = Nil")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		      Return
		    End If
		    
		    // session id
		    cnrRequestParam.cnrResponse.cnrSetSessionID(cnrRequestParam.cnrSessionID)
		    If cnrRequestParam.cnrResponse.cnrSessionID.IsEmpty Then
		      // start new session
		      cnrRequestParam.cnrResponse.cnrSetSessionID(cnrGetNewUUID)
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Set-Cookie", "cnrSessionID=" + cnrRequestParam.cnrResponse.cnrSessionID)
		    Else
		      // process existent session
		      System.DebugLog("TODO process existent session - " + CurrentMethodName)
		    End If
		    
		    // response id
		    // overriden by id from X-Request-ID header if present in request
		    cnrRequestParam.cnrResponse.cnrSetResponseID(cnrRequestParam.cnrRequestID)
		    If cnrRequestParam.cnrResponse.cnrResponseID.IsEmpty Then
		      cnrRequestParam.cnrResponse.cnrSetResponseID(cnrGetNewUUID)
		    End If
		    
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrRequestParam.cnrResponse.cnrSetFile(cnrFolderItemVar)
		    cnrRequestParam.cnrResponse.cnrSetSocketID(cnrHTTPSocketObject.Handle.ToString)
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_OK_CONST)
		    
		    // headers
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Server", "cnrServer-" + App.Version)
		    If cnrRequestParam.cnrPath.EndsWith(".css") Then
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "text/css")
		    End If
		    If cnrRequestParam.cnrPath.EndsWith(".js") Then
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "text/javascript")
		    End If
		    If cnrRequestParam.cnrPath.EndsWith(".html") Then
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "text/html; charset=utf-8")
		    End If
		    If cnrRequestParam.cnrPath.EndsWith(".png") Then
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "image/png")
		    End If
		    If cnrRequestParam.cnrPath.EndsWith("favicon.ico") Then
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", cnrHTTP_FAVICON_TYPE_CONST)
		    End If
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Date", DateTime.Now.ToString)
		    // The Content-Length header indicates the size of the message body, in bytes, sent to the recipient
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Length", cnrFolderItemVar.Length.ToString)
		    //cnrRequestObjectVar.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Connection", "close")
		    
		    //  SEND RESPONSE
		    cnrSendHTTPFileResponse(cnrRequestParam)
		    Return
		    
		  Else
		    
		    //********** PROCESS UNKNOWN GET REQUEST
		    
		    //  SEND ERROR RESPONSE
		    cnrSetLastError(CurrentMethodName, "UNKNOWN GET REQUEST")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    Return
		  End If
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrProcessHTTPOPTIONSRequest(cnrRequestParam as cnrHTTPRequestClass)
		  // **************************************************************************************************
		  //
		  // The HTTP OPTIONS method requests permitted communication options for a given URL or server.
		  // A client can specify a URL with this method, or an asterisk (*) to refer to the entire server.
		  // The response contains an Allow header that holds the allowed methods.
		  // 
		  // Request has body     No
		  // Successful response has body     Yes
		  // Safe     Yes
		  // Idempotent     Yes
		  // Cacheable     No
		  // Allowed in HTML forms     No
		  // 
		  // REQUEST:
		  // 
		  // OPTIONS /resources/post-here/ HTTP/1.1
		  // Host: bar.example
		  // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
		  // Accept-Language: en-us,en;q=0.5
		  // Accept-Encoding: gzip,deflate
		  // Connection: keep-alive
		  // Origin: https://foo.example
		  // Access-Control-Request-Method: POST
		  // Access-Control-Request-Headers: X-PINGOTHER, Content-Type
		  // 
		  // RESPONSE:
		  // 
		  // HTTP/1.1 204 No Content
		  // Date: Mon, 01 Dec 2008 01:15:39 GMT
		  // Server: Apache/2.0.61 (Unix)
		  // Access-Control-Allow-Origin: https://foo.example
		  // Access-Control-Allow-Methods: POST, GET, OPTIONS
		  // Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
		  // Access-Control-Max-Age: 86400
		  // Vary: Accept-Encoding, Origin
		  // Keep-Alive: timeout=2, max=100
		  // Connection: Keep-Alive
		  // 
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
		  //
		  // **************************************************************************************************
		  
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  
		  //********** PROCESS OPTIONS REQUEST
		  
		  Select Case cnrRequestParam.cnrPath
		    // ROOT
		  Case "/"
		    
		    // SEND RESPONSE
		    
		    // response id
		    // overriden by id from X-Request-ID header if present in request
		    cnrRequestParam.cnrResponse.cnrSetResponseID(cnrRequestParam.cnrRequestID)
		    If cnrRequestParam.cnrResponse.cnrResponseID.IsEmpty Then
		      cnrRequestParam.cnrResponse.cnrSetResponseID(cnrGetNewUUID)
		    End If
		    cnrRequestParam.cnrResponse.cnrSetSocketID(cnrHTTPSocketObject.Handle.ToString)
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    // start line
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_OK_NO_CONTENT_CONST)
		    // headers
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Date", DateTime.Now.ToString)
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Server", "cnrServer-" + App.Version)
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Allow-Origin", "*")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Allow-Headers", "*")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Max-Age", "86400")
		    // cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Vary", "Accept-Encoding, Origin")
		    // cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Keep-Alive", "timeout=2, max=100")
		    // cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Connection", "Keep-Alive")
		    
		    // SEND RESPONSE
		    cnrSendHTTPHeaderResponse(cnrRequestParam)
		    
		    Return
		    
		    // Unknown
		  Case Else
		    cnrSetLastError(CurrentMethodName, "UNKNOWN Content-Type")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    Return
		    
		  End Select
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrProcessHTTPPOSTRequest(cnrRequestParam as cnrHTTPRequestClass)
		  // **************************************************************************************************
		  //
		  // A POST request is typically sent via an HTML form and results in a change on the server.
		  // In this case, the content type is selected by putting the adequate string in the enctype 
		  // attribute of the <form> element or the formenctype attribute of the <input> or <button> elements:
		  // 
		  //     application/x-www-form-urlencoded: 
		  //         the keys And values are encoded In key-value tuples separated by '&', with a '=' between 
		  //         the key and the value.
		  //         Non-alphanumeric characters in both keys and values are percent encoded: this is the reason 
		  //         why this type is not suitable to use with binary data (use multipart/form-data instead)
		  // 
		  //     multipart/form-data: 
		  //         Each value Is sent As a block Of data ("body part"), with a user agent-defined 
		  //         delimiter ("boundary") separating Each part.
		  //         The keys are given In the Content-Disposition header Of Each part.
		  // 
		  //     Text/plain
		  //
		  // When a POST request is sent via a XMLHttpRequest — the body can take any type.
		  // 
		  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
		  //
		  // **************************************************************************************************
		  
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  
		  //********** PROCESS POST REQUEST
		  
		  Var cnrContentTypeVar As String = cnrRequestParam.cnrHeaders.cnrGetValueByKeyName("Content-Type")
		  Var cnrBodyDataVar As String = cnrRequestParam.cnrBody
		  
		  // evaluate type
		  If Not cnrBodyDataVar.IsEmpty Then
		    If cnrContentTypeVar.IsEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrContentTypeVar.IsEmpty")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		      Return
		    End If
		  End If
		  Var cnrContentTypesArrayVar() As String = cnrContentTypeVar.ToArray(";")
		  If cnrContentTypesArrayVar.Count < 1 Then
		    cnrSetLastError(CurrentMethodName, "cnrContentTypesArrayVar.Count < 1")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  
		  //********** PROCESS CONTENT TYPE
		  
		  Select Case cnrContentTypesArrayVar(0).Trim
		  Case "application/json"
		    
		    //********** JSON TYPE
		    
		    // evaluate body
		    If cnrBodyDataVar.isEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrBodyDataVar.isEmpty (application/json)")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		      Return
		    End If
		    RaiseEvent cnrHTTPRequestBodyReceivedEvent(cnrBodyDataVar)
		    
		    // evaluate json
		    Var cnrJSONObjectVar As JSONItem
		    Try
		      cnrJSONObjectVar = New JSONItem(cnrBodyDataVar)
		      If cnrJSONObjectVar = Nil Then
		        cnrSetLastError(CurrentMethodName, "cnrJSONObjectVar = nil")
		        cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		        Return
		      End If
		      
		    Catch
		      cnrSetLastError(CurrentMethodName, "ParseJSON(cnrBodyDataVar)")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		      Return
		      
		    End Try
		    RaiseEvent cnrHTTPJSONReceivedEvent(cnrBodyDataVar)
		    
		    // SEND RESPONSE
		    // session id
		    cnrRequestParam.cnrResponse.cnrSetSessionID(cnrRequestParam.cnrSessionID)
		    If cnrRequestParam.cnrResponse.cnrSessionID.IsEmpty Then
		      // start new session
		      cnrRequestParam.cnrResponse.cnrSetSessionID(cnrGetNewUUID)
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Set-Cookie", "cnrSessionID=" + cnrRequestParam.cnrResponse.cnrSessionID)
		    Else
		      // process existent session
		      #If DebugBuild
		        System.DebugLog("TODO process existent session - " + CurrentMethodName)
		      #EndIf
		    End If
		    // response id
		    // overriden by id from X-Request-ID header if present in request
		    cnrRequestParam.cnrResponse.cnrSetResponseID(cnrRequestParam.cnrRequestID)
		    If cnrRequestParam.cnrResponse.cnrResponseID.IsEmpty Then
		      cnrRequestParam.cnrResponse.cnrSetResponseID(cnrGetNewUUID)
		    End If
		    cnrRequestParam.cnrResponse.cnrSetSocketID(cnrHTTPSocketObject.Handle.ToString)
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    
		    // body
		    cnrRequestParam.cnrResponse.cnrSetResponseBody("{""401"": ""Not Found""}")
		    Var cnrAcceptHeaderVar As String = cnrRequestParam.cnrHeaders.cnrGetValueByKeyName("Accept")
		    If cnrAcceptHeaderVar = "application/json"  Or cnrAcceptHeaderVar = "*/*" Then
		      // get user response data
		      // client must send Accept: application/json header
		      Var cnrEventCallBackStringVar As String = RaiseEvent cnrHTTPJSONGetResponseEvent(cnrBodyDataVar)
		      If Not cnrEventCallBackStringVar.IsEmpty Then
		        // evaluate response json
		        Var cnrResponseJSONVar As JSONItem
		        Try
		          cnrResponseJSONVar = New JSONItem(cnrEventCallBackStringVar)
		          If cnrResponseJSONVar = Nil Then
		            cnrSetLastError(CurrentMethodName, "cnrResponseJSONVar = nil (cnrEventCallBackStringVar)")
		            cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		            Return
		          End If
		        Catch
		          cnrSetLastError(CurrentMethodName, "ParseJSON(cnrEventCallBackStringVar)")
		          cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		          Return
		        End Try
		        // set status
		        cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_OK_CONST)
		        // set body
		        cnrRequestParam.cnrResponse.cnrSetResponseBody(cnrEventCallBackStringVar)
		      End If
		      
		    End If
		    
		    // headers
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Date", DateTime.Now.ToString)
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Server", "cnrServer-" + App.Version)
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Allow-Origin", "*")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Allow-Headers", "*")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Access-Control-Max-Age", "86400")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "application/json")
		    // The Content-Length header indicates the size of the message body, in bytes, sent to the recipient
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Length", Str(cnrRequestParam.cnrResponse.cnrResponseBody.Length))
		    //cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Connection", "close")
		    
		    // SEND RESPONSE
		    cnrSendHTTPJSONResponse(cnrRequestParam)
		    
		    Return
		    
		    
		  Case "multipart/form-data"
		    
		    //********** FORM DATA TYPE
		    
		    // evaluate body
		    If cnrBodyDataVar.isEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrBodyDataVar.isEmpty (multipart/form-data)")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		      Return
		    End If
		    RaiseEvent cnrHTTPRequestBodyReceivedEvent(cnrBodyDataVar)
		    
		    // evaluate form-data
		    Var cnrBoundaryVar As String = cnrContentTypeVar.Right(cnrContentTypeVar.Length - cnrContentTypeVar.IndexOf("boundary="))
		    Var cnrCleanBoundaryVar As String  = cnrBoundaryVar.Replace("boundary=", "")
		    If cnrCleanBoundaryVar.IsEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrCleanBoundaryVar.IsEmpty")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		      Return
		    End If
		    If cnrBodyDataVar.IndexOf(cnrCleanBoundaryVar) < 0 Then
		      cnrSetLastError(CurrentMethodName, "cnrBodyDataVar.IndexOf(cnrCleanBoundaryVar) < 0")
		      cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		      Return
		    End If
		    RaiseEvent cnrHTTPFormDataReceivedEvent(cnrBodyDataVar)
		    
		    // SEND RESPONSE
		    // session id
		    cnrRequestParam.cnrResponse.cnrSetSessionID(cnrRequestParam.cnrSessionID)
		    If cnrRequestParam.cnrResponse.cnrSessionID.IsEmpty Then
		      // start new session
		      cnrRequestParam.cnrResponse.cnrSetSessionID(cnrGetNewUUID)
		      cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Set-Cookie", "cnrSessionID=" + cnrRequestParam.cnrResponse.cnrSessionID)
		    Else
		      // process existent session
		      #If DebugBuild
		        System.DebugLog("TODO process existent session - " + CurrentMethodName)
		      #EndIf
		    End If
		    // response id
		    // overriden by id from X-Request-ID header if present in request
		    cnrRequestParam.cnrResponse.cnrSetResponseID(cnrRequestParam.cnrRequestID)
		    If cnrRequestParam.cnrResponse.cnrResponseID.IsEmpty Then
		      cnrRequestParam.cnrResponse.cnrSetResponseID(cnrGetNewUUID)
		    End If
		    cnrRequestParam.cnrResponse.cnrSetSocketID(cnrHTTPSocketObject.Handle.ToString)
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_OK_CONST)
		    
		    // body
		    cnrRequestParam.cnrResponse.cnrSetResponseBody("{""200"": ""Ok""}")
		    Var cnrAcceptHeaderVar As String = cnrRequestParam.cnrHeaders.cnrGetValueByKeyName("Accept")
		    If cnrAcceptHeaderVar = "application/json"  Or cnrAcceptHeaderVar = "*/*" Then
		      Var cnrEventCallBackStringVar As String = RaiseEvent cnrHTTPFormDataGetResponseEvent(cnrBodyDataVar)
		      If Not cnrEventCallBackStringVar.IsEmpty Then
		        // evaluate response json
		        Var cnrResponseJSONVar As JSONItem
		        Try
		          cnrResponseJSONVar = New JSONItem(cnrEventCallBackStringVar)
		          If cnrResponseJSONVar = Nil Then
		            cnrSetLastError(CurrentMethodName, "cnrResponseJSONVar = nil (cnrEventCallBackStringVar)")
		            cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		            Return
		          End If
		        Catch
		          cnrSetLastError(CurrentMethodName, "ParseJSON(cnrEventCallBackStringVar)")
		          cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		          Return
		        End Try
		        cnrRequestParam.cnrResponse.cnrSetResponseBody(cnrEventCallBackStringVar)
		      End If
		    End If
		    
		    // headers
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Server", "cnrServer-" + App.Version)
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "application/json")
		    // The Content-Length header indicates the size of the message body, in bytes, sent to the recipient
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Length", Str(cnrRequestParam.cnrResponse.cnrResponseBody.Length))
		    //cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Connection", "close")
		    cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Date", DateTime.Now.ToString)
		    
		    // SEND RESPONSE
		    cnrSendHTTPJSONResponse(cnrRequestParam)
		    
		    Return
		    
		  Case "application/x-www-form-urlencoded"
		    
		    //********** FORM URL ENCODED TYPE
		    
		    cnrSetLastError(CurrentMethodName, "NOT IMPLEMENTED: application/x-www-form-urlencoded")
		    Return
		    
		  Case "application/xml"
		    
		    //********** XML TYPE
		    
		    cnrSetLastError(CurrentMethodName, "NOT IMPLEMENTED: application/xml")
		    Return
		    
		  Case Else
		    cnrSetLastError(CurrentMethodName, "UNKNOWN Content-Type")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    Return
		    
		  End Select
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrRequest() As cnrHTTPRequestClass
		  Return cnrRequestObjectArray(cnrRequestObjectArray.LastIndex)
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrRequests() As cnrHTTPRequestClass()
		  Return cnrRequestObjectArray
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrResponse() As cnrHTTPResponseClass
		  Return cnrRequestObjectArray(cnrRequestObjectArray.LastIndex).cnrResponse
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSendHTTPErrorResponse(cnrRequestParam As cnrHTTPRequestClass, cnrErrorTypeParam As String)
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    If cnrHTTPSocketObject <> Nil Then
		      If cnrHTTPSocketObject.IsConnected Then
		        cnrHTTPSocketObject.Close
		      End If
		    End If
		    Return
		  End If
		  If cnrErrorTypeParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrErrorTypeParam.IsEmpty")
		    cnrHTTPSocketObject.Close
		    Return
		  End If
		  
		  Var cnrContentTypeVar As String = cnrRequestParam.cnrHeaders.cnrGetValueByKeyName("Content-Type")
		  Var cnrAcceptVar As String = cnrRequestParam.cnrHeaders.cnrGetValueByKeyName("Accept")
		  cnrRequestParam.cnrResponse.cnrSetSocketID(cnrHTTPSocketObject.Handle.ToString)
		  cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "text/html; charset=utf-8")
		  cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Connection", "close")
		  
		  // PROCESS ERROR TYPE
		  Select Case cnrErrorTypeParam
		    // 404 Not Found
		  Case cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST)
		    If cnrContentTypeVar.BeginsWith("text/html") Or cnrAcceptVar.BeginsWith("*/*") Or cnrAcceptVar.BeginsWith("text/html") Then
		      Var cnrFolderItemVar As FolderItem = cnrGetHTTPFileFromPath("/html/cnrError404.html")
		      If cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False Then
		        cnrSetLastError(CurrentMethodName, "cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False")
		        cnrHTTPSocketObject.Close
		        Return
		      End If
		      cnrRequestParam.cnrResponse.cnrSetFile(cnrFolderItemVar)
		      // send file response
		      cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		      cnrSendHTTPFileResponse(cnrRequestParam)
		      Return
		    End If
		    
		    // send header response
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrSendHTTPHeaderResponse(cnrRequestParam)
		    Return
		    
		    // 402 Bad Request
		  Case cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST)
		    
		    If cnrContentTypeVar.BeginsWith("text/html") Or cnrAcceptVar.BeginsWith("*/*") Or cnrAcceptVar.BeginsWith("text/html") Then
		      Var cnrFolderItemVar As FolderItem = cnrGetHTTPFileFromPath("/html/cnrError402.html")
		      If cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False Then
		        cnrSetLastError(CurrentMethodName, "cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False")
		        cnrHTTPSocketObject.Close
		        Return
		      End If
		      // send file response
		      cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		      cnrSendHTTPFileResponse(cnrRequestParam)
		      Return
		    End If
		    
		    // send header response
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrSendHTTPHeaderResponse(cnrRequestParam)
		    Return
		    
		    // 500 Server Error
		  Case cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST
		    cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		    cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    
		    If cnrContentTypeVar.BeginsWith("text/html") Or cnrAcceptVar.BeginsWith("*/*") Or cnrAcceptVar.BeginsWith("text/html") Then
		      Var cnrFolderItemVar As FolderItem = cnrGetHTTPFileFromPath("/html/cnrError500.html")
		      If cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False Then
		        cnrSetLastError(CurrentMethodName, "cnrFolderItemVar = Nil Or cnrFolderItemVar.Exists = False")
		        cnrHTTPSocketObject.Close
		        Return
		      End If
		      // send file response
		      cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		      cnrSendHTTPFileResponse(cnrRequestParam)
		      Return
		    End If
		    
		    // send header response
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrSendHTTPHeaderResponse(cnrRequestParam)
		    Return
		    
		  Case Else
		    cnrSetLastError(CurrentMethodName, "Unknown cnrErrorTypeParam (" + cnrErrorTypeParam + ")")
		    // send header response
		    cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		    cnrSendHTTPHeaderResponse(cnrRequestParam)
		    Return
		    
		  End Select
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSendHTTPFileResponse(cnrRequestParam As cnrHTTPRequestClass)
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrHTTPSocketObject.Close
		    Return
		  End If
		  
		  //********** SEND RESPONSE
		  
		  // line
		  If cnrRequestParam.cnrResponse.cnrStartLine.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam.cnrResponse.ResponseStartLine.IsEmpty")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  cnrHTTPSocketObject.Write(cnrRequestParam.cnrResponse.cnrStartLine + EndOfLine.CRLF)
		  
		  // headers
		  Var cnrHeadersArrayVar() As String = cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrToString.Split(EndOfLine)
		  For cnrHeaderCounter As Integer = 0 To cnrHeadersArrayVar.LastIndex
		    cnrHTTPSocketObject.Write(cnrHeadersArrayVar(cnrHeaderCounter) + EndOfLine.CRLF)
		  Next
		  cnrHTTPSocketObject.Write(EndOfLine.CRLF)
		  
		  // send file payload
		  If cnrRequestParam.cnrResponse.cnrFile = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrResponseObjectParam.PayloadFile = Nil")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  
		  Var cnrPayloadBinaryVar As BinaryStream = BinaryStream.Open(cnrRequestParam.cnrResponse.cnrFile, False)
		  If cnrPayloadBinaryVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrPayloadBinaryVar = Nil")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  cnrHTTPSocketObject.Write(cnrPayloadBinaryVar.Read(cnrPayloadBinaryVar.Length, Encodings.UTF8) + EndOfLine.CRLF)
		  cnrPayloadBinaryVar.Close
		  RaiseEvent cnrHTTPResponseSendEvent
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSendHTTPHeaderResponse(cnrRequestParam As cnrHTTPRequestClass)
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrHTTPSocketObject.Close
		    Return
		  End If
		  
		  //********** SEND RESPONSE
		  
		  // line
		  If cnrRequestParam.cnrResponse.cnrStartLine.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrResponseObjectParam.ResponseStartLine.IsEmpty")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  cnrHTTPSocketObject.Write(cnrRequestParam.cnrResponse.cnrStartLine + EndOfLine.CRLF)
		  
		  // headers
		  Var cnrHeadersArrayVar() As String = cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrToString.Split(EndOfLine)
		  For cnrHeaderCounter As Integer = 0 To cnrHeadersArrayVar.LastIndex
		    cnrHTTPSocketObject.Write(cnrHeadersArrayVar(cnrHeaderCounter) + EndOfLine.CRLF)
		  Next
		  cnrHTTPSocketObject.Write(EndOfLine.CRLF)
		  
		  RaiseEvent cnrHTTPResponseSendEvent
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSendHTTPJSONResponse(cnrRequestParam As cnrHTTPRequestClass)
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrHTTPSocketObject.Close
		    Return
		  End If
		  
		  //********** SEND RESPONSE
		  
		  // line
		  If cnrRequestParam.cnrResponse.cnrStartLine.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrResponseObjectParam.ResponseStartLine.IsEmpty")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  cnrHTTPSocketObject.Write(cnrRequestParam.cnrResponse.cnrStartLine + EndOfLine.CRLF)
		  
		  // headers
		  Var cnrHeadersArrayVar() As String = cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrToString.Split(EndOfLine)
		  For cnrHeaderCounter As Integer = 0 To cnrHeadersArrayVar.LastIndex
		    cnrHTTPSocketObject.Write(cnrHeadersArrayVar(cnrHeaderCounter) + EndOfLine.CRLF)
		  Next
		  cnrHTTPSocketObject.Write(EndOfLine.CRLF)
		  
		  // body
		  Var cnrResponseBodyVar As String = cnrRequestParam.cnrResponse.cnrResponseBody
		  If cnrResponseBodyVar.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrResponseBodyVar.IsEmpty")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  
		  Var cnrPayloadBinaryVar As New BinaryStream(cnrResponseBodyVar)
		  If cnrPayloadBinaryVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrPayloadBinaryVar = Nil")
		    cnrSendHTTPErrorResponse(cnrRequestParam, cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST)
		    Return
		  End If
		  
		  cnrHTTPSocketObject.Write(cnrPayloadBinaryVar.Read(cnrPayloadBinaryVar.Length, Encodings.UTF8))
		  cnrPayloadBinaryVar.Close
		  
		  RaiseEvent cnrHTTPResponseSendEvent
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSendHTTPSRedirectResponse(cnrRequestParam As cnrHTTPRequestClass)
		  If cnrRequestParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrRequestParam = Nil")
		    cnrHTTPSocketObject.Close
		    Return
		  End If
		  
		  Var cnrRefererVar As String = cnrRequestParam.cnrHeaders.cnrGetValueByKeyName("Referer")
		  If cnrRefererVar.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrRefererVar.IsEmpty")
		    cnrHTTPSocketObject.Close
		    Return
		  End If
		  
		  cnrRequestParam.cnrResponse.cnrSetSocketID(cnrHTTPSocketObject.Handle.ToString)
		  cnrRequestParam.cnrResponse.cnrSetHTTPVersion(cnrHTTP_VERSION_CONST)
		  cnrRequestParam.cnrResponse.cnrSetStatusCode(cnrHTTP_RESPONSE_CODE_MOVED_PERMANENTLY_CONST)
		  cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Content-Type", "text/html; charset=utf-8")
		  Var cnrRedirectURLVar As String = cnrRefererVar
		  cnrRedirectURLVar = cnrRedirectURLVar.Replace("http", "https")
		  cnrRequestParam.cnrResponse.cnrResponseHeaders.cnrSetValueByKeyName("Location", cnrRedirectURLVar)
		  
		  // send response
		  cnrRequestParam.cnrResponse.cnrSetSentTime(DateTime.Now.ToString)
		  cnrSendHTTPFileResponse(cnrRequestParam)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSetLastError(cnrOriginParam As String, cnrMessageParam As String)
		  If cnrOriginParam.IsEmpty Then
		    System.DebugLog("ERROR: cnrOriginParam.IsEmpty - " + CurrentMethodName)
		  End If
		  If cnrMessageParam.IsEmpty Then
		    System.DebugLog("ERROR: cnrMessageParam.IsEmpty - " + CurrentMethodName)
		  End If
		  
		  // save
		  cnrLastErrorMessageString = cnrOriginParam + EndOfLine + cnrMessageParam
		  
		  // notify
		  RaiseEvent cnrHTTPErrorEvent
		  
		  // debug
		  #If DebugBuild
		    System.DebugLog(CurrentMethodName + " - ERROR: " + cnrLastErrorMessage)
		  #EndIf
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSocket() As TCPSocket
		  Return cnrHTTPSocketObject
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrSocketUUID() As String
		  Return cnrHTTPSocketUUIDString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor()
		  // INITIALIZE
		  
		  // socket
		  Var cnrNewHTTPSocketVar As SSLSocket = New SSLSocket
		  If cnrNewHTTPSocketVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewHTTPSocketVar = Nil")
		    Return
		  End If
		  
		  // certificate
		  cnrNewHTTPSocketVar.SSLEnabled = False
		  // cnrNewHTTPSocketVar.CertificatePassword = ""
		  // cnrNewHTTPSocketVar.CertificateRejectionFile = ""
		  
		  Var cnrCertificateFileVar As FolderItem
		  cnrCertificateFileVar = SpecialFolder.Resources.Child("cnrCert").Child("cnrServer.crt")
		  If cnrCertificateFileVar.Exists = False Then
		    cnrSetLastError(CurrentMethodName, "cnrCertificateFileVar.Exists = False")
		    Return
		  End If
		  cnrNewHTTPSocketVar.CertificateFile = cnrCertificateFileVar
		  
		  // properties
		  cnrHTTPSocketUUIDString = cnrGetNewUUID
		  cnrLastDataAvailableString = ""
		  
		  // handlers
		  AddHandler cnrNewHTTPSocketVar.Connected, AddressOf cnrHandleSocketConnectedEvent
		  AddHandler cnrNewHTTPSocketVar.DataAvailable, AddressOf cnrHandleSocketDataAvailableEvent
		  AddHandler cnrNewHTTPSocketVar.Error, AddressOf cnrHandleSocketErrorEvent
		  AddHandler cnrNewHTTPSocketVar.SendComplete, AddressOf cnrHandleSocketSendCompleteEvent
		  AddHandler cnrNewHTTPSocketVar.SendProgress, AddressOf cnrHandleSocketSendProgressEvent
		  cnrHTTPSocketObject = cnrNewHTTPSocketVar
		  
		End Sub
	#tag EndMethod


	#tag Hook, Flags = &h0
		Event cnrHTTPCommandReceivedEvent(cnrTypeParam As String, cnrEncodingParam As String, cnrCommandParam As String)
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPConnectedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPConnectionClosedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPDataAvailableEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPDisconnectedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPErrorEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPFormDataGetResponseEvent(cnrFormDataParam As String) As String
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPFormDataReceivedEvent(cnrFormDataParam As String)
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPGetResponseAuthorizationEvent(cnrRequestParam As cnrHTTPRequestClass) As Boolean
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPJSONGetResponseEvent(cnrJSONDataParam As String) As String
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPJSONReceivedEvent(cnrJSONDataParam As String)
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPRequestAvailableEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPRequestBodyReceivedEvent(cnrBodyDataParam As String)
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPResponseSendCompleteEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPResponseSendEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrHTTPSendProgressEvent(cnrBytesSentParam As Integer, cnrBytesRemainingParam As Integer)
	#tag EndHook


	#tag Note, Name = TODO
		
		path available event > check before content-type, if not handled then handle content-type
		
		Refactor > process all incoming in binary and hex, use char-codes > convert binary blocks to text for downstream processing.
		
		implement env vars > webroot=public folder, etc.
		
		implement time-out for requests and responses.
		
		handle query string request
		
		refactor > handle HTTP/1.1 connection policy:
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Session
		In client-server protocols, like HTTP, sessions consist of three phases:
		
		    The client establishes a TCP connection (or the appropriate connection if the transport layer is not TCP).
		    The client sends its request, and waits for the answer.
		    The server processes the request, sending back its answer, providing a status code and appropriate data.
		
		
		refactor multipart/form-data:
		
		POST /test HTTP/1.1
		Host: foo.example
		Content-Type: multipart/form-data;boundary="boundary"
		
		--boundary
		Content-Disposition: form-data; name="field1"
		
		value1
		--boundary
		Content-Disposition: form-data; name="field2"; filename="example.txt"
		
		value2
		--boundary--
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrHTTPSocketObject As SSLSocket
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrHTTPSocketUUIDString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLastDataAvailableString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLastErrorMessageString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestBodyBuffer As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestContentLengthBuffer As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestHeadersBuffer As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestObjectArray() As cnrHTTPRequestClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrRequestObjectBuffer As cnrHTTPRequestClass
	#tag EndProperty


	#tag Constant, Name = cnrHTTP_API_OPTION_1_CONST, Type = String, Dynamic = False, Default = \"test1", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_API_OPTION_2_CONST, Type = String, Dynamic = False, Default = \"test2", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_API_OPTION_3_CONST, Type = String, Dynamic = False, Default = \"test3", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_FAVICON_PATH_CONST, Type = String, Dynamic = False, Default = \"/assets/cnrsolo.png", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_FAVICON_TYPE_CONST, Type = String, Dynamic = False, Default = \"image/png", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_REQUEST_METHOD_GET_CONST, Type = String, Dynamic = False, Default = \"GET", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_REQUEST_METHOD_POST_CONST, Type = String, Dynamic = False, Default = \"POST", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_BAD_REQUEST_CONST, Type = String, Dynamic = False, Default = \"402 Bad Request", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_MOVED_PERMANENTLY_CONST, Type = String, Dynamic = False, Default = \"301 Moved Permanently", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_NOT_FOUND_CONST, Type = String, Dynamic = False, Default = \"404 Not Found", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_NOT_IMPLEMENTED_CONST, Type = String, Dynamic = False, Default = \"501 Not Implemented", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_OK_CONST, Type = String, Dynamic = False, Default = \"200 OK", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_OK_NO_CONTENT_CONST, Type = String, Dynamic = False, Default = \"204 No Content", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_RESPONSE_CODE_SERVER_ERROR_CONST, Type = String, Dynamic = False, Default = \"500 Internal Server Error", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_ROOT_FOLDER_CONST, Type = String, Dynamic = False, Default = \"cnrPublic", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrHTTP_VERSION_CONST, Type = String, Dynamic = False, Default = \"HTTP/1.1", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrTCP_FIRST_PORT_CONST, Type = Double, Dynamic = False, Default = \"1", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrTCP_LAST_PORT_CONST, Type = Double, Dynamic = False, Default = \"65535", Scope = Private
	#tag EndConstant


	#tag ViewBehavior
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
			InitialValue=""
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
	#tag EndViewBehavior
End Class
#tag EndClass
