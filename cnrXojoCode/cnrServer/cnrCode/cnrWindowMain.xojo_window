#tag Window
Begin Window cnrWindowMain
   Backdrop        =   0
   BackgroundColor =   &cFFFFFF00
   Composite       =   False
   DefaultLocation =   2
   FullScreen      =   False
   HasBackgroundColor=   False
   HasCloseButton  =   True
   HasFullScreenButton=   True
   HasMaximizeButton=   True
   HasMinimizeButton=   True
   Height          =   690
   ImplicitInstance=   True
   MacProcID       =   0
   MaximumHeight   =   32000
   MaximumWidth    =   32000
   MenuBar         =   0
   MenuBarVisible  =   True
   MinimumHeight   =   64
   MinimumWidth    =   64
   Resizeable      =   True
   Title           =   "Server Demo"
   Type            =   0
   Visible         =   True
   Width           =   824
   Begin TextArea TextArea1
      AllowAutoDeactivate=   True
      AllowFocusRing  =   False
      AllowSpellChecking=   False
      AllowStyledText =   True
      AllowTabs       =   False
      BackgroundColor =   &cFFFFFF00
      Bold            =   False
      DataField       =   ""
      DataSource      =   ""
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Format          =   ""
      HasBorder       =   True
      HasHorizontalScrollbar=   True
      HasVerticalScrollbar=   True
      Height          =   509
      HideSelection   =   True
      Index           =   -2147483648
      Italic          =   False
      Left            =   20
      LineHeight      =   0.0
      LineSpacing     =   1.0
      LockBottom      =   True
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   True
      LockTop         =   True
      MaximumCharactersAllowed=   0
      Multiline       =   True
      ReadOnly        =   True
      Scope           =   2
      TabIndex        =   0
      TabPanelIndex   =   0
      TabStop         =   True
      Text            =   ""
      TextAlignment   =   0
      TextColor       =   &c00000000
      Tooltip         =   ""
      Top             =   161
      Transparent     =   False
      Underline       =   False
      UnicodeMode     =   1
      ValidationMask  =   ""
      Visible         =   True
      Width           =   784
   End
   Begin PushButton PushButton1
      AllowAutoDeactivate=   True
      Bold            =   False
      Cancel          =   False
      Caption         =   "Start"
      Default         =   False
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   112
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      MacButtonStyle  =   0
      Scope           =   2
      TabIndex        =   1
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin PushButton PushButton2
      AllowAutoDeactivate=   True
      Bold            =   False
      Cancel          =   False
      Caption         =   "Stop"
      Default         =   False
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   388
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      MacButtonStyle  =   0
      Scope           =   2
      TabIndex        =   2
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin TextField TextFieldPort
      AllowAutoDeactivate=   True
      AllowFocusRing  =   True
      AllowSpellChecking=   False
      AllowTabs       =   False
      BackgroundColor =   &cFFFFFF00
      Bold            =   False
      DataField       =   ""
      DataSource      =   ""
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Format          =   ""
      HasBorder       =   True
      Height          =   22
      Hint            =   "8080"
      Index           =   -2147483648
      Italic          =   False
      Left            =   20
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      MaximumCharactersAllowed=   0
      Password        =   False
      ReadOnly        =   False
      Scope           =   2
      TabIndex        =   3
      TabPanelIndex   =   0
      TabStop         =   True
      Text            =   "8080"
      TextAlignment   =   0
      TextColor       =   &c00000000
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      ValidationMask  =   ""
      Visible         =   True
      Width           =   80
   End
   Begin PushButton PushButton3
      AllowAutoDeactivate=   True
      Bold            =   False
      Cancel          =   False
      Caption         =   "Clear"
      Default         =   False
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   572
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   False
      LockRight       =   True
      LockTop         =   True
      MacButtonStyle  =   0
      Scope           =   2
      TabIndex        =   4
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin DesktopCheckBox CheckBoxShowData
      AllowAutoDeactivate=   True
      Bold            =   False
      Caption         =   "Display Raw Data"
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      Italic          =   False
      Left            =   664
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   False
      LockRight       =   True
      LockTop         =   True
      Scope           =   2
      TabIndex        =   5
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Value           =   False
      Visible         =   True
      VisualState     =   0
      Width           =   140
   End
   Begin PushButton PushButton4
      AllowAutoDeactivate=   True
      Bold            =   False
      Cancel          =   False
      Caption         =   "Quit"
      Default         =   False
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   480
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      MacButtonStyle  =   0
      Scope           =   2
      TabIndex        =   6
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin PushButton PushButton5
      AllowAutoDeactivate=   True
      Bold            =   False
      Cancel          =   False
      Caption         =   "Pause"
      Default         =   False
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   204
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      MacButtonStyle  =   0
      Scope           =   2
      TabIndex        =   7
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin PushButton PushButton6
      AllowAutoDeactivate=   True
      Bold            =   False
      Cancel          =   False
      Caption         =   "Unpause"
      Default         =   False
      Enabled         =   True
      FontName        =   "System"
      FontSize        =   0.0
      FontUnit        =   0
      Height          =   20
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   296
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      MacButtonStyle  =   0
      Scope           =   2
      TabIndex        =   8
      TabPanelIndex   =   0
      TabStop         =   True
      Tooltip         =   ""
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
End
#tag EndWindow

#tag WindowCode
	#tag Event
		Sub Open()
		  cnrMain
		  
		End Sub
	#tag EndEvent


	#tag Method, Flags = &h21
		Private Sub cnrHandleDataAvailableEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  If CheckBoxShowData.Value = False Then
		    Return
		  End If
		  
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrLastDataAvailable + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPCommandReceivedEvent(cnrSenderParam As cnrHTTPConnectionClass, cnrTypeParam As String, cnrEncodingParam As String, cnrCommandParam As String)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrRequest.cnrReceivedTime + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText("Type: " + cnrTypeParam + EndOfLine)
		  TextArea1.AddText("Encoding: " + cnrEncodingParam + EndOfLine)
		  TextArea1.AddText("Command: " + cnrCommandParam + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPConnectedEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPConnectionClosedEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPDisconnectedEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPErrorEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText("Error Message: " + cnrSenderParam.cnrLastErrorMessage + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText("cnrLastDataAvailable: " + cnrSenderParam.cnrLastDataAvailable + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrHandleHTTPFormDataGetResponseEvent(cnrSenderParam As cnrHTTPConnectionClass, cnrFormDataParam As String) As String
		  // check server state
		  If cnrServerIsPaused("") = True Then
		    Return ""
		  End If
		  
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrRequest.cnrReceivedTime + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  //TextArea1.AddText(cnrFormDataParam + EndOfLine)
		  //TextArea1.AddText(EndOfLine)
		  
		  If cnrFormDataParam.IsEmpty Then
		    TextArea1.AddText("cnrFormDataParam.IsEmpty" + EndOfLine)
		    TextArea1.AddText(EndOfLine)
		  End If
		  
		  If cnrServerPaused = True Then
		    Return ""
		  End If
		  
		  // ============================== TEST json fields
		  
		  Var cnrJSONObjectVar As New JSONItem
		  Var cnrJSONItemVar As JSONItem
		  
		  cnrJSONItemVar = New JSONItem
		  cnrJSONItemVar.Value("cnrperformance") = "Solo"
		  cnrJSONItemVar.Value("cnrlocation") = "Building 1"
		  cnrJSONItemVar.Value("cnrroom") = "Room 1"
		  cnrJSONItemVar.Value("cnrtime_slot") = "08:00am"
		  cnrJSONItemVar.Value("cnrfirst_name") = "Carlos"
		  cnrJSONItemVar.Value("cnrlast_name") = "Reina"
		  cnrJSONItemVar.Value("cnrinstrument") = "Piano"
		  cnrJSONItemVar.Value("cnrskill") = "Beginner"
		  cnrJSONObjectVar.Add(cnrJSONItemVar)
		  
		  cnrJSONItemVar = New JSONItem
		  cnrJSONItemVar.Value("cnrperformance") = "Duo"
		  cnrJSONItemVar.Value("cnrlocation") = "Building 2"
		  cnrJSONItemVar.Value("cnrroom") = "Room 34"
		  cnrJSONItemVar.Value("cnrtime_slot") = "09:00am"
		  cnrJSONItemVar.Value("cnrfirst_name") = "Laura"
		  cnrJSONItemVar.Value("cnrlast_name") = "Reina"
		  cnrJSONItemVar.Value("cnrinstrument") = "Guitar"
		  cnrJSONItemVar.Value("cnrskill") = "Intermediate"
		  cnrJSONObjectVar.Add(cnrJSONItemVar)
		  
		  cnrJSONItemVar = New JSONItem
		  cnrJSONItemVar.Value("cnrperformance") = "Triplet"
		  cnrJSONItemVar.Value("cnrlocation") = "Building 12"
		  cnrJSONItemVar.Value("cnrroom") = "Room 501"
		  cnrJSONItemVar.Value("cnrtime_slot") = "08:30am"
		  cnrJSONItemVar.Value("cnrfirst_name") = "Lucia"
		  cnrJSONItemVar.Value("cnrlast_name") = "Reina"
		  cnrJSONItemVar.Value("cnrinstrument") = "Drums"
		  cnrJSONItemVar.Value("cnrskill") = "Advanced"
		  cnrJSONObjectVar.Add(cnrJSONItemVar)
		  
		  Var cnrJSONStringVar As String = cnrJSONObjectVar.ToString
		  
		  TextArea1.AddText(cnrJSONStringVar + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		  Return cnrJSONStringVar
		  
		  
		  
		  
		  
		  
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPFormDataReceivedEvent(cnrSenderParam As cnrHTTPConnectionClass, cnrFormDataParam As String)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrRequest.cnrReceivedTime + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrFormDataParam + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		  // parse form fields
		  Var cnrContentTypeVar As String  = cnrSenderParam.cnrRequest.cnrHeaders.cnrGetValueByKeyName("Content-Type")
		  If cnrContentTypeVar.IndexOf("boundary=") < 0 Then
		    Return
		  End If
		  Var cnrBoundaryVar As String = cnrContentTypeVar.Right(cnrContentTypeVar.Length - cnrContentTypeVar.IndexOf("boundary="))
		  cnrBoundaryVar = cnrBoundaryVar.Replace("boundary=", "")
		  If cnrBoundaryVar.IsEmpty Then
		    Return
		  End If
		  
		  Var cnrRequestBodyFieldsArrayVar() As cnrStringPairStruct
		  Var cnrRequestBodyFieldVar As cnrStringPairStruct
		  Var cnrPayloadFieldsArrayVar() As String = cnrFormDataParam.Split(cnrBoundaryVar)
		  Var cnrPayloadKeyVar As String
		  Var cnrPayloadValueVar As String
		  Var cnrPayloadCountVar As Integer
		  Var cnrFormDataFieldVar As String
		  For cnrPayloadCountVar = 0 To cnrPayloadFieldsArrayVar.LastIndex
		    cnrFormDataFieldVar = cnrPayloadFieldsArrayVar(cnrPayloadCountVar)
		    cnrFormDataFieldVar = cnrFormDataFieldVar.ReplaceAll(EndOfLine.CRLF, "")
		    cnrFormDataFieldVar = cnrFormDataFieldVar.ReplaceAll("--", "")
		    cnrFormDataFieldVar = cnrFormDataFieldVar.ReplaceAll(cnrFormDataFieldVar.NthField("""", 1), "")
		    cnrFormDataFieldVar = cnrFormDataFieldVar.Trim
		    If cnrFormDataFieldVar.IsEmpty Then
		      Continue
		    End If
		    cnrPayloadKeyVar = cnrFormDataFieldVar.NthField("""", 2)
		    cnrPayloadValueVar = cnrFormDataFieldVar.NthField("""", 3)
		    If cnrPayloadKeyVar.IsEmpty Then
		      Continue
		    End If
		    cnrRequestBodyFieldVar = New cnrStringPairStruct(cnrPayloadKeyVar, cnrPayloadValueVar)
		    cnrRequestBodyFieldsArrayVar.Add(cnrRequestBodyFieldVar)
		  Next
		  
		  For Each cnrFormField As cnrStringPairStruct In cnrRequestBodyFieldsArrayVar
		    TextArea1.AddText(cnrFormField.cnrPair + EndOfLine)
		  Next
		  TextArea1.AddText(EndOfLine)
		  
		  
		  
		  
		  
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Function cnrHandleHTTPJSONGetResponseEvent(cnrSenderParam As cnrHTTPConnectionClass, cnrJSONDataParam As String) As String
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrRequest.cnrReceivedTime + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		  If cnrJSONDataParam.IsEmpty Then
		    TextArea1.AddText("cnrJSONDataParam.IsEmpty" + EndOfLine)
		    TextArea1.AddText(EndOfLine)
		  End If
		  
		  // process data
		  Var cnrJSONDataVar As JSONItem
		  Try
		    cnrJSONDataVar = New JSONItem(cnrJSONDataParam)
		    If cnrJSONDataVar = Nil Then
		      TextArea1.AddText(EndOfLine)
		      TextArea1.AddText("ERROR: cnrJSONDataVar = Nil " + EndOfLine)
		      TextArea1.AddText(EndOfLine)
		      Return ""
		    End If
		  Catch
		    TextArea1.AddText(EndOfLine)
		    TextArea1.AddText("ERROR: cnrJSONDataVar = Nil " + EndOfLine)
		    TextArea1.AddText(EndOfLine)
		    Return ""
		  End Try
		  
		  // check server state
		  If cnrServerIsPaused(cnrJSONDataVar.Value("type")) = True Then
		    Return ""
		  End If
		  
		  // process command type
		  Var cnrResponseJSONVar As JSONItem = New JSONItem
		  Var cnrParameterJSONVar As JSONItem
		  cnrParameterJSONVar = New JSONItem
		  cnrParameterJSONVar.Value("type") = cnrJSONDataVar.Value("type")
		  cnrParameterJSONVar.Value("encoding") = "string"
		  cnrParameterJSONVar.Value("command") = cnrJSONDataVar.Value("command")
		  Select Case cnrJSONDataVar.Value("type")
		    // server command
		  Case "server"
		    Select Case cnrJSONDataVar.Value("command")
		    Case "on"
		      cnrServerPaused = False
		      
		      cnrParameterJSONVar.Value("response") = "on"
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		      
		    Case "off"
		      cnrServerPaused = True
		      
		      cnrParameterJSONVar.Value("response") = "off"
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		      
		    Case "state"
		      If cnrServerPaused = True Then
		        cnrParameterJSONVar.Value("response") = "off"
		      Else
		        cnrParameterJSONVar.Value("response") = "on"
		      End If
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		      
		    Case "time"
		      Var cnrCurrentTimeVar As String = cnrServerInstance.cnrServerTime
		      cnrParameterJSONVar.Value("response") = cnrCurrentTimeVar
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		      
		    Case "connections"
		      Var cnrConnectionsVar As String = cnrServerInstance.cnrServerConnectionsString
		      cnrParameterJSONVar.Value("response") = cnrConnectionsVar
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		      
		    Case "info"
		      Var cnrConnectionsVar As String = cnrServerInstance.cnrServerString
		      cnrParameterJSONVar.Value("response") = cnrConnectionsVar
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		      
		    Case Else
		      // command data error
		      // debug
		      #If DebugBuild
		        System.DebugLog(CurrentMethodName + " - ERROR: unknown command" + EndOfLine + cnrJSONDataVar.Value("command"))
		      #EndIf
		      // return error
		      cnrParameterJSONVar.Value("response") = "error unknown command"
		      cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		      Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		      Return cnrJSONStringVar
		    End Select
		    
		    // other command
		  Case Else
		    // command type error
		    // debug
		    #If DebugBuild
		      System.DebugLog(CurrentMethodName + EndOfLine + "ERROR: unknown type")
		    #EndIf
		    // return error
		    cnrParameterJSONVar.Value("response") = "error unknown type"
		    cnrResponseJSONVar.Value("cnrCommand") = cnrParameterJSONVar
		    Var cnrJSONStringVar As String = cnrResponseJSONVar.ToString
		    Return cnrJSONStringVar
		    
		  End Select
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPJSONReceivedEvent(cnrSenderParam As cnrHTTPConnectionClass, cnrJSONDataParam As String)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrRequest.cnrReceivedTime + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrJSONDataParam + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPRequestAvailableEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine + EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrRequest.cnrString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPResponseSendCompleteEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText("Time: " + cnrSenderParam.cnrResponse.cnrSentTime + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPResponseSendEvent(cnrSenderParam As cnrHTTPConnectionClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrResponse.cnrString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  If Not cnrSenderParam.cnrResponse.cnrResponseBody.IsEmpty Then
		    TextArea1.AddText(cnrSenderParam.cnrResponse.cnrResponseBody + EndOfLine)
		    TextArea1.AddText(EndOfLine)
		  End If
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleHTTPSendProgressEvent(cnrSenderParam As cnrHTTPConnectionClass, cnrBytesSentParam As Integer, cnrBytesLeftParam As Integer)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText("Bytes Sent: " + cnrBytesSentParam.ToString + EndOfLine)
		  TextArea1.AddText("Bytes Remaining: " + cnrBytesLeftParam.ToString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText("Time: " + DateTime.Now.ToString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleNewHTTPSocketEvent(cnrSenderParam As cnrHTTPServerClass, cnrHTTPConnectionParam As cnrHTTPConnectionClass)
		  // update log
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText("Server UUID: " + cnrSenderParam.cnrServerUUID + EndOfLine)
		  TextArea1.AddText(cnrHTTPConnectionParam.cnrConnectionString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		  // setup handlers
		  AddHandler cnrHTTPConnectionParam.cnrHTTPDataAvailableEvent, AddressOf cnrHandleDataAvailableEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPConnectedEvent, AddressOf cnrHandleHTTPConnectedEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPConnectionClosedEvent, AddressOf cnrHandleHTTPConnectionClosedEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPDisconnectedEvent, AddressOf cnrHandleHTTPDisconnectedEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPErrorEvent, AddressOf cnrHandleHTTPErrorEvent
		  
		  AddHandler cnrHTTPConnectionParam.cnrHTTPRequestAvailableEvent, AddressOf cnrHandleHTTPRequestAvailableEvent
		  
		  AddHandler cnrHTTPConnectionParam.cnrHTTPCommandReceivedEvent, AddressOf cnrHandleHTTPCommandReceivedEvent
		  
		  AddHandler cnrHTTPConnectionParam.cnrHTTPJSONReceivedEvent, AddressOf cnrHandleHTTPJSONReceivedEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPJSONGetResponseEvent, AddressOf cnrHandleHTTPJSONGetResponseEvent
		  
		  AddHandler cnrHTTPConnectionParam.cnrHTTPFormDataReceivedEvent, AddressOf cnrHandleHTTPFormDataReceivedEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPFormDataGetResponseEvent, AddressOf cnrHandleHTTPFormDataGetResponseEvent
		  
		  AddHandler cnrHTTPConnectionParam.cnrHTTPResponseSendCompleteEvent, AddressOf cnrHandleHTTPResponseSendCompleteEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPResponseSendEvent, AddressOf cnrHandleHTTPResponseSendEvent
		  AddHandler cnrHTTPConnectionParam.cnrHTTPSendProgressEvent, AddressOf cnrHandleHTTPSendProgressEvent
		  
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleServerErrorEvent(cnrSenderParam As cnrHTTPServerClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrServerTime + EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrError.cnrGetErrorsString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleServerStartEvent(cnrSenderParam As cnrHTTPServerClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrServerString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrHandleServerStopEvent(cnrSenderParam As cnrHTTPServerClass)
		  TextArea1.AddText(cnrDisplayDivider + EndOfLine)
		  TextArea1.AddText(CurrentMethodName + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  TextArea1.AddText(cnrSenderParam.cnrServerString + EndOfLine)
		  TextArea1.AddText(EndOfLine)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h21
		Private Sub cnrMain()
		  // initialize server interface
		  Var cnrNewServerVar As New cnrHTTPServerClass
		  If cnrNewServerVar = Nil Then
		    MessageBox("ERROR: Failed to create server instance (" + CurrentMethodName + ")")
		    Quit
		  End If
		  cnrServerInstance = cnrNewServerVar
		  
		  AddHandler cnrServerInstance.cnrServerErrorEvent, AddressOf cnrHandleServerErrorEvent
		  AddHandler cnrServerInstance.cnrServerStartEvent, AddressOf cnrHandleServerStartEvent
		  AddHandler cnrServerInstance.cnrServerStopEvent, AddressOf cnrHandleServerStopEvent
		  
		  // HTTP connection handles are set when socket is created (See cnrHandleNewHTTPSocketEvent)
		  AddHandler cnrServerInstance.cnrNewHTTPSocketEvent, AddressOf cnrHandleNewHTTPSocketEvent
		  
		  // server state
		  cnrServerPaused = False
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrPauseServer(cnrPauseParam As Boolean)
		  cnrServerPaused = cnrPauseParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrServerIsListening() As Boolean
		  Return cnrServerInstance.cnrServerSocket.IsListening
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrServerIsPaused(cnrDataType As String) As Boolean
		  // we let 'server' commands pass
		  If cnrServerPaused = True And cnrDataType = "server" Then
		    Return False
		  End If
		  
		  // return pause state
		  Return cnrServerPaused
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrStartServer(cnrPortParam As Integer)
		  cnrServerInstance.cnrStartServer(cnrPortParam)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrStopServer()
		  cnrServerInstance.cnrStopServer
		  
		End Sub
	#tag EndMethod


	#tag Note, Name = README
		A demo app and window to test cnrServerInstance.
		
		
	#tag EndNote

	#tag Note, Name = TODO
		
		Process SSP71 commands.
		
		process string request > return cnrstudents.txt file
		
		refactor > move storage under main app.
		cnrErrorClass in main app > classes use lasterrormessage property and fire error event.
		config table/file
		policy table/file
		cnrGetDataBaseVersion
		
		cnrErrorClass in main app > classes use lasterrormessage property and fire error event.
		
	#tag EndNote


	#tag Property, Flags = &h21
		Private cnrDisplayDivider As String = "=============================================="
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrServerInstance As cnrHTTPServerClass
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrServerPaused As Boolean
	#tag EndProperty


#tag EndWindowCode

#tag Events PushButton1
	#tag Event
		Sub Action()
		  cnrStartServer(TextFieldPort.Text.ToInteger)
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events PushButton2
	#tag Event
		Sub Action()
		  cnrStopServer
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events PushButton3
	#tag Event
		Sub Action()
		  TextArea1.Text = ""
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events PushButton4
	#tag Event
		Sub Action()
		  If cnrServerIsListening Then
		    cnrStopServer
		  End If
		  
		  Quit
		  
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events PushButton5
	#tag Event
		Sub Action()
		  cnrPauseServer(True)
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events PushButton6
	#tag Event
		Sub Action()
		  cnrPauseServer(False)
		  
		End Sub
	#tag EndEvent
#tag EndEvents
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
		Name="Interfaces"
		Visible=true
		Group="ID"
		InitialValue=""
		Type="String"
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
		Name="Width"
		Visible=true
		Group="Size"
		InitialValue="600"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="Height"
		Visible=true
		Group="Size"
		InitialValue="400"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MinimumWidth"
		Visible=true
		Group="Size"
		InitialValue="64"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MinimumHeight"
		Visible=true
		Group="Size"
		InitialValue="64"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MaximumWidth"
		Visible=true
		Group="Size"
		InitialValue="32000"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MaximumHeight"
		Visible=true
		Group="Size"
		InitialValue="32000"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="Type"
		Visible=true
		Group="Frame"
		InitialValue="0"
		Type="Types"
		EditorType="Enum"
		#tag EnumValues
			"0 - Document"
			"1 - Movable Modal"
			"2 - Modal Dialog"
			"3 - Floating Window"
			"4 - Plain Box"
			"5 - Shadowed Box"
			"6 - Rounded Window"
			"7 - Global Floating Window"
			"8 - Sheet Window"
			"9 - Metal Window"
			"11 - Modeless Dialog"
		#tag EndEnumValues
	#tag EndViewProperty
	#tag ViewProperty
		Name="Title"
		Visible=true
		Group="Frame"
		InitialValue="Untitled"
		Type="String"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="HasCloseButton"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="HasMaximizeButton"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="HasMinimizeButton"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="HasFullScreenButton"
		Visible=true
		Group="Frame"
		InitialValue="False"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="Resizeable"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="Composite"
		Visible=false
		Group="OS X (Carbon)"
		InitialValue="False"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MacProcID"
		Visible=false
		Group="OS X (Carbon)"
		InitialValue="0"
		Type="Integer"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="FullScreen"
		Visible=false
		Group="Behavior"
		InitialValue="False"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="ImplicitInstance"
		Visible=true
		Group="Behavior"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="DefaultLocation"
		Visible=true
		Group="Behavior"
		InitialValue="0"
		Type="Locations"
		EditorType="Enum"
		#tag EnumValues
			"0 - Default"
			"1 - Parent Window"
			"2 - Main Screen"
			"3 - Parent Window Screen"
			"4 - Stagger"
		#tag EndEnumValues
	#tag EndViewProperty
	#tag ViewProperty
		Name="Visible"
		Visible=true
		Group="Behavior"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="HasBackgroundColor"
		Visible=true
		Group="Background"
		InitialValue="False"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="BackgroundColor"
		Visible=true
		Group="Background"
		InitialValue="&hFFFFFF"
		Type="Color"
		EditorType="Color"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Backdrop"
		Visible=true
		Group="Background"
		InitialValue=""
		Type="Picture"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MenuBar"
		Visible=true
		Group="Menus"
		InitialValue=""
		Type="MenuBar"
		EditorType=""
	#tag EndViewProperty
	#tag ViewProperty
		Name="MenuBarVisible"
		Visible=true
		Group="Deprecated"
		InitialValue="True"
		Type="Boolean"
		EditorType=""
	#tag EndViewProperty
#tag EndViewBehavior
