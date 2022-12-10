#tag Class
Protected Class cnrSSP71CommandStruct
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
		  cnrCommand = ""
		  cnrCommandName = ""
		  cnrCommandUUID = cnrGetNewUUID
		  cnrConnectionUUID = ""
		  cnrDestinationAddress = ""
		  cnrHeader = ""
		  cnrParameter = ""
		  cnrPort = 0
		  cnrSourceAddress = ""
		  cnrTime = DateTime.Now.ToString
		  
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h0
		cnrCommand As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrCommandName As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrCommandUUID As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrConnectionUUID As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrDestinationAddress As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrHeader As String
	#tag EndProperty

	#tag ComputedProperty, Flags = &h0
		#tag Getter
			Get
			  Var cnrStringBuilderArrayVar() As String
			  cnrStringBuilderArrayVar.Add("Command Name: " + cnrCommandName)
			  cnrStringBuilderArrayVar.Add("Command Time: " + cnrTime)
			  cnrStringBuilderArrayVar.Add("Command UUID: " + cnrCommandUUID)
			  cnrStringBuilderArrayVar.Add("Connection UUID: " + cnrConnectionUUID)
			  cnrStringBuilderArrayVar.Add("Source Address: " + cnrSourceAddress)
			  cnrStringBuilderArrayVar.Add("Destination Address: " + cnrDestinationAddress)
			  cnrStringBuilderArrayVar.Add("Connection Port: " + cnrPort.ToString)
			  cnrStringBuilderArrayVar.Add("Header: " + cnrHeader)
			  cnrStringBuilderArrayVar.Add("Parameter: " + cnrParameter)
			  cnrStringBuilderArrayVar.Add("Command: " + cnrCommand)
			  Return String.FromArray(cnrStringBuilderArrayVar, EndOfLine)
			  
			End Get
		#tag EndGetter
		cnrInfo As String
	#tag EndComputedProperty

	#tag Property, Flags = &h0
		cnrParameter As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrPort As Integer
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrSourceAddress As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrTime As String
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
			Name="cnrCommand"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrCommandUUID"
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
			Name="cnrDestinationAddress"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrHeader"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrParameter"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrPort"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrSourceAddress"
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
			Name="cnrCommandName"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
	#tag EndViewBehavior
End Class
#tag EndClass
