#tag Class
Protected Class cnrSSP71DeviceStruct
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

	#tag Method, Flags = &h0
		Sub Constructor()
		  cnrCONNECTED = -1
		  cnrConnectionUUID = ""
		  cnrDeviceName = ""
		  cnrINPUT = -1
		  cnrLMODE = -1
		  cnrMUTED = -1
		  cnrTime = DateTime.Now.ToString
		  cnrUUID = cnrGetNewUUID
		  cnrVOLUME = -1
		  
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h0
		cnrCONNECTED As Integer
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrConnectionUUID As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrDeviceName As String
	#tag EndProperty

	#tag ComputedProperty, Flags = &h0
		#tag Getter
			Get
			  Var cnrStringBuilderArrayVar() As String
			  cnrStringBuilderArrayVar.Add("Device Name: " + cnrDeviceName)
			  cnrStringBuilderArrayVar.Add("Time: " + DateTime.Now.ToString)
			  cnrStringBuilderArrayVar.Add("Device UUID: " + cnrUUID)
			  cnrStringBuilderArrayVar.Add("Connection UUID: " + cnrConnectionUUID)
			  cnrStringBuilderArrayVar.Add("Connected: " + cnrCONNECTED.ToString)
			  cnrStringBuilderArrayVar.Add("Input: " + cnrINPUT.ToString)
			  cnrStringBuilderArrayVar.Add("Listening Mode: " + cnrLMODE.ToString)
			  cnrStringBuilderArrayVar.Add("Muted: " + cnrMUTED.ToString)
			  cnrStringBuilderArrayVar.Add("Volume: " + cnrVOLUME.ToString)
			  Return String.FromArray(cnrStringBuilderArrayVar, EndOfLine)
			  
			End Get
		#tag EndGetter
		#tag Setter
			Set
			  
			  
			End Set
		#tag EndSetter
		cnrInfo As String
	#tag EndComputedProperty

	#tag Property, Flags = &h0
		cnrINPUT As Integer
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrLMODE As Integer
	#tag EndProperty

	#tag ComputedProperty, Flags = &h0
		#tag Getter
			Get
			  Var cnrListeningModeStringVar As String
			  Select Case cnrLMODE
			  Case cnrSSP71_LMODE_DOLBYDIGITAL_5_1_CONST
			    cnrListeningModeStringVar = "DOLBY DIGITAL 5.1"
			    
			  Case cnrSSP71_LMODE_DOLBYDIGITAL_EX_CONST
			    cnrListeningModeStringVar = "DOLBY DIGITAL EX"
			    
			  Case cnrSSP71_LMODE_DOLBYDIGITALPROLOGIC_IIx_MOVIE_CONST
			    cnrListeningModeStringVar = "DOLBY DIGITAL PROLOGIC IIx MOVIE"
			    
			  Case cnrSSP71_LMODE_DOLBYDIGITALPROLOGIC_IIx_MUSIC_CONST
			    cnrListeningModeStringVar = "DOLBY DIGITAL PROLOGIC IIx MUSIC"
			    
			  Case cnrSSP71_LMODE_DOLBYPROLOGIC_CONST
			    cnrListeningModeStringVar = "DOLBY PROLOGIC"
			    
			  Case cnrSSP71_LMODE_DOLBYPROLOGIC_II_IIx_MOVIE_CONST
			    cnrListeningModeStringVar = "DOLBY PROLOGIC II-IIx MOVIE"
			    
			  Case cnrSSP71_LMODE_DOLBYPROLOGIC_II_IIx_MUSIC_CONST
			    cnrListeningModeStringVar = "DOLBY PROLOGIC II-IIx MUSIC"
			    
			  Case cnrSSP71_LMODE_DTS_CONST
			    cnrListeningModeStringVar = "DTS"
			    
			  Case cnrSSP71_LMODE_DTS_ES_DISCRETE_CONST
			    cnrListeningModeStringVar = "DTS ES DISCRETE"
			    
			  Case cnrSSP71_LMODE_DTS_ES_MATRIX_CONST
			    cnrListeningModeStringVar = "DTS ES MATRIX"
			    
			  Case cnrSSP71_LMODE_DTS_NEO6_CINEMA_CONST
			    cnrListeningModeStringVar = "DTS NEO6 CINEMA"
			    
			  Case cnrSSP71_LMODE_DTS_NEO6_MUSIC_CONST
			    cnrListeningModeStringVar = "DTS NEO6 MUSIC"
			    
			  Case cnrSSP71_LMODE_DTS_PLUS_DOLBY_EX_CONST
			    cnrListeningModeStringVar = "DTS PLUS DOLBY EX"
			    
			  Case cnrSSP71_LMODE_DTS_PLUS_DOLBYPROLOGIC_IIx_MOVIE_CONST
			    cnrListeningModeStringVar = "DTS PLUS DOLBY PROLOGIC IIx MOVIE"
			    
			  Case cnrSSP71_LMODE_DTS_PLUS_DOLBYPROLOGIC_IIx_MUSIC_CONST
			    cnrListeningModeStringVar = "DTS PLUS DOLBY PROLOGIC IIx MUSIC"
			    
			  Case cnrSSP71_LMODE_MONO_CONST
			    cnrListeningModeStringVar = "MONO"
			    
			  Case cnrSSP71_LMODE_MONOTOALL_CONST
			    cnrListeningModeStringVar = "MONO TO ALL"
			    
			  Case cnrSSP71_LMODE_STEREOTOALL_CONST
			    cnrListeningModeStringVar = "STEREO TO ALL"
			    
			  Case cnrSSP71_LMODE_STEREO_CONST
			    cnrListeningModeStringVar = "STEREO"
			    
			  Case cnrSSP71_LMODE_NONE_CONST
			    cnrListeningModeStringVar = "NO AUDIO"
			    
			  Case Else
			    cnrListeningModeStringVar = ""
			    
			  End Select
			  
			  Return cnrListeningModeStringVar
			  
			  
			End Get
		#tag EndGetter
		#tag Setter
			Set
			  
			  
			End Set
		#tag EndSetter
		cnrLMODEName As String
	#tag EndComputedProperty

	#tag Property, Flags = &h0
		cnrMUTED As Integer
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrTime As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrUUID As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrVOLUME As Integer
	#tag EndProperty


	#tag Constant, Name = cnrSSP71_LMODE_DOLBYDIGITALPROLOGIC_IIx_MOVIE_CONST, Type = Double, Dynamic = False, Default = \"10", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DOLBYDIGITALPROLOGIC_IIx_MUSIC_CONST, Type = Double, Dynamic = False, Default = \"11", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DOLBYDIGITAL_5_1_CONST, Type = Double, Dynamic = False, Default = \"8", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DOLBYDIGITAL_EX_CONST, Type = Double, Dynamic = False, Default = \"9", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DOLBYPROLOGIC_CONST, Type = Double, Dynamic = False, Default = \"5", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DOLBYPROLOGIC_II_IIx_MOVIE_CONST, Type = Double, Dynamic = False, Default = \"6", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DOLBYPROLOGIC_II_IIx_MUSIC_CONST, Type = Double, Dynamic = False, Default = \"7", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_CONST, Type = Double, Dynamic = False, Default = \"12", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_ES_DISCRETE_CONST, Type = Double, Dynamic = False, Default = \"14", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_ES_MATRIX_CONST, Type = Double, Dynamic = False, Default = \"13", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_NEO6_CINEMA_CONST, Type = Double, Dynamic = False, Default = \"18", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_NEO6_MUSIC_CONST, Type = Double, Dynamic = False, Default = \"19", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_PLUS_DOLBYPROLOGIC_IIx_MOVIE_CONST, Type = Double, Dynamic = False, Default = \"16", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_PLUS_DOLBYPROLOGIC_IIx_MUSIC_CONST, Type = Double, Dynamic = False, Default = \"17", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_DTS_PLUS_DOLBY_EX_CONST, Type = Double, Dynamic = False, Default = \"15", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_MONOTOALL_CONST, Type = Double, Dynamic = False, Default = \"4", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_MONO_CONST, Type = Double, Dynamic = False, Default = \"2", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_NONE_CONST, Type = Double, Dynamic = False, Default = \"0", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_STEREOTOALL_CONST, Type = Double, Dynamic = False, Default = \"3", Scope = Private
	#tag EndConstant

	#tag Constant, Name = cnrSSP71_LMODE_STEREO_CONST, Type = Double, Dynamic = False, Default = \"1", Scope = Private
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
		#tag ViewProperty
			Name="cnrLMODEName"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrINPUT"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrCONNECTED"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrLMODE"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrMUTED"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrVOLUME"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrUUID"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrTime"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrInfo"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrConnectionUUID"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrDeviceName"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
	#tag EndViewBehavior
End Class
#tag EndClass
