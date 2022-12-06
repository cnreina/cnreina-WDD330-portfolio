#tag Class
Protected Class cnrHTTPServerClass
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

	#tag Method, Flags = &h21
		Private Function cnrHandleServerSocketAddSocket(cnrServerSocketParam As ServerSocket) As TCPSocket
		  // ServerSocket is a permanent socket that listens on a single port for multiple connections.
		  // When a connection attempt is made on that port, the ServerSocket hands the connection
		  // off to another socket, and continues listening on the same port.
		  // https://docs.xojo.com/index.php/ServerSocket
		  
		  If cnrServerSocketParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrServerSocketParam = Nil.")
		    Return Nil
		  End If
		  
		  // create new instance of cnrHTTPConnectionClass (Parent = TCPSocket) and pass it back to the server
		  Var cnrNewHTTPConnectionVar As cnrHTTPConnectionClass = New cnrHTTPConnectionClass
		  
		  // notify and pass the new socket
		  RaiseEvent cnrNewHTTPSocketEvent(cnrNewHTTPConnectionVar)
		  Return cnrNewHTTPConnectionVar.cnrSocket
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleServerSocketError(cnrServerSocketParam As ServerSocket, cnrErrorCodeParam As Integer, cnrRuntimeExceptionParam As RuntimeException)
		  Var cnrStringBuilderArrayVar() As String
		  cnrStringBuilderArrayVar.Add("Server Socket Error")
		  cnrStringBuilderArrayVar.Add("Error Code: " + cnrErrorCodeParam.ToString)
		  If cnrRuntimeExceptionParam = Nil Then
		    cnrStringBuilderArrayVar.Add("Runtime Eception is missing (cnrRuntimeExceptionParam = Nil)")
		  Else
		    cnrStringBuilderArrayVar.Add("Runtime Eception: " + cnrRuntimeExceptionParam.Message)
		  End If
		  
		  // save error and raise event
		  cnrSetLastError(CurrentMethodName, String.FromArray(cnrStringBuilderArrayVar, cnrEndOfLine))
		  
		  // apply server error policy
		  If cnrStopServerOnErrors And cnrServerSocketParam.IsListening Then
		    cnrServerSocketParam.StopListening
		  End If
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrMain()
		  #If TargetMacOS
		    cnrEndOfLine = EndOfLine.macOS
		  #EndIf
		  #If TargetWindows
		    cnrEndOfLine = EndOfLine.Windows
		  #EndIf
		  #If TargetLinux
		    cnrEndOfLine = EndOfLine.UNIX
		  #EndIf
		  
		  //********** error log **********
		  cnrError = New cnrErrorClass
		  
		  // https://docs.xojo.com/EndOfLine.CR
		  // https://docs.xojo.com/EndOfLine.LF
		  
		  cnrCR = Chr(13)
		  cnrLF = Chr(10)
		  cnrCRLF = cnrCR + cnrLF
		  cnrHTAB = Chr(9)
		  cnrSP = Chr(32)
		  cnrWSP = cnrSP + cnrHTAB
		  
		  cnrServerUUID = cnrGetNewUUID
		  cnrStopServerOnErrors = True
		  
		  //********** server socket **********
		  
		  cnrServerSocket = New ServerSocket
		  If cnrServerSocket = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrServerSocket = Nil")
		    Return
		  End If
		  AddHandler cnrServerSocket.AddSocket, AddressOf cnrHandleServerSocketAddSocket
		  AddHandler cnrServerSocket.Error, AddressOf cnrHandleServerSocketError
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrServerIsListening() As Boolean
		  If cnrServerSocket = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrServerSocket = Nil.")
		    Return False
		  End If
		  
		  Return cnrServerSocket.IsListening
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrSetLastError(cnrOriginParam As String, cnrMessageParam As String)
		  If cnrError = Nil Then
		    System.DebugLog("ERROR: cnrError = Nil - " + CurrentMethodName)
		  End If
		  If cnrOriginParam.IsEmpty Then
		    System.DebugLog("ERROR: cnrOriginParam.IsEmpty - " + CurrentMethodName)
		  End If
		  If cnrMessageParam.IsEmpty Then
		    System.DebugLog("ERROR: cnrMessageParam.IsEmpty - " + CurrentMethodName)
		  End If
		  
		  // save
		  cnrError.cnrAddError(cnrOriginParam, cnrMessageParam)
		  
		  // notify
		  RaiseEvent cnrServerErrorEvent
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrStartServer(cnrPortParam As Integer)
		  If cnrServerSocket = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrServerSocket = Nil.")
		    Return
		  End If
		  If cnrServerSocket.IsListening Then
		    cnrSetLastError(CurrentMethodName, "Server is running")
		    Return
		  End If
		  If cnrPortParam <= 0 Or cnrPortParam > 65000 Then
		    cnrSetLastError(CurrentMethodName, "cnrPortParam Out of Range")
		    Return
		  End If
		  
		  cnrServerSocket.Port = cnrPortParam
		  cnrServerSocket.Listen
		  RaiseEvent cnrServerStartEvent
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrStopServer()
		  If cnrServerSocket = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrServerSocket = Nil.")
		    Return
		  End If
		  If Not cnrServerSocket.IsListening Then
		    cnrSetLastError(CurrentMethodName, "Server is not running")
		    Return
		  End If
		  
		  cnrServerSocket.StopListening
		  RaiseEvent cnrServerStopEvent
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor()
		  cnrMain
		  
		End Sub
	#tag EndMethod


	#tag Hook, Flags = &h0
		Event cnrNewHTTPSocketEvent(cnrHTTPConnectionParam As cnrHTTPConnectionClass)
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrServerErrorEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrServerStartEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrServerStopEvent()
	#tag EndHook


	#tag Note, Name = BUGSFile and header size do not correspond to socket
		file/header size is different than socket data sent size.
		
		
	#tag EndNote

	#tag Note, Name = Code Snippets
		// TEST
		
		Var cnrTestStringVar As String
		cnrTestStringVar = cnrDataVar
		cnrTestStringVar = cnrTestStringVar.ReplaceAll(Chr(13), "<CR>")
		cnrTestStringVar = cnrTestStringVar.ReplaceAll(Chr(10), "<LF>")
		
		System.DebugLog(cnrTestStringVar)
		
	#tag EndNote

	#tag Note, Name = HTTP Authentication
		HTTP Authentication
		-----------------------------------------------------
		
		The HTTP authentication framework can be used by a server to 
		challenge a client request, and by a client to provide authentication information.
		Browsers use utf-8 encoding for usernames and passwords.
		
		In security protocols, a challenge is some data sent to the client by the server 
		in order to generate a different response each time.
		
		The challenge and response flow works like this:
		
		    The server responds to a client with a 401 (Unauthorized) response status and 
		    provides information on how to authorize with a WWW-Authenticate response 
		    header containing at least one challenge.
		    A client that wants to authenticate itself with the server can then do so by 
		    including an Authorization request header with the credentials.
		    Usually a client will present a password prompt to the user and will then issue 
		    the request including the correct Authorization header.
		
		
		The 'Basic' HTTP Authentication Scheme
		-----------------------------------------------------
		
		The HTTP authentication protocol is challenge-response based, though the 
		"Basic" protocol isn't using a real challenge (the realm is always the same).
		The "Basic" authentication scheme sends the credentials encoded but not encrypted.
		This is completely insecure unless the exchange was over a secure connection (HTTPS/TLS).
		
		The "Basic" HTTP authentication scheme is defined in RFC 7617, which transmits 
		credentials as user ID/password pairs, encoded using base64.
		
		
		
		Links
		-----------------------------------------------------
		
		https://datatracker.ietf.org/doc/html/rfc7235
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
		https://developer.mozilla.org/en-US/docs/Glossary/challenge
		https://datatracker.ietf.org/doc/html/rfc7617
		https://httpwg.org/specs/rfc7235.html#status.401
		
	#tag EndNote

	#tag Note, Name = HTTP Headers
		HTTP Headers
		-----------------------------------------------------
		
		HTTP headers let the client and the server pass additional information with an HTTP request or response.
		An HTTP header consists of its case-insensitive name followed by a colon (:), then by its value.
		Whitespace before the value is ignored.
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
		
		Custom proprietary headers:
		https://www.iana.org/assignments/message-headers/message-headers.xhtml
		
		Original content defined in RFC 4229:
		https://datatracker.ietf.org/doc/html/rfc4229
		
		
		Headers can be grouped according to their contexts:
		    Request headers contain more information about the resource to be fetched, or about the client requesting the resource.
		    Response headers hold additional information about the response, like its location or about the server providing it.
		    Representation headers contain information about the body of the resource, like its MIME type, or encoding/compression applied.
		    Payload headers contain representation-independent information about payload data, including content length and the encoding used for transport.
		
		
		Links
		-----------------------------------------------------
		
		https://datatracker.ietf.org/doc/html/rfc7231#section-5
		https://developer.mozilla.org/en-US/docs/Glossary/Request_header
		https://developer.mozilla.org/en-US/docs/Glossary/Response_header
		https://developer.mozilla.org/en-US/docs/Glossary/CORS
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
		
		
		Notes
		-----------------------------------------------------
		
		Connection-specific header fields such as Connection and Keep-Alive are prohibited in HTTP/2
		
	#tag EndNote

	#tag Note, Name = HTTP Message
		HTTP Message
		-----------------------------------------------------
		
		HTTP messages are composed of textual information encoded 
		in ASCII, and span over multiple lines.
		In HTTP/1.1, and earlier versions of the protocol, these messages 
		were openly sent across the connection.
		
		In HTTP/2, the once human-readable message is now divided up 
		into HTTP frames, providing optimization and performance improvements.
		
		Proxies and servers provide HTTP messages through config files.
		
		
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages
		
	#tag EndNote

	#tag Note, Name = HTTP Request Body
		Message Body
		-----------------------------------------------------
		
		The message-body (if any) of an HTTP message is used to carry the
		entity-body associated with the request or response. The message-body
		differs from the entity-body only when a transfer-coding has been
		applied, as indicated by the Transfer-Encoding header field (section
		14.41).
		
		    message-body = entity-body
		                    | <entity-body encoded as per Transfer-Encoding>
		
		Transfer-Encoding MUST be used to indicate any transfer-codings
		applied by an application to ensure safe and proper transfer of the
		message. Transfer-Encoding is a property of the message, not of the
		entity, and thus MAY be added or removed by any application along the
		request/response chain. (However, section 3.6 places restrictions on
		when certain transfer-codings may be used.)
		
		The rules for when a message-body is allowed in a message differ for
		requests and responses.
		
		The presence of a message-body in a request is signaled by the
		inclusion of a Content-Length or Transfer-Encoding header field in
		the request's message-headers. A message-body MUST NOT be included in
		a request if the specification of the request method (section 5.1.1)
		does not allow sending an entity-body in requests. A server SHOULD
		read and forward a message-body on any request; if the request method
		does not include defined semantics for an entity-body, then the
		message-body SHOULD be ignored when handling the request.
		
		For response messages, whether or not a message-body is included with
		a message is dependent on both the request method and the response
		status code (section 6.1.1). All responses to the HEAD request method
		MUST NOT include a message-body, even though the presence of entity-
		header fields might lead one to believe they do. All 1xx
		(informational), 204 (no content), and 304 (not modified) responses
		MUST NOT include a message-body. All other responses do include a
		message-body, although it MAY be of zero length.
		
		https://datatracker.ietf.org/doc/html/rfc2616#section-4.3
		
		
	#tag EndNote

	#tag Note, Name = HTTP Request Methods
		Request Methods
		-----------------------------------------------------
		
		Method names are case sensitive.
		All general-purpose HTTP servers are required to implement at least the GET and HEAD methods, and all 
		other methods are considered optional by the specification.
		https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
		
		
		GET
		Required.
		The GET method requests that the target resource transfers a representation of its state.
		GET requests should only retrieve data and should have no other effect.
		
		HEAD
		Required.
		The HEAD method requests that the target resource transfers a representation of its state, 
		like for a GET request, but without the representation data enclosed in the response body.
		This is useful for retrieving the representation metadata in the response header, without 
		having to transfer the entire representation.
		
		POST
		The POST method requests that the target resource processes the representation enclosed 
		in the request according to the semantics of the target resource.
		For example, it is used for posting a message to an Internet forum, subscribing to a mailing list, 
		or completing an online shopping transaction.
		
		PUT
		The PUT method requests that the target resource creates or updates its state with the state 
		defined by the representation enclosed in the request.
		
		DELETE
		The DELETE method requests that the target resource deletes its state.
		
		CONNECT
		The CONNECT method request that the intermediary establishes a TCP/IP tunnel to the 
		origin server identified by the request target.
		It is often used to secure connections through one or more HTTP proxies with TLS.
		
		OPTIONS
		The OPTIONS method requests that the target resource transfers the HTTP methods that it supports.
		This can be used to check the functionality of a web server.
		
		TRACE
		The TRACE method requests that the target resource transfers the received request in the response body.
		That way a client can see what (if any) changes or additions have been made by intermediaries.
		
		PATCH
		The PATCH method requests that the target resource modifies its state according to the partial update 
		defined in the representation enclosed in the request.
		
		
	#tag EndNote

	#tag Note, Name = README
		Copyright Carlos N Reina
		cnreina@gmail.com
		
		Class cnrHTTPServerClass
		----------------------------------------------------------
		
		Stand alone class.
		Implements server socket as an internal component to maintain
		independence and make it easier to update, upgrade, or change.
		
		Application Basic Flow
		----------------------------------------------------------
		
		Constructor
		cnrStartServer
		cnrHandleServerSocketAddSocket or cnrHandleServerSocketError
		cnrHandleTCPSocketDataAvailable
		cnrProcessHTTPMessage
		cnrProcessHTTPRequest > cnrSendHTTPSRedirectResponse > cnrProcessHTTPSession
		
		
		GET Requests
		----------------------------------------------------------
		
		http://localhost:8080
		http://localhost:8080/index.html
		http://localhost:8080/api/test1
		
		
		POST Requests
		----------------------------------------------------------
		
		http://localhost:8080/cnrForm.cnr
		http://localhost:8080/cnrCommand.cnr
		
		
		
	#tag EndNote

	#tag Note, Name = RFC822 Simple Field Parsing
		Simple Field Parsing
		---------------------------------------------------------------
		
		Some mail-reading software systems may wish to perform only 
		minimal processing, ignoring the internal syntax of structured 
		field-bodies and treating them the same as unstructured-field-bodies.
		Such software will need only to distinguish:
		
		    Header fields from the message body,
		    Beginnings of fields from lines which continue fields,
		    Field-names from field-contents. 
		
		The abbreviated set of syntactic rules which follows will suffice 
		for this purpose. It describes a limited view of messages and is 
		a subset of the syntactic rules provided in the main part of this 
		specification. 
		One small exception is that the contents of field-bodies consist 
		only of text:
		
		B.1. SYNTAX
		
		message         =   *field *(CRLF *text)
		
		field                 =    field-name ":" [field-body] CRLF
		
		field-name      =  1*<any CHAR, excluding CTLs, SPACE, and ":">
		
		field-body       =   *text [CRLF LWSP-char field-body]
		
		
		B.2. SEMANTICS
		
		Headers occur before the message body and are terminated  by
		a null line (i.e., two contiguous CRLFs).
		
		// A line which continues a header field begins with a SPACE or
		// HTAB  character,  while  a  line  beginning a field starts with a
		// printable character which is not a colon.
		
		// A field-name consists of one or  more  printable  characters
		// (excluding  colon,  space, and control-characters).  A field-name
		// MUST be contained on one line.  Upper and lower case are not dis-
		// tinguished when comparing field-names.
		
	#tag EndNote

	#tag Note, Name = TODO
		
		Session class?
		method cnrGetLastRequestObjectFromSession(cnrSessionIDParam As String)?
		
		Server close event data > save last closed status to startup file. Check field on startup. Handle previous closing errors, Etc.
		
		create template for javascript after frontend is fully implemented.
		save backend as web server template after fully implemented.
		
		HTTP Authentication
		cnrResourceAccess.cnr to record access policy.
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
		
		refactor cnrSendHTTPErrorResponse > include request data? driven by request type?
		
		cnreina web comms protocol to ensure compliance with cnrWebServer and standards.
		
		json class and structures
		
		permissions scheme > access, create, modify, execute, Etc.
		
		implement process device type
		// Direct user to the right page for their device.
		select case Self.Platform
		case PlatformType.AndroidPhone
		  MobileMainPage.Show
		case PlatformType.AndroidTablet
		  MainPage.Show
		case PlatformType.Blackberry
		  MobileMainPage.Show
		case PlatformType.iPad
		  MainPage.Show
		case PlatformType.iPhone
		  MobileMainPage.Show
		case PlatformType.iPodTouch
		  MobileMainPage.Show
		case PlatformType.Linux
		  MainPage.Show
		case PlatformType.Macintosh
		  MainPage.Show
		case PlatformType.PS3
		  MainPage.Show
		case PlatformType.WebOS
		  MainPage.Show
		case PlatformType.Wii
		  MainPage.Show
		case PlatformType.Windows
		  MainPage.Show
		case PlatformType.Unknown
		  MobileMainPage.Show
		end select
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrCR As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrCRLF As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrEndOfLine As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrError As cnrErrorClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrHTAB As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLF As String
	#tag EndProperty

	#tag ComputedProperty, Flags = &h0
		#tag Getter
			Get
			  // connections string
			  Var cnrCountVar As Integer
			  Var cnrConnectionsStringVar() As String
			  cnrConnectionsStringVar.Add("***** Server Active Connections *****")
			  Var cnrTCPSocketArrayVar() As TCPSocket = cnrServerSocket.ActiveConnections
			  For cnrCountVar = 0 To cnrTCPSocketArrayVar.LastIndex
			    cnrConnectionsStringVar.Add("--------------------------------------")
			    cnrConnectionsStringVar.Add("Socket ID: " + cnrTCPSocketArrayVar(cnrCountVar).Handle.ToString)
			    cnrConnectionsStringVar.Add("Socket Address: " + cnrTCPSocketArrayVar(cnrCountVar).LocalAddress)
			    cnrConnectionsStringVar.Add("Socket Remote Address: " + cnrTCPSocketArrayVar(cnrCountVar).RemoteAddress)
			    cnrConnectionsStringVar.Add("Socket Port: " + cnrTCPSocketArrayVar(cnrCountVar).Port.ToString)
			  Next
			  Return String.FromArray(cnrConnectionsStringVar, cnrCRLF)
			  
			End Get
		#tag EndGetter
		#tag Setter
			Set
			  Return
			  
			End Set
		#tag EndSetter
		cnrServerConnectionsString As String
	#tag EndComputedProperty

	#tag Property, Flags = &h0
		cnrServerSocket As ServerSocket
	#tag EndProperty

	#tag ComputedProperty, Flags = &h0
		#tag Getter
			Get
			  Var cnrStringBuilderVar() As String
			  cnrStringBuilderVar.Add("Server Time: " + cnrServerTime)
			  cnrStringBuilderVar.Add("Server ID: " + cnrServerSocket.Handle.ToString)
			  cnrStringBuilderVar.Add("Server UUID: " + cnrServerUUID)
			  cnrStringBuilderVar.Add("Server Local Address: " + cnrServerSocket.LocalAddress)
			  cnrStringBuilderVar.Add("Server Port: " + cnrServerSocket.Port.ToString)
			  
			  Var cnrErrorsArraytringVar As String = String.FromArray(cnrStringBuilderVar, EndOfLine)
			  Return cnrErrorsArraytringVar
			  
			End Get
		#tag EndGetter
		#tag Setter
			Set
			  Return
			  
			End Set
		#tag EndSetter
		cnrServerString As String
	#tag EndComputedProperty

	#tag ComputedProperty, Flags = &h0
		#tag Getter
			Get
			  Return DateTime.Now.ToString
			  
			End Get
		#tag EndGetter
		#tag Setter
			Set
			  Return
			  
			End Set
		#tag EndSetter
		cnrServerTime As String
	#tag EndComputedProperty

	#tag Property, Flags = &h0
		cnrServerUUID As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSP As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrStopServerOnErrors As Boolean
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrWSP As String
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
		#tag ViewProperty
			Name="cnrServerUUID"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrServerConnectionsString"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrServerTime"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrServerString"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
	#tag EndViewBehavior
End Class
#tag EndClass
