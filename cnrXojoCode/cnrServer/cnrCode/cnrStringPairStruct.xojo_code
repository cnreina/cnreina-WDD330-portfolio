#tag Class
Protected Class cnrStringPairStruct
	#tag Method, Flags = &h0
		Function cnrKey() As String
		  Return cnrKeyData
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrKey(cnrKeyNameParam As String)
		  If cnrKeyNameParam.IsEmpty Then
		    Return
		  End If
		  
		  cnrKeyData = cnrKeyNameParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrPair() As String
		  If cnrKeyData.IsEmpty Then
		    Return ""
		  End If
		  
		  Return cnrKeyData + ":" + cnrValueData
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function cnrValue() As String
		  Return cnrValueData
		  
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub cnrValue(cnrValueParam As String)
		  If cnrValueParam.IsEmpty Then
		    Return
		  End If
		  
		  cnrValueData = cnrValueParam
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Constructor(cnrKeyParam As String, cnrValueParam As String)
		  cnrKeyData = ""
		  cnrKeyData = cnrKeyData.DefineEncoding(Encodings.UTF8)
		  cnrValueData = ""
		  cnrValueData = cnrValueData.DefineEncoding(Encodings.UTF8)
		  
		  If cnrKeyParam.IsEmpty Then
		    // we can have keys with empty values
		    // we cannot have values with empty keys
		    Return
		  End If
		  
		  cnrKeyData = cnrKeyParam
		  cnrValueData = cnrValueParam
		  
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h21
		Private cnrKeyData As String
	#tag EndProperty

	#tag Property, Flags = &h21
		Private cnrValueData As String
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
