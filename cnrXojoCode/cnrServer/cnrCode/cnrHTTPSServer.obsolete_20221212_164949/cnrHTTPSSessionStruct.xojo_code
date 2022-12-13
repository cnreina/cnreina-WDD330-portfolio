#tag Class
Protected Class cnrHTTPSSessionStruct
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
		Private Sub cnrMain()
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor(cnrSessionIDParam As String)
		  cnrSessionID = cnrSessionIDParam
		  
		  cnrMain
		  
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h0
		cnrPasswordHash As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrSessionID As String
	#tag EndProperty

	#tag Property, Flags = &h0
		cnrUserName As String
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
			Name="cnrSessionID"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrPasswordHash"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="cnrUserName"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
	#tag EndViewBehavior
End Class
#tag EndClass
