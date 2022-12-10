#tag Class
Protected Class cnrSSP71ConnectionClass
	#tag Method, Flags = &h0
		Sub cnrConnectionClose()
		  // connect to device
		  If Not cnrSSP71Socket.IsConnected Then
		    Return
		  End If
		  cnrSSP71Socket.Disconnect
		  
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionCommandSent() As String
		  Return cnrSSP71Command.cnrInfo
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionDataReceived() As String
		  Return cnrSSP71Data
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionError() As String
		  Return cnrLastErrorMessage
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionInfo() As String
		  Return cnrConnectionInfoString
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrConnectionOpen(cnrAddressParam As String, cnrPortParam As Integer)
		  // connect to device
		  If cnrSSP71Socket.IsConnected Then
		    Return
		  End If
		  If cnrAddressParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrAddressParam.IsEmpty")
		    Return
		  End If
		  If cnrPortParam < 1 Or cnrPortParam > 65535 Then
		    cnrSetLastError(CurrentMethodName, "cnrPortParam < 1 Or cnrPortParam > 65535 ")
		    Return
		  End If
		  
		  cnrSSP71Socket.Address = cnrAddressParam
		  cnrSSP71Socket.Port = cnrPortParam
		  cnrSSP71Socket.Connect
		  
		  Var cnrStringBuilder() As String
		  cnrStringBuilder.Add("Socket ID: " + cnrSSP71Socket.Handle.ToString)
		  cnrStringBuilder.Add("Socket UUID: " + cnrConnectionUUID)
		  cnrStringBuilder.Add("Socket Local Address: " + cnrSSP71Socket.LocalAddress)
		  cnrStringBuilder.Add("Socket Remote Address: " + cnrSSP71Socket.RemoteAddress)
		  cnrStringBuilder.Add("Socket Port: " + cnrSSP71Socket.Port.ToString)
		  cnrConnectionInfoString = String.FromArray(cnrStringBuilder, EndOfLine)
		  
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionRawData() As String
		  Return cnrSSP71RawData
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrConnectionUUID() As String
		  Return cnrConnectionUUID
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceCONNECTED() As Boolean
		  Return cnrSSP71Socket.IsConnected
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceINFO() As String
		  Return cnrSSP71Device.cnrInfo
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceINITIALIZED() As Boolean
		  Var cnrInitializedVar As Boolean
		  cnrInitializedVar = cnrSSP71Device.cnrINPUT > 0 And cnrSSP71Device.cnrLMODE >= 0 And _
		  cnrSSP71Device.cnrMUTED >= 0 And cnrSSP71Device.cnrVOLUME >= 0 And cnrSSP71Device.cnrDeviceName <> ""
		  
		  Return cnrInitializedVar
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceINPUT() As Integer
		  Return cnrSSP71Device.cnrINPUT
		  
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceLMODE() As Integer
		  Return cnrSSP71Device.cnrLMODE
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceLMODEName() As String
		  Return cnrSSP71Device.cnrLMODEName
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceMUTED() As Integer
		  Return cnrSSP71Device.cnrMUTED
		  
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceName() As String
		  Return cnrSSP71Device.cnrDeviceName
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrDeviceVOLUME() As Integer
		  Return cnrSSP71Device.cnrVOLUME
		  
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
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    Return
		  End If
		  
		  cnrConnectionUUID = cnrGetNewUUID
		  cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_CONNECTED_CONST
		  cnrUpdateConnectionInfoData
		  cnrUpdateDeviceData
		  
		  RaiseEvent cnrSSP71ConnectedEvent
		  
		  cnrSSP71StartTimer.RunMode = timer.RunModes.Multiple
		  
		  Return
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketDataAvailableEvent(cnrSenderParam As TCPSocket)
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    Return
		  End If
		  
		  // ********** PROCESS MESSAGE
		  Var cnrDataVar As String = cnrSSP71Socket.ReadAll
		  cnrDataVar = cnrDataVar.Trim
		  If cnrDataVar.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrDataVar.IsEmpty")
		    Return
		  End If
		  cnrSSP71RawData = cnrDataVar
		  cnrProcessSSP71Data(cnrDataVar)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketErrorEvent(cnrSenderParam As TCPSocket, cnrErrorParam As RuntimeException)
		  If cnrSenderParam = Nil Then
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    Return
		  End If
		  
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
		  
		  
		  // process error number
		  Select Case cnrErrorParam.ErrorNumber
		  Case 0
		    Return
		    
		  Case 100
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  Case 102
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    cnrUpdateConnectionInfoData
		    cnrUpdateDeviceData
		    RaiseEvent cnrSSP71DisconnectedEvent
		    
		  Case 103
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  Case 105
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  Case 106
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  Case 107
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  Case 108
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  Case Else
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    RaiseEvent cnrSSP71ErrorEvent
		    
		  End Select
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleSocketSendCompleteEvent(cnrSenderParam As TCPSocket, cnrUserAbortedParam As Boolean)
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    Return
		  End If
		  
		  If cnrUserAbortedParam Then
		    RaiseEvent cnrSSP71DisconnectedEvent
		    If cnrSSP71Socket.IsConnected Then
		      cnrSSP71Socket.Disconnect
		    End If
		    Return
		  End If
		  
		  RaiseEvent cnrSSP71DataSendCompleteEvent
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrHandleSocketSendProgressEvent(cnrSenderParam As TCPSocket, cnrBytesSentParam As Integer, cnrBytesLeftParam As Integer) As Boolean
		  // Returning True from this event causes the send to be cancelled.
		  // This does not close the socket's connection; it only clears the buffer.
		  // After all of the data has been transferred you will get a final SendProgress event followed by a SendComplete event.
		  // bytesSent is the number of bytes that were sent in the chunk, not the total number of bytes sent.
		  // https://docs.xojo.com/TCPSocket.SendProgress
		  
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    Return True
		  End If
		  
		  RaiseEvent cnrSSP71SendProgressEvent(cnrBytesSentParam, cnrBytesLeftParam)
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleStartTimerActionEvent(cnrSenderParam As Timer)
		  If cnrSenderParam = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSenderParam = Nil")
		    Return
		  End If
		  
		  If Not cnrDeviceCONNECTED Then
		    cnrSSP71StartTimer.RunMode = timer.RunModes.Off
		    #If DebugBuild
		      System.DebugLog(CurrentMethodName + " - Not cnrDeviceCONNECTED - Me.RunMode = timer.RunModes.Off" + EndOfLine)
		    #EndIf
		    Return
		  End If
		  If cnrDeviceINITIALIZED Then
		    cnrSSP71StartTimer.RunMode = timer.RunModes.Off
		    #If DebugBuild
		      System.DebugLog(CurrentMethodName + " - cnrDeviceINITIALIZED - Me.RunMode = timer.RunModes.Off" + EndOfLine)
		    #EndIf
		    RaiseEvent cnrSSP71DeviceInitializedEvent
		    Return
		  End If
		  
		  If cnrDeviceINPUT = -1 Then
		    cnrSendSSP71Command(cnrSSP71_COMMAND_GET_INPUT_CONST, "")
		    cnrSSP71StartTimer.Reset
		    Return
		  End If
		  
		  If cnrDeviceLMODE = -1 Then
		    cnrSendSSP71Command(cnrSSP71_COMMAND_GET_LMODE_CONST, "")
		    cnrSSP71StartTimer.Reset
		    Return
		  End If
		  
		  If cnrDeviceMUTED = -1 Then
		    cnrSendSSP71Command(cnrSSP71_COMMAND_GET_MUTE_CONST, "")
		    cnrSSP71StartTimer.Reset
		    Return
		  End If
		  
		  If cnrDeviceVOLUME = -1 Then
		    cnrSendSSP71Command(cnrSSP71_COMMAND_GET_VOL_CONST, "")
		    cnrSSP71StartTimer.Reset
		    Return
		  End If
		  
		  If cnrDeviceName.IsEmpty Then
		    cnrSendSSP71Command(cnrSSP71_COMMAND_GET_NAME_CONST, "")
		    cnrSSP71StartTimer.Reset
		    Return
		  End If
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrProcessSSP71Data(cnrDataParam as string)
		  //********** PROCESS DATA
		  Var cnrDataParamVar As String = cnrDataParam.Trim
		  Var cnrDataLineArrayVar() As String = cnrDataParamVar.Split(EndOfLine.CRLF)
		  If cnrDataLineArrayVar.LastIndex < 0 Then
		    cnrSetLastError(CurrentMethodName, "cnrDataLineArrayVar.LastIndex < 0")
		    Return
		  End If
		  
		  // notify
		  cnrSSP71Data = String.FromArray(cnrDataLineArrayVar, EndOfLine.CRLF)
		  RaiseEvent cnrSSP71DataAvailableEvent
		  
		  For Each cnrDataLineVar As String In cnrDataLineArrayVar
		    // status report data line
		    // Ex; Aud03 LMod08 Vol044 Mut0
		    If cnrDataLineVar.BeginsWith("Aud0") Then
		      Continue
		      
		    Else
		      // process event message
		      cnrProcessSSP71Event(cnrDataLineVar)
		      
		    End If
		  Next
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrProcessSSP71Event(cnrDataParam as string)
		  //********** PROCESS EVENT MESSAGE
		  
		  If cnrSSP71Device = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrDeviceStateData = Nil")
		    Return
		  End If
		  If cnrDataParam.IsEmpty Then
		    Return
		  End If
		  Var cnrDataLineVar As String = cnrDataParam
		  
		  // prepare event object
		  Var cnrEventVar As cnrSSP71EventStruct = New cnrSSP71EventStruct
		  If cnrEventVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrEventVar = Nil")
		    Return
		  End If
		  cnrEventVar.cnrEvent = cnrDataLineVar
		  cnrEventVar.cnrConnectionUUID = cnrConnectionUUID
		  cnrEventVar.cnrSourceAddress = cnrSSP71Socket.LocalAddress
		  cnrEventVar.cnrDestinationAddress = cnrSSP71Socket.RemoteAddress
		  cnrSSP71Event.cnrPort = cnrSSP71Socket.Port
		  
		  // process events
		  Select Case cnrDataLineVar
		    // input event line
		    // Ex; Aud1
		  Case cnrSSP71_EVENT_INPUT_CHANGED_CONST + "1"
		    If cnrSSP71Device.cnrINPUT <> 1 Then
		      cnrSSP71Device.cnrINPUT = 1
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_INPUT_CHANGED_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_INPUT_CHANGED_CONST
		      cnrEventVar.cnrParameter = "1"
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71InputChangedEvent
		    End If
		    Return
		    
		  Case cnrSSP71_EVENT_INPUT_CHANGED_CONST + "2"
		    If cnrSSP71Device.cnrINPUT <> 2 Then
		      cnrSSP71Device.cnrINPUT = 2
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_INPUT_CHANGED_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_INPUT_CHANGED_CONST
		      cnrEventVar.cnrParameter = "2"
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71InputChangedEvent
		    End If
		    Return
		    
		  Case cnrSSP71_EVENT_INPUT_CHANGED_CONST + "3"
		    If cnrSSP71Device.cnrINPUT <> 3 Then
		      cnrSSP71Device.cnrINPUT = 3
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_INPUT_CHANGED_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_INPUT_CHANGED_CONST
		      cnrEventVar.cnrParameter = "3"
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71InputChangedEvent
		    End If
		    Return
		    
		  Case cnrSSP71_EVENT_INPUT_CHANGED_CONST + "4"
		    If cnrSSP71Device.cnrINPUT <> 4 Then
		      cnrSSP71Device.cnrINPUT = 4
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_INPUT_CHANGED_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_INPUT_CHANGED_CONST
		      cnrEventVar.cnrParameter = "4"
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71InputChangedEvent
		    End If
		    Return
		    
		  Case cnrSSP71_EVENT_INPUT_CHANGED_CONST + "5"
		    If cnrSSP71Device.cnrINPUT <> 5 Then
		      cnrSSP71Device.cnrINPUT = 5
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_INPUT_CHANGED_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_INPUT_CHANGED_CONST
		      cnrEventVar.cnrParameter = "5"
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71InputChangedEvent
		    End If
		    Return
		    
		    // mute
		  Case cnrSSP71_EVENT_MUTE_ON_CONST
		    If cnrSSP71Device.cnrMUTED <> 1 Then
		      cnrSSP71Device.cnrMUTED = 1
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_MUTE_ON_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_MUTE_ON_CONST
		      cnrEventVar.cnrParameter = ""
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71MuteChangedEvent
		    End If
		    Return
		    
		  Case cnrSSP71_EVENT_MUTE_OFF_CONST
		    If cnrSSP71Device.cnrMUTED <> 0 Then
		      cnrSSP71Device.cnrMUTED = 0
		      cnrEventVar.cnrEventName = "cnrSSP71_EVENT_MUTE_OFF_CONST"
		      cnrEventVar.cnrHeader = cnrSSP71_EVENT_MUTE_OFF_CONST
		      cnrEventVar.cnrParameter = ""
		      cnrSSP71Event = cnrEventVar
		      RaiseEvent cnrSSP71MuteChangedEvent
		    End If
		    Return
		    
		  Case Else
		    // volume
		    If cnrDataLineVar.BeginsWith(cnrSSP71_EVENT_VOLUME_CHANGED_CONST + "0") Then
		      If cnrSSP71Device.cnrVOLUME = -1 Or cnrSSP71Device.cnrVOLUME <> cnrDataLineVar.Right(2).ToInteger Then
		        cnrSSP71Device.cnrVOLUME = cnrDataLineVar.Right(2).ToInteger
		        cnrEventVar.cnrEventName = "cnrSSP71_EVENT_VOLUME_CHANGED_CONST"
		        cnrEventVar.cnrHeader = cnrSSP71_EVENT_VOLUME_CHANGED_CONST
		        cnrEventVar.cnrParameter = ""
		        cnrSSP71Event = cnrEventVar
		        RaiseEvent cnrSSP71VolumeChangedEvent
		      End If
		      Return
		    End If
		    
		    // listening mode
		    // SspL03*00*00
		    If cnrDataLineVar.BeginsWith(cnrSSP71_EVENT_LMODE_CHANGED_CONST) Then
		      If cnrSSP71Device.cnrLMODE = -1 Or cnrSSP71Device.cnrLMODE <> cnrDataLineVar.Right(2).ToInteger Then
		        cnrSSP71Device.cnrLMODE = cnrDataLineVar.Right(2).ToInteger
		        cnrEventVar.cnrEventName = "cnrSSP71_EVENT_LMODE_CHANGED_CONST"
		        cnrEventVar.cnrHeader = cnrSSP71_EVENT_LMODE_CHANGED_CONST
		        cnrEventVar.cnrParameter = ""
		        cnrSSP71Event = cnrEventVar
		        RaiseEvent cnrSSP71ListeningModeChangedEvent
		      End If
		      Return
		    End If
		    
		    // name
		    If cnrDataLineVar.BeginsWith(cnrSSP71_EVENT_NAME_CONST) Then
		      If cnrSSP71Device.cnrDeviceName.IsEmpty Or cnrSSP71Device.cnrDeviceName <> cnrDataLineVar Then
		        cnrSSP71Device.cnrDeviceName = cnrDataLineVar
		        cnrEventVar.cnrEventName = "cnrSSP71_EVENT_NAME_CONST"
		        cnrEventVar.cnrHeader = cnrSSP71_EVENT_NAME_CONST
		        cnrEventVar.cnrParameter = ""
		        cnrSSP71Event = cnrEventVar
		        RaiseEvent cnrSSP71VolumeChangedEvent
		      End If
		      Return
		    End If
		    
		  End Select
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrSendSSP71Command(cnrCommandParam As String, cnrValueParam As String)
		  If cnrCommandParam.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrCommandParam.IsEmpty")
		    Return
		  End If
		  If cnrSSP71Socket.IsConnected Then
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_CONNECTED_CONST
		  Else
		    cnrSSP71Device.cnrCONNECTED = cnrSSP71_STATUS_DISCONNECTED_CONST
		    cnrSetLastError(CurrentMethodName, "cnrSSP71_STATUS_DISCONNECTED_CONST")
		    Return
		  End If
		  If cnrConnectionUUID.IsEmpty Then
		    cnrSetLastError(CurrentMethodName, "cnrConnectionUUID.IsEmpty")
		    cnrSSP71Socket.Disconnect
		    Return
		  End If
		  If cnrSSP71Device = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrSSP71Device = Nil")
		    Return
		  End If
		  
		  //********** PREPARE COMMAND
		  // cnrSSP71CommandStruct checks for valid command constant
		  // cnrHeader = command constant
		  // cnrParameter = command parameter
		  // cnrCommand = command to be sent (may include cnrHeader and cnrParameter)
		  
		  Var cnrCommandVar As cnrSSP71CommandStruct = New cnrSSP71CommandStruct
		  If cnrCommandVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrCommandVar = Nil")
		    Return
		  End If
		  
		  Select Case cnrCommandParam
		    // volume
		  Case cnrSSP71_COMMAND_GET_VOL_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_GET_VOL_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_GET_VOL_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_GET_VOL_CONST
		    
		  Case cnrSSP71_COMMAND_VOL_UP_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_VOL_UP_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_VOL_UP_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_VOL_UP_CONST
		    
		  Case cnrSSP71_COMMAND_VOL_DOWN_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_VOL_DOWN_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_VOL_DOWN_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_VOL_DOWN_CONST
		    
		  Case cnrSSP71_COMMAND_VOL_SET_CONST
		    If cnrValueParam.IsEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrValueParam.IsEmpty")
		      Return
		    End If
		    If cnrValueParam.ToInteger < 0 Or cnrValueParam.ToInteger > 99 Then
		      cnrSetLastError(CurrentMethodName, "cnrValueParam.ToInteger < 0 Or cnrValueParam.ToInteger > 99")
		      Return
		    End If
		    If cnrSSP71Device.cnrVOLUME = cnrValueParam.ToInteger Then
		      Return
		    End If
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_VOL_SET_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_VOL_SET_CONST
		    cnrCommandVar.cnrParameter = cnrValueParam
		    cnrCommandVar.cnrCommand = cnrValueParam + cnrSSP71_COMMAND_VOL_SET_CONST.Replace("x", "")
		    
		    // mute
		  Case cnrSSP71_COMMAND_GET_MUTE_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_GET_MUTE_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_GET_MUTE_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_GET_MUTE_CONST
		    
		  Case cnrSSP71_COMMAND_MUTE_ON_CONST
		    If cnrSSP71Device.cnrMUTED = 1 Then
		      Return
		    End If
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_MUTE_ON_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_MUTE_ON_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_MUTE_ON_CONST
		    
		  Case cnrSSP71_COMMAND_MUTE_OFF_CONST
		    If cnrSSP71Device.cnrMUTED = 0 Then
		      Return
		    End If
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_MUTE_OFF_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_MUTE_OFF_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_MUTE_OFF_CONST
		    
		    // input
		  Case cnrSSP71_COMMAND_GET_INPUT_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_GET_INPUT_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_GET_INPUT_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_GET_INPUT_CONST
		    
		  Case cnrSSP71_COMMAND_INPUT_CONST
		    If cnrValueParam.IsEmpty Then
		      cnrSetLastError(CurrentMethodName, "cnrValueParam.IsEmpty")
		      Return
		    End If
		    If cnrValueParam.ToInteger < 1 Or cnrValueParam.ToInteger > 5 Then
		      cnrSetLastError(CurrentMethodName, "cnrValueParam.ToInteger < 1 Or cnrValueParam.ToInteger > 5")
		      Return
		    End If
		    If cnrSSP71Device.cnrINPUT = cnrValueParam.ToInteger Then
		      Return
		    End If
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_INPUT_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_INPUT_CONST
		    cnrCommandVar.cnrParameter = cnrValueParam
		    cnrCommandVar.cnrCommand = cnrValueParam + cnrSSP71_COMMAND_INPUT_CONST.Replace("x", "")
		    
		    // listening mode
		  Case cnrSSP71_COMMAND_GET_LMODE_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_GET_LMODE_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_GET_LMODE_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = Chr(27)  + cnrSSP71_COMMAND_GET_LMODE_CONST
		    
		    // name
		  Case cnrSSP71_COMMAND_GET_NAME_CONST
		    cnrCommandVar.cnrCommandName = "cnrSSP71_COMMAND_GET_NAME_CONST"
		    cnrCommandVar.cnrHeader = cnrSSP71_COMMAND_GET_NAME_CONST
		    cnrCommandVar.cnrParameter = ""
		    cnrCommandVar.cnrCommand = cnrSSP71_COMMAND_GET_NAME_CONST
		    
		  Case Else
		    cnrSetLastError(CurrentMethodName, "Unknown Command")
		    If cnrSSP71StartTimer.RunMode <> Timer.RunModes.Off Then
		      cnrSSP71StartTimer.RunMode = Timer.RunModes.Off
		    End If
		    Return
		    
		  End Select
		  
		  cnrCommandVar.cnrConnectionUUID = cnrConnectionUUID
		  cnrCommandVar.cnrSourceAddress = cnrSSP71Socket.LocalAddress
		  cnrCommandVar.cnrDestinationAddress = cnrSSP71Socket.RemoteAddress
		  cnrCommandVar.cnrPort = cnrSSP71Socket.Port
		  
		  // SAVE COMMAND
		  
		  If cnrCommandVar.cnrCommand.IsEmpty Then
		    Return
		  End If
		  cnrSSP71Command = cnrCommandVar
		  
		  //********** SEND COMMAND
		  
		  cnrSSP71Socket.Write(cnrCommandVar.cnrCommand + EndOfLine.CR)
		  cnrSSP71Socket.Flush
		  RaiseEvent cnrSSP71DataSendEvent
		  Return
		  
		  
		  
		  
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
		  cnrLastErrorMessage = "Error Source: " + cnrOriginParam + EndOfLine + "Error Message: " + cnrMessageParam
		  
		  // notify
		  RaiseEvent cnrSSP71ErrorEvent
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrUpdateConnectionInfoData()
		  Var cnrStringBuilderArrayVar() As String
		  cnrStringBuilderArrayVar.Add("Time: " + DateTime.Now.ToString)
		  cnrStringBuilderArrayVar.Add("Connected: " + cnrSSP71Socket.IsConnected.ToString)
		  cnrStringBuilderArrayVar.Add("Connection UUID: " + cnrConnectionUUID)
		  cnrStringBuilderArrayVar.Add("Socket ID: " + cnrSSP71Socket.Handle.ToString)
		  cnrStringBuilderArrayVar.Add("Local Address: " + cnrSSP71Socket.LocalAddress)
		  cnrStringBuilderArrayVar.Add("Remote Address: " + cnrSSP71Socket.RemoteAddress)
		  cnrStringBuilderArrayVar.Add("Connection Port: " + cnrSSP71Socket.Port.ToString)
		  cnrConnectionInfoString = String.FromArray(cnrStringBuilderArrayVar, EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrUpdateDeviceData()
		  If cnrSSP71Socket.IsConnected Then
		    cnrSSP71Device.cnrCONNECTED = 1
		    cnrSSP71Device.cnrConnectionUUID = cnrConnectionUUID
		  Else
		    cnrSSP71Device.cnrCONNECTED = 0
		    cnrSSP71Device.cnrConnectionUUID = ""
		    cnrSSP71Device.cnrINPUT = -1
		    cnrSSP71Device.cnrLMODE = -1
		    cnrSSP71Device.cnrMUTED = -1
		    cnrSSP71Device.cnrDeviceName = ""
		    cnrSSP71Device.cnrVOLUME = -1
		  End If
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor()
		  cnrConnectionInfoString = ""
		  cnrLastErrorMessage = ""
		  cnrSSP71Data = ""
		  
		  // device object
		  Var cnrNewDeviceStateVar As cnrSSP71DeviceStruct = New cnrSSP71DeviceStruct
		  If cnrNewDeviceStateVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewDeviceStateVar = Nil")
		    Return
		  End If
		  cnrSSP71Device = cnrNewDeviceStateVar
		  
		  // command object
		  Var cnrNewCommandVar As cnrSSP71CommandStruct = New cnrSSP71CommandStruct
		  If cnrNewCommandVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewCommandVar = Nil")
		    Return
		  End If
		  cnrSSP71Command = cnrNewCommandVar
		  
		  // event object
		  Var cnrNewEventVar As cnrSSP71EventStruct = New cnrSSP71EventStruct
		  If cnrNewEventVar = Nil Then
		    cnrSetLastError(CurrentMethodName, "cnrNewEventVar = Nil")
		    Return
		  End If
		  cnrSSP71Event = cnrNewEventVar
		  
		  // socket object
		  Var cnrNewSSP71SocketVar As TCPSocket = New TCPSocket
		  AddHandler cnrNewSSP71SocketVar.Connected, AddressOf cnrHandleSocketConnectedEvent
		  AddHandler cnrNewSSP71SocketVar.DataAvailable, AddressOf cnrHandleSocketDataAvailableEvent
		  AddHandler cnrNewSSP71SocketVar.Error, AddressOf cnrHandleSocketErrorEvent
		  AddHandler cnrNewSSP71SocketVar.SendComplete, AddressOf cnrHandleSocketSendCompleteEvent
		  AddHandler cnrNewSSP71SocketVar.SendProgress, AddressOf cnrHandleSocketSendProgressEvent
		  cnrSSP71Socket = cnrNewSSP71SocketVar
		  
		  // start timer
		  // activated on connection event
		  Var cnrNewTimerVar As Timer = New Timer
		  AddHandler cnrNewTimerVar.Action, AddressOf cnrHandleStartTimerActionEvent
		  cnrNewTimerVar.Period = 1350
		  cnrNewTimerVar.RunMode = Timer.RunModes.Off
		  cnrSSP71StartTimer = cnrNewTimerVar
		  
		  // initialize data
		  cnrUpdateConnectionInfoData
		  cnrUpdateDeviceData
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod


	#tag Hook, Flags = &h0
		Event cnrSSP71ConnectedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71DataAvailableEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71DataSendCompleteEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71DataSendEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71DeviceInitializedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71DisconnectedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71ErrorEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71InputChangedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71ListeningModeChangedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71MuteChangedEvent()
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71SendProgressEvent(cnrBytesSentParam As Integer, cnrBytesLeftParam As Integer)
	#tag EndHook

	#tag Hook, Flags = &h0
		Event cnrSSP71VolumeChangedEvent()
	#tag EndHook


	#tag Note, Name = README
		
		Listening Mode (LModXX)
		01 = Stereo
		02 = Mono
		03 = Stereo to All
		04 = Mono to All
		05 = Dolby Pro Logic
		06 = Dolby Pro Logic II/IIx Movie
		07 = Dolby Pro Logic II/IIx Music
		08 = Dolby Digital 5.1
		09 = Dolby Digital EX
		10 = Dolby Digital Pro Logic IIx Movie
		11 = Dolby Digital Pro Logic IIx Music
		12 = DTS or DTS 96/24
		13 = DTS ES Matrix or DTS 96/24 ES Matrix
		14 = DTS ES Discrete
		15 = DTS + Dolby EX or DTS 96/24 + Dolby EX
		16 = DTS + Dolby Pro Logic IIx Movie or DTS 96/24 + Dolby Pro Logic IIx Movie
		17 = DTS + Dolby Pro Logic IIx Music or DTS 96/24 + Dolby Pro Logic IIx Music
		18 = DTS Neo:6 Cinema
		19 = DTS Neo:6 Music
		
	#tag EndNote

	#tag Note, Name = TODO
		
		time field to dataavailable event
		
		set wofer levels
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrConnectionInfoString As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrConnectionUUID As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrLastErrorMessage As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71Command As cnrSSP71CommandStruct
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71Data As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71Device As cnrSSP71DeviceStruct
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71Event As cnrSSP71EventStruct
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71RawData As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71Socket As TCPSocket
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrSSP71StartTimer As Timer
	#tag EndProperty


	#tag Constant, Name = cnrSSP71_COMMAND_GET_INPUT_CONST, Type = String, Dynamic = False, Default = \"$", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_GET_LMODE_CONST, Type = String, Dynamic = False, Default = \"LSSP", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_GET_MUTE_CONST, Type = String, Dynamic = False, Default = \"Z", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_GET_NAME_CONST, Type = String, Dynamic = False, Default = \"1I", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_GET_VOL_CONST, Type = String, Dynamic = False, Default = \"V", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_INPUT_CONST, Type = String, Dynamic = False, Default = \"x$", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_MUTE_OFF_CONST, Type = String, Dynamic = False, Default = \"0Z", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_MUTE_ON_CONST, Type = String, Dynamic = False, Default = \"1Z", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_VOL_DOWN_CONST, Type = String, Dynamic = False, Default = \"-V", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_VOL_SET_CONST, Type = String, Dynamic = False, Default = \"xV", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_COMMAND_VOL_UP_CONST, Type = String, Dynamic = False, Default = \"+V", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_EVENT_INPUT_CHANGED_CONST, Type = String, Dynamic = False, Default = \"Aud", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_EVENT_LMODE_CHANGED_CONST, Type = String, Dynamic = False, Default = \"SspL", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_EVENT_MUTE_OFF_CONST, Type = String, Dynamic = False, Default = \"Amt0", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_EVENT_MUTE_ON_CONST, Type = String, Dynamic = False, Default = \"Amt1", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_EVENT_NAME_CONST, Type = String, Dynamic = False, Default = \"SSP", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_EVENT_VOLUME_CHANGED_CONST, Type = String, Dynamic = False, Default = \"Vol", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_CONNECTED_CONST, Type = Double, Dynamic = False, Default = \"1", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_DISCONNECTED_CONST, Type = Double, Dynamic = False, Default = \"0", Scope = Public
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_INPUT_1_CONST, Type = String, Dynamic = False, Default = \"Aud01", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_INPUT_2_CONST, Type = String, Dynamic = False, Default = \"Aud02", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_INPUT_3_CONST, Type = String, Dynamic = False, Default = \"Aud03", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_INPUT_4_CONST, Type = String, Dynamic = False, Default = \"Aud04", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_INPUT_5_CONST, Type = String, Dynamic = False, Default = \"Aud05", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_LMODE_CONST, Type = String, Dynamic = False, Default = \"Lmod", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_MUTE_OFF_CONST, Type = String, Dynamic = False, Default = \"Mut0", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_MUTE_ON_CONST, Type = String, Dynamic = False, Default = \"Mut1", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_STATUS_VOLUME_CONST, Type = String, Dynamic = False, Default = \"Vol", Scope = Private
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
